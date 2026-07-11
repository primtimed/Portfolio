<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TsData\HobbiesDataFile;
use App\Services\TsData\PortfolioDataFile;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(PortfolioDataFile $portfolio, HobbiesDataFile $hobbies): Response
    {
        return Inertia::render('admin/Dashboard', [
            'projectCount' => count($portfolio->projects()),
            'hobbyCount' => count($hobbies->hobbies()),
        ]);
    }
}
