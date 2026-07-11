<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Services\TsData\ProjectsDataFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminProjectController extends Controller
{
    public function index(ProjectsDataFile $projects): Response
    {
        return Inertia::render('admin/projects/Index', [
            'projects' => $projects->projects(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/Form', [
            'project' => null,
            'index' => null,
        ]);
    }

    public function edit(ProjectsDataFile $projects, int $project): Response
    {
        return Inertia::render('admin/projects/Form', [
            'project' => $projects->project($project),
            'index' => $project,
        ]);
    }

    public function store(ProjectRequest $request, ProjectsDataFile $projects): RedirectResponse
    {
        $projects->addProject($request->validated());

        return redirect()->route('admin.projects.index')->with('status', 'Project added.');
    }

    public function update(ProjectRequest $request, ProjectsDataFile $projects, int $project): RedirectResponse
    {
        $projects->updateProject($project, $request->validated());

        return redirect()->route('admin.projects.index')->with('status', 'Project saved.');
    }

    public function destroy(ProjectsDataFile $projects, int $project): RedirectResponse
    {
        $projects->deleteProject($project);

        return redirect()->route('admin.projects.index')->with('status', 'Project deleted.');
    }
}
