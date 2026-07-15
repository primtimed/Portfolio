<?php

namespace App\Services\TsData;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class HobbiesDataFile extends TsDataFile
{
    private const EXPORTS = [
        'hobbies' => 'Hobby[]',
    ];

    protected function path(): string
    {
        return resource_path('js/data/hobbies.ts');
    }

    protected function header(): string
    {
        return <<<'TS'
        import type { Hobby } from '@/types/hobby';
        TS;
    }

    protected function exports(): array
    {
        return self::EXPORTS;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function hobbies(): array
    {
        return array_values($this->read()['hobbies']);
    }

    public function hobby(string $slug): array
    {
        foreach ($this->hobbies() as $hobby) {
            if ($hobby['slug'] === $slug) {
                return $hobby;
            }
        }

        throw new NotFoundHttpException('Hobby not found.');
    }

    /**
     * @param  array<string, mixed>  $hobby
     */
    public function addHobby(array $hobby): void
    {
        $data = $this->read();
        $data['hobbies'][] = $hobby;
        $this->write($data);
    }

    /**
     * @param  array<string, mixed>  $hobby
     */
    public function updateHobby(string $slug, array $hobby): void
    {
        $data = $this->read();

        foreach ($data['hobbies'] as $i => $existing) {
            if ($existing['slug'] === $slug) {
                $data['hobbies'][$i] = $hobby;
                $this->write($data);

                return;
            }
        }

        throw new NotFoundHttpException('Hobby not found.');
    }

    public function deleteHobby(string $slug): void
    {
        $data = $this->read();

        foreach ($data['hobbies'] as $i => $existing) {
            if ($existing['slug'] === $slug) {
                array_splice($data['hobbies'], $i, 1);
                $this->write($data);

                return;
            }
        }

        throw new NotFoundHttpException('Hobby not found.');
    }

    /**
     * @param  array<int, string>  $order  hobby slugs, in their new order
     */
    public function reorder(array $order): void
    {
        $data = $this->read();

        $bySlug = [];
        foreach ($data['hobbies'] as $hobby) {
            $bySlug[$hobby['slug']] = $hobby;
        }

        if (array_diff(array_keys($bySlug), $order) !== [] || array_diff($order, array_keys($bySlug)) !== []) {
            throw new NotFoundHttpException('Hobby order does not match existing hobbies.');
        }

        $data['hobbies'] = array_map(fn (string $slug) => $bySlug[$slug], $order);
        $this->write($data);
    }
}
