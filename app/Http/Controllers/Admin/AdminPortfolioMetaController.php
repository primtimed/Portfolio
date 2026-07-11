<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PortfolioMetaRequest;
use App\Services\TsData\PortfolioDataFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminPortfolioMetaController extends Controller
{
    public function edit(PortfolioDataFile $portfolio): Response
    {
        return Inertia::render('admin/PortfolioMeta', [
            'meta' => $portfolio->meta(),
        ]);
    }

    public function editResume(PortfolioDataFile $portfolio): Response
    {
        return Inertia::render('admin/ResumeContent', [
            'meta' => $portfolio->meta(),
        ]);
    }

    public function update(PortfolioMetaRequest $request, PortfolioDataFile $portfolio): RedirectResponse
    {
        $portfolio->updateMeta($request->validated());

        return redirect()->back()->with('status', 'Portfolio content saved.');
    }
}
