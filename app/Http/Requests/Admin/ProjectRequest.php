<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string'],
            'tagline' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'role' => ['nullable', 'string'],
            'genre' => ['nullable', 'string'],
            'engine' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['Prototype', 'In Development', 'Released'])],
            'image' => ['nullable', 'string'],
            'backgroundVideoUrl' => ['nullable', 'string'],
            'tags' => ['present', 'array'],
            'tags.*' => ['nullable', 'string'],
            'highlights' => ['present', 'array'],
            'highlights.*' => ['nullable', 'string'],
            'url' => ['nullable', 'string'],
            'sourceUrl' => ['nullable', 'string'],
            'media' => ['nullable', 'array'],
            'media.*.type' => ['nullable', Rule::in(['image', 'video'])],
            'media.*.src' => ['nullable', 'string'],
            'media.*.caption' => ['nullable', 'string'],
            'outcomes' => ['present', 'array'],
            'outcomes.*.label' => ['nullable', 'string'],
            'outcomes.*.value' => ['nullable', 'string'],
            'processSteps' => ['present', 'array'],
            'processSteps.*.title' => ['nullable', 'string'],
            'processSteps.*.description' => ['nullable', 'string'],
        ];
    }
}
