<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/resume', 'Resume')->name('resume');

Route::get('/project/{project}', fn (string $project)
    => Inertia::render('project', ['slug' => $project]))
    ->name('project.show');

Route::get('/hobbies/{hobby}', fn (string $hobby)
    => Inertia::render('hobbies/Hobby', ['slug' => $hobby]))
    ->name('hobbies.show');

require __DIR__.'/admin.php';
