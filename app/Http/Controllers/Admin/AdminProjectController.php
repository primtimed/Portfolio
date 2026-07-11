<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Services\TsData\PortfolioDataFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminProjectController extends Controller
{
    public function index(PortfolioDataFile $portfolio): Response
    {
        return Inertia::render('admin/projects/Index', [
            'projects' => $portfolio->projects(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/Form', [
            'project' => null,
            'index' => null,
        ]);
    }

    public function edit(PortfolioDataFile $portfolio, int $project): Response
    {
        return Inertia::render('admin/projects/Form', [
            'project' => $portfolio->project($project),
            'index' => $project,
        ]);
    }

    public function store(ProjectRequest $request, PortfolioDataFile $portfolio): RedirectResponse
    {
        $portfolio->addProject($request->validated());

        return redirect()->route('admin.projects.index')->with('status', 'Project added.');
    }

    public function update(ProjectRequest $request, PortfolioDataFile $portfolio, int $project): RedirectResponse
    {
        $portfolio->updateProject($project, $request->validated());

        return redirect()->route('admin.projects.index')->with('status', 'Project saved.');
    }

    public function destroy(PortfolioDataFile $portfolio, int $project): RedirectResponse
    {
        $portfolio->deleteProject($project);

        return redirect()->route('admin.projects.index')->with('status', 'Project deleted.');
    }
}
