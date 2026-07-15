<?php

namespace App\Services\TsData;

class PortfolioDataFile extends TsDataFile
{
    /**
     * Order here is the order fields are written to disk.
     */
    private const EXPORTS = [
        'profile' => null,
        'aboutStats' => 'AboutStat[]',
        'roadmap' => 'RoadmapItem[]',
        'focusTags' => 'string[]',
        'skillCategories' => 'SkillCategory[]',
        'featuredGamesItchUrl' => null,
        'featuredProjectSlug' => null,
        'featuredProjectStats' => 'AboutStat[]',
        'portfolioCta' => null,
        'resumeSummary' => 'string[]',
        'resumeSkillCategories' => 'SkillCategory[]',
        'resumeInterests' => 'string[]',
        'experience' => 'ExperienceItem[]',
        'education' => 'EducationItem[]',
        'jobs' => 'JobItem[]',
    ];

    protected function path(): string
    {
        return resource_path('js/data/portfolio.ts');
    }

    protected function header(): string
    {
        return <<<'TS'
        import type { AboutStat, EducationItem, ExperienceItem, JobItem, RoadmapItem, SkillCategory } from '@/types/portfolio';
        TS;
    }

    protected function exports(): array
    {
        return self::EXPORTS;
    }

    /**
     * @return array<string, mixed>
     */
    public function meta(): array
    {
        return $this->readWithDefaults();
    }

    /**
     * @param  array<string, mixed>  $meta
     */
    public function updateMeta(array $meta): void
    {
        $this->write([...$this->readWithDefaults(), ...$meta]);
    }

    /**
     * Older portfolio.ts files predate the "education"/"jobs" exports, and write()
     * requires every declared export to be present. Backfill any missing keys
     * so both old and new files round-trip safely.
     *
     * @return array<string, mixed>
     */
    private function readWithDefaults(): array
    {
        return [
            'education' => [],
            'jobs' => [],
            'roadmap' => [],
            'resumeSummary' => [],
            'resumeSkillCategories' => [],
            'resumeInterests' => [],
            'featuredProjectSlug' => '',
            ...$this->read(),
        ];
    }
}
