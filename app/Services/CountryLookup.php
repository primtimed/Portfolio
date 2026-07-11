<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Throwable;

/**
 * Resolves a visitor's country from their IP via a free geolocation API.
 * No local/API key is needed, and nothing is persisted beyond the resolved
 * country name on the page view itself.
 */
class CountryLookup
{
    public function resolve(?string $ip): ?string
    {
        if (! $ip || ! filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return null;
        }

        try {
            $response = Http::timeout(2)->get("http://ip-api.com/json/{$ip}", [
                'fields' => 'status,country',
            ]);

            if ($response->successful() && $response->json('status') === 'success') {
                return $response->json('country');
            }
        } catch (Throwable) {
            // Geolocation is best-effort; a failed lookup just leaves the country unknown.
        }

        return null;
    }
}
