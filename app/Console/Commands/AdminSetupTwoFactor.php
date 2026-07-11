<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PragmaRX\Google2FAQRCode\Google2FA;

class AdminSetupTwoFactor extends Command
{
    protected $signature = 'admin:2fa-setup';

    protected $description = 'Generate a new admin TOTP secret and a QR code to scan into an authenticator app';

    public function handle(): int
    {
        $google2fa = new Google2FA;

        $secret = $google2fa->generateSecretKey();

        $qrCodeUrl = $google2fa->getQRCodeInline(
            config('app.name'),
            'admin',
            $secret,
        );

        $path = storage_path('app/admin-2fa-qrcode.svg');
        file_put_contents($path, base64_decode(explode(',', $qrCodeUrl)[1]));

        $this->info('Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):');
        $this->line($path);
        $this->newLine();
        $this->info('Then add this line to your .env file:');
        $this->line("ADMIN_TOTP_SECRET={$secret}");
        $this->newLine();
        $this->warn('Delete the QR code file after scanning it — it encodes the secret in plain text.');

        return self::SUCCESS;
    }
}
