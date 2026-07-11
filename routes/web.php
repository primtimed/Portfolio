<?php

use App\Http\Controllers\AnalyticsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/resume', 'Resume')->name('resume');

Route::post('/analytics/view', [AnalyticsController::class, 'store'])->name('analytics.view.store');
Route::post('/analytics/view/{id}/duration', [AnalyticsController::class, 'duration'])->name('analytics.view.duration');
Route::post('/analytics/resume-download', [AnalyticsController::class, 'downloadResume'])->name('analytics.resume-download.store');

Route::get('/project/{project}', fn (string $project) => Inertia::render('project', ['slug' => $project]))
    ->name('project.show');

Route::get('/hobbies/{hobby}', fn (string $hobby) => Inertia::render('hobbies/Hobby', ['slug' => $hobby]))
    ->name('hobbies.show');

require __DIR__.'/admin.php';
