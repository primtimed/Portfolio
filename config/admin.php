<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin Password
    |--------------------------------------------------------------------------
    |
    | Single shared password that guards /admin. There is no user table or
    | database involved — a correct password just flips a flag in the
    | session, matching the existing session guard middleware.
    |
    */

    'password' => env('ADMIN_PASSWORD'),

];
