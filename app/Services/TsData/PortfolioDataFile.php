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
        'focusTags' => 'string[]',
        'skillCategories' => 'SkillCategory[]',
        'featuredGamesItchUrl' => null,
        'featuredGames' => 'FeaturedGame[]',
        'featuredProject' => 'FeaturedProject',
        'featuredProjectStats' => 'AboutStat[]',
        'portfolioCta' => null,
        'experience' => 'ExperienceItem[]',
    ];

    protected function path(): string
    {
        return resource_path('js/data/portfolio.ts');
    }

    protected function header(): string
    {
        return <<<'TS'
        import type { AboutStat, ExperienceItem, FeaturedGame, FeaturedProject, SkillCategory } from '@/types/portfolio';
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
        return $this->read();
    }

    /**
     * @param  array<string, mixed>  $meta
     */
    public function updateMeta(array $meta): void
    {
        $this->write([...$this->read(), ...$meta]);
    }
}
