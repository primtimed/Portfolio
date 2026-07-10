<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/portfolio', 'Portfolio')->name('portfolio');
Route::get('/portfolio-lab/{project}', fn (string $project) => Inertia::render('PortfolioLab', ['slug' => $project]))->name('portfolio.lab');
Route::inertia('/resume', 'Resume')->name('resume');
Route::get('/hobbies/{hobby}', fn (string $hobby) => Inertia::render('hobbies/Hobby', ['slug' => $hobby]))->name('hobbies.show');
