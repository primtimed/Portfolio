<?php

namespace App\Http\Requests\Admin;

use App\Services\TsData\HobbiesDataFile;
use Illuminate\Foundation\Http\FormRequest;

class HobbyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'slug' => ['required', 'string', 'regex:/^[a-z0-9-]+$/'],
            'title' => ['nullable', 'string'],
            'tagline' => ['nullable', 'string'],
            'heroImage' => ['nullable', 'string'],
            'description' => ['present', 'array'],
            'description.*' => ['nullable', 'string'],
            'stats' => ['present', 'array'],
            'stats.*.label' => ['nullable', 'string'],
            'stats.*.value' => ['nullable', 'string'],
            'gallery' => ['present', 'array'],
            'gallery.*.image' => ['nullable', 'string'],
            'gallery.*.caption' => ['nullable', 'string'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $slug = $this->input('slug');

            if (! is_string($slug) || $slug === '') {
                return;
            }

            $currentSlug = $this->route('hobby');
            $exists = collect(app(HobbiesDataFile::class)->hobbies())
                ->contains(fn (array $hobby) => $hobby['slug'] === $slug && $hobby['slug'] !== $currentSlug);

            if ($exists) {
                $validator->errors()->add('slug', 'That slug is already used by another hobby.');
            }
        });
    }
}
