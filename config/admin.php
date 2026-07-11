<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin TOTP Secret
    |--------------------------------------------------------------------------
    |
    | Single shared TOTP secret that guards /admin. There is no user table or
    | database involved — a correct 6-digit authenticator code just flips a
    | flag in the session, matching the existing session guard middleware.
    | Generate one with `php artisan admin:2fa-setup`.
    |
    */

    'totp_secret' => env('ADMIN_TOTP_SECRET'),

];
