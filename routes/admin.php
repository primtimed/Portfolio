<?php

use App\Http\Controllers\Admin\AdminAnalyticsController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminHobbyController;
use App\Http\Controllers\Admin\AdminPortfolioMetaController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\AdminRebuildController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AdminAuthController::class, 'create'])->name('login');
    Route::post('login', [AdminAuthController::class, 'store'])
        ->name('login.store');

    Route::middleware('admin.auth')->group(function () {
        Route::post('logout', [AdminAuthController::class, 'destroy'])->name('logout');

        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::get('analytics', [AdminAnalyticsController::class, 'index'])->name('analytics');

        Route::get('content', [AdminPortfolioMetaController::class, 'edit'])->name('portfolio-meta.edit');
        Route::put('content', [AdminPortfolioMetaController::class, 'update'])->name('portfolio-meta.update');

        Route::get('resume', [AdminPortfolioMetaController::class, 'editResume'])->name('resume-content.edit');

        Route::resource('projects', AdminProjectController::class)
            ->except(['show'])
            ->parameters(['projects' => 'project']);

        Route::resource('hobbies', AdminHobbyController::class)
            ->except(['show'])
            ->parameters(['hobbies' => 'hobby']);

        Route::post('rebuild', [AdminRebuildController::class, 'store'])->name('rebuild');
    });
});
