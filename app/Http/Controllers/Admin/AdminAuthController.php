<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FAQRCode\Google2FA;

class AdminAuthController extends Controller
{
    private const MAX_ATTEMPTS = 5;

    private const DECAY_SECONDS = 3600;

    public function create(): Response
    {
        return Inertia::render('admin/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $key = 'admin-login:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS)) {
            $minutes = (int) ceil(RateLimiter::availableIn($key) / 60);

            throw ValidationException::withMessages([
                'code' => "Too many attempts. Try again in {$minutes} minute".($minutes === 1 ? '' : 's').'.',
            ]);
        }

        $secret = config('admin.totp_secret');

        if (! $secret || ! (new Google2FA)->verifyKey($secret, $credentials['code'])) {
            RateLimiter::hit($key, self::DECAY_SECONDS);

            $remaining = self::MAX_ATTEMPTS - RateLimiter::attempts($key);
            $message = 'That code is incorrect or has expired.';

            if ($remaining === 1) {
                $message .= ' You have 1 attempt left before you are locked out for an hour.';
            } elseif ($remaining <= 0) {
                $message = 'Too many incorrect attempts. Try again in an hour.';
            }

            throw ValidationException::withMessages(['code' => $message]);
        }

        RateLimiter::clear($key);

        $request->session()->regenerate();
        $request->session()->put('admin_authenticated', true);

        return redirect()->route('admin.dashboard');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->forget('admin_authenticated');
        $request->session()->regenerate();

        return redirect()->route('admin.login');
    }
}
