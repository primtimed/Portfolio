<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/portfolio', 'Portfolio')->name('portfolio');
Route::inertia('/hobbies/photography', 'hobbies/Photography')->name('hobbies.photography');
