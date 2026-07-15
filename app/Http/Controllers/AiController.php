<?php

namespace App\Http\Controllers;

use App\Services\TsData\HobbiesDataFile;
use App\Services\TsData\PortfolioDataFile;
use App\Services\TsData\ProjectsDataFile;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AiController extends Controller
{
    public function show(string $page, PortfolioDataFile $portfolio, ProjectsDataFile $projects): Response
    {
        $markdown = match ($page) {
            'home' => $this->home($portfolio, $projects),
            'resume' => $this->resume($portfolio),
            default => throw new NotFoundHttpException("No page found for \"{$page}\"."),
        };

        return response($markdown, 200, ['Content-Type' => 'text/markdown; charset=UTF-8']);
    }

    public function showProject(string $project, ProjectsDataFile $projects): Response
    {
        foreach ($projects->projects() as $item) {
            if ($this->slugify($item['title']) === $project) {
                return response($this->project($item), 200, ['Content-Type' => 'text/markdown; charset=UTF-8']);
            }
        }

        throw new NotFoundHttpException("No project found for \"{$project}\".");
    }

    public function showHobby(string $hobby, HobbiesDataFile $hobbies): Response
    {
        foreach ($hobbies->hobbies() as $item) {
            if ($item['slug'] === $hobby) {
                return response($this->hobby($item), 200, ['Content-Type' => 'text/markdown; charset=UTF-8']);
            }
        }

        throw new NotFoundHttpException("No hobby found for \"{$hobby}\".");
    }

    private function slugify(string $title): string
    {
        return trim(preg_replace('/[^a-z0-9]+/', '-', strtolower($title)), '-');
    }

    private function heading(string $title, ?string $meta = null): string
    {
        return $meta ? "### {$title} ({$meta})" : "### {$title}";
    }

    private function home(PortfolioDataFile $portfolio, ProjectsDataFile $projects): string
    {
        $meta = $portfolio->meta();
        $profile = $meta['profile'];
        $allProjects = $projects->projects();
        $featured = null;
        foreach ($allProjects as $project) {
            if ($this->slugify($project['title']) === $meta['featuredProjectSlug']) {
                $featured = $project;
                break;
            }
        }
        $featured ??= $allProjects[0] ?? null;

        $lines = [];
        $lines[] = "# {$profile['name']} — {$profile['tagline']}";
        $lines[] = $profile['intro'];
        $lines[] = '';
        $lines[] = "Contact: {$profile['email']} · {$profile['github']} · {$profile['linkedin']}";
        $lines[] = '';

        $lines[] = '## About';
        foreach ($profile['aboutParagraphs'] ?? [] as $paragraph) {
            $lines[] = $paragraph;
            $lines[] = '';
        }

        if (! empty($meta['aboutStats'])) {
            $lines[] = '### Stats';
            foreach ($meta['aboutStats'] as $stat) {
                $lines[] = "- {$stat['value']} — {$stat['label']}";
            }
            $lines[] = '';
        }

        if (! empty($meta['roadmap'])) {
            $lines[] = '## Roadmap';
            foreach ($meta['roadmap'] as $item) {
                $lines[] = $this->heading($item['title'], $item['meta'] ?? null);
                $lines[] = $item['description'];
                if (! empty($item['details'])) {
                    $lines[] = $item['details'];
                }
                if (! empty($item['url'])) {
                    $lines[] = "Link: {$item['url']}";
                }
                $lines[] = '';
            }
        }

        if (! empty($meta['skillCategories'])) {
            $lines[] = '## Skills';
            foreach ($meta['skillCategories'] as $category) {
                $lines[] = "### {$category['title']}";
                foreach ($category['skills'] as $skill) {
                    $lines[] = "- {$skill['name']} ({$skill['level']}/5)";
                }
                $lines[] = '';
            }
        }

        if (! empty($allProjects)) {
            $lines[] = '## Games';
            foreach ($allProjects as $project) {
                $lines[] = "- **{$project['title']}** — {$project['tagline']} ({$project['genre']}, {$project['engine']}, {$project['status']})";
            }
            $lines[] = '';
        }

        if ($featured) {
            $lines[] = '## Featured Project';
            $lines[] = "### {$featured['title']}";
            $lines[] = $featured['tagline'];
            $lines[] = $featured['description'];
            foreach ($meta['featuredProjectStats'] ?? [] as $stat) {
                $lines[] = "- {$stat['label']}: {$stat['value']}";
            }
            $lines[] = '';
        }

        if (! empty($meta['portfolioCta'])) {
            $cta = $meta['portfolioCta'];
            $lines[] = '## Call to Action';
            $lines[] = "**{$cta['heading']}**";
            foreach ($cta['lines'] ?? [] as $line) {
                $lines[] = $line;
            }
            $lines[] = "[{$cta['buttonLabel']}]({$cta['buttonUrl']})";
        }

        return implode("\n", $lines);
    }

    private function resume(PortfolioDataFile $portfolio): string
    {
        $meta = $portfolio->meta();
        $profile = $meta['profile'];

        $lines = [];
        $lines[] = "# Resume — {$profile['name']}";
        $lines[] = $profile['tagline'];
        $lines[] = "Contact: {$profile['email']} · {$profile['github']} · {$profile['linkedin']}";
        $lines[] = '';

        if (! empty($meta['resumeSummary'])) {
            $lines[] = '## Summary';
            foreach ($meta['resumeSummary'] as $para) {
                $lines[] = $para;
            }
            $lines[] = '';
        }

        if (! empty($meta['jobs'])) {
            $lines[] = '## Experience';
            foreach ($meta['jobs'] as $job) {
                $lines[] = $this->heading($job['title'], $job['meta'] ?? null);
                if (! empty($job['company'])) {
                    $lines[] = $job['company'];
                }
                $lines[] = $job['description'];
                $lines[] = '';
            }
        }

        if (! empty($meta['experience'])) {
            $lines[] = '## Projects';
            foreach ($meta['experience'] as $item) {
                $lines[] = $this->heading($item['title'], $item['meta'] ?? null);
                $lines[] = $item['description'];
                if (! empty($item['tags'])) {
                    $lines[] = 'Tech: '.implode(', ', $item['tags']);
                }
                $lines[] = '';
            }
        }

        if (! empty($meta['education'])) {
            $lines[] = '## Education';
            foreach ($meta['education'] as $item) {
                $lines[] = $this->heading($item['title'], $item['meta'] ?? null);
                if (! empty($item['institution'])) {
                    $lines[] = $item['institution'];
                }
                $lines[] = $item['description'];
                $lines[] = '';
            }
        }

        if (! empty($meta['resumeSkillCategories'])) {
            $lines[] = '## Skills';
            foreach ($meta['resumeSkillCategories'] as $category) {
                $lines[] = "### {$category['title']}";
                foreach ($category['skills'] as $skill) {
                    $lines[] = "- {$skill['name']} ({$skill['level']}/5)";
                }
                $lines[] = '';
            }
        }

        if (! empty($meta['resumeInterests'])) {
            $lines[] = '## Interests';
            $lines[] = implode(', ', $meta['resumeInterests']);
        }

        return implode("\n", $lines);
    }

    /**
     * @param  array<string, mixed>  $project
     */
    private function project(array $project): string
    {
        $lines = [];
        $lines[] = "# {$project['title']}";
        $lines[] = $project['tagline'];
        $lines[] = '';

        foreach (['role' => 'Role', 'genre' => 'Genre', 'engine' => 'Engine', 'status' => 'Status'] as $key => $label) {
            if (! empty($project[$key])) {
                $lines[] = "**{$label}:** {$project[$key]}";
            }
        }
        $lines[] = '';

        $lines[] = '## Overview';
        $lines[] = $project['description'];
        $lines[] = '';

        if (! empty($project['highlights'])) {
            $lines[] = '## Highlights';
            foreach ($project['highlights'] as $highlight) {
                $lines[] = "- {$highlight}";
            }
            $lines[] = '';
        }

        if (! empty($project['tags'])) {
            $lines[] = 'Tags: '.implode(', ', $project['tags']);
            $lines[] = '';
        }

        if (! empty($project['processSteps'])) {
            $lines[] = '## Process';
            foreach ($project['processSteps'] as $step) {
                $lines[] = "### {$step['title']}";
                $lines[] = $step['description'];
                $lines[] = '';
            }
        }

        if (! empty($project['contributionsText'])) {
            $lines[] = '## Contributions';
            $lines[] = $project['contributionsText'];
            $lines[] = '';
        }

        if (! empty($project['outcomes'])) {
            $lines[] = '## Outcomes';
            foreach ($project['outcomes'] as $stat) {
                $lines[] = "- {$stat['label']}: {$stat['value']}";
            }
            $lines[] = '';
        }

        if (! empty($project['url']) && $project['url'] !== '#') {
            $lines[] = "Link: {$project['url']}";
        }
        if (! empty($project['sourceUrl'])) {
            $lines[] = "Source: {$project['sourceUrl']}";
        }

        return implode("\n", $lines);
    }

    /**
     * @param  array<string, mixed>  $hobby
     */
    private function hobby(array $hobby): string
    {
        $lines = [];
        $lines[] = "# {$hobby['title']}";
        $lines[] = $hobby['tagline'];
        $lines[] = '';

        foreach ($hobby['description'] ?? [] as $paragraph) {
            $lines[] = $paragraph;
            $lines[] = '';
        }

        if (! empty($hobby['stats'])) {
            $lines[] = '## Stats';
            foreach ($hobby['stats'] as $stat) {
                $lines[] = "- {$stat['label']}: {$stat['value']}";
            }
            $lines[] = '';
        }

        if (! empty($hobby['gallery'])) {
            $captions = array_filter(array_column($hobby['gallery'], 'caption'));
            if ($captions) {
                $lines[] = '## Gallery captions';
                foreach ($captions as $caption) {
                    $lines[] = "- {$caption}";
                }
            }
        }

        return implode("\n", $lines);
    }
}
