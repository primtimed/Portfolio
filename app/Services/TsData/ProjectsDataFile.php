<?php

namespace App\Services\TsData;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProjectsDataFile extends TsDataFile
{
    private const EXPORTS = [
        'projects' => 'Project[]',
    ];

    protected function path(): string
    {
        return resource_path('js/data/projects.ts');
    }

    protected function header(): string
    {
        return <<<'TS'
        import type { Project } from '@/types/portfolio';

        export function projectSlug(title: string): string {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        TS;
    }

    protected function exports(): array
    {
        return self::EXPORTS;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function projects(): array
    {
        return array_values($this->read()['projects']);
    }

    public function project(int $index): array
    {
        return $this->projects()[$index] ?? throw new NotFoundHttpException('Project not found.');
    }

    /**
     * @param  array<string, mixed>  $project
     */
    public function addProject(array $project): void
    {
        $data = $this->read();
        $data['projects'][] = $project;
        $this->write($data);
    }

    /**
     * @param  array<string, mixed>  $project
     */
    public function updateProject(int $index, array $project): void
    {
        $data = $this->read();

        if (! array_key_exists($index, $data['projects'])) {
            throw new NotFoundHttpException('Project not found.');
        }

        $data['projects'][$index] = $project;
        $this->write($data);
    }

    public function deleteProject(int $index): void
    {
        $data = $this->read();

        if (! array_key_exists($index, $data['projects'])) {
            throw new NotFoundHttpException('Project not found.');
        }

        array_splice($data['projects'], $index, 1);
        $this->write($data);
    }
}
