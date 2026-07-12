<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PortfolioMetaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $statuses = ['Prototype', 'In Development', 'Released'];
        $statIcons = ['device', 'controller', 'package', 'trophy'];
        $skillIcons = ['code', 'gamepad', 'network', 'tools'];

        return [
            'profile.name' => ['nullable', 'string'],
            'profile.tagline' => ['nullable', 'string'],
            'profile.intro' => ['nullable', 'string'],
            'profile.accent' => ['nullable', 'string'],
            'profile.email' => ['nullable', 'string'],
            'profile.github' => ['nullable', 'string'],
            'profile.linkedin' => ['nullable', 'string'],
            'profile.backgroundVideoUrl' => ['nullable', 'string'],
            'profile.photoUrl' => ['nullable', 'string'],
            'profile.aboutEyebrow' => ['nullable', 'string'],
            'profile.aboutHeading' => ['nullable', 'string'],
            'profile.aboutParagraphs' => ['present', 'array'],
            'profile.aboutParagraphs.*' => ['nullable', 'string'],
            'profile.aboutCtaPrompt' => ['nullable', 'string'],
            'profile.aboutCtaLabel' => ['nullable', 'string'],

            'aboutStats' => ['present', 'array'],
            'aboutStats.*.icon' => ['nullable', Rule::in($statIcons)],
            'aboutStats.*.value' => ['nullable', 'string'],
            'aboutStats.*.label' => ['nullable', 'string'],

            'focusTags' => ['present', 'array'],
            'focusTags.*' => ['nullable', 'string'],

            'skillCategories' => ['present', 'array'],
            'skillCategories.*.title' => ['nullable', 'string'],
            'skillCategories.*.icon' => ['nullable', Rule::in($skillIcons)],
            'skillCategories.*.skills' => ['present', 'array'],
            'skillCategories.*.skills.*.name' => ['nullable', 'string'],
            'skillCategories.*.skills.*.level' => ['nullable', 'integer', 'between:1,5'],

            'featuredGamesItchUrl' => ['nullable', 'string'],

            'featuredGames' => ['present', 'array'],
            'featuredGames.*.title' => ['nullable', 'string'],
            'featuredGames.*.tagline' => ['nullable', 'string'],
            'featuredGames.*.genre' => ['nullable', 'string'],
            'featuredGames.*.engine' => ['nullable', 'string'],
            'featuredGames.*.status' => ['nullable', Rule::in($statuses)],
            'featuredGames.*.image' => ['nullable', 'string'],
            'featuredGames.*.url' => ['nullable', 'string'],

            'featuredProject.title' => ['nullable', 'string'],
            'featuredProject.tagline' => ['nullable', 'string'],
            'featuredProject.description' => ['nullable', 'string'],
            'featuredProject.image' => ['nullable', 'string'],
            'featuredProject.status' => ['nullable', Rule::in($statuses)],
            'featuredProject.tags' => ['present', 'array'],
            'featuredProject.tags.*' => ['nullable', 'string'],
            'featuredProject.highlights' => ['present', 'array'],
            'featuredProject.highlights.*' => ['nullable', 'string'],
            'featuredProject.url' => ['nullable', 'string'],
            'featuredProject.sourceUrl' => ['nullable', 'string'],

            'featuredProjectStats' => ['present', 'array'],
            'featuredProjectStats.*.icon' => ['nullable', Rule::in($statIcons)],
            'featuredProjectStats.*.value' => ['nullable', 'string'],
            'featuredProjectStats.*.label' => ['nullable', 'string'],

            'portfolioCta.eyebrow' => ['nullable', 'string'],
            'portfolioCta.heading' => ['nullable', 'string'],
            'portfolioCta.lines' => ['present', 'array'],
            'portfolioCta.lines.*' => ['nullable', 'string'],
            'portfolioCta.buttonLabel' => ['nullable', 'string'],
            'portfolioCta.buttonUrl' => ['nullable', 'string'],

            'experience' => ['present', 'array'],
            'experience.*.title' => ['nullable', 'string'],
            'experience.*.meta' => ['nullable', 'string'],
            'experience.*.description' => ['nullable', 'string'],
            'experience.*.tags' => ['nullable', 'array'],
            'experience.*.tags.*' => ['nullable', 'string'],

            'education' => ['present', 'array'],
            'education.*.title' => ['nullable', 'string'],
            'education.*.institution' => ['nullable', 'string'],
            'education.*.meta' => ['nullable', 'string'],
            'education.*.description' => ['nullable', 'string'],

            'jobs' => ['present', 'array'],
            'jobs.*.title' => ['nullable', 'string'],
            'jobs.*.company' => ['nullable', 'string'],
            'jobs.*.meta' => ['nullable', 'string'],
            'jobs.*.description' => ['nullable', 'string'],
        ];
    }
}
