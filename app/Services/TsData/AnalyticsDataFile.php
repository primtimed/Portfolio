<?php

namespace App\Services\TsData;

use Illuminate\Support\Str;

class AnalyticsDataFile extends TsDataFile
{
    protected function path(): string
    {
        // Deliberately outside resources/js: that directory is watched by the
        // frontend dev tooling (Vite/Herd live-reload), and this file is written
        // on every single page view. Writing it there caused a reload loop: view
        // written -> dev server sees the project file change -> reloads the page
        // -> logs another view -> repeat.
        return storage_path('app/analytics.ts');
    }

    protected function header(): string
    {
        return <<<'TS'
        import type { PageView, ResumeDownload } from '@/types/analytics';
        TS;
    }

    protected function exports(): array
    {
        return [
            'pageViews' => 'PageView[]',
            'resumeDownloads' => 'ResumeDownload[]',
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function views(): array
    {
        return $this->readWithDefaults()['pageViews'];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function downloads(): array
    {
        return $this->readWithDefaults()['resumeDownloads'];
    }

    public function recordView(string $page, ?string $country, ?string $referrer): string
    {
        $id = (string) Str::uuid();

        $this->withLock(function () use ($page, $country, $referrer, $id) {
            $data = $this->readWithDefaults();
            $data['pageViews'][] = [
                'id' => $id,
                'page' => $page,
                'country' => $country,
                'referrer' => $referrer,
                'viewedAt' => now()->toIso8601String(),
                'durationMs' => null,
            ];
            $this->write($data);
        });

        return $id;
    }

    public function recordDuration(string $id, int $durationMs): void
    {
        $this->withLock(function () use ($id, $durationMs) {
            $data = $this->readWithDefaults();

            foreach ($data['pageViews'] as &$view) {
                if ($view['id'] === $id) {
                    $view['durationMs'] = $durationMs;
                    break;
                }
            }
            unset($view);

            $this->write($data);
        });
    }

    public function recordDownload(?string $country, ?string $referrer): void
    {
        $this->withLock(function () use ($country, $referrer) {
            $data = $this->readWithDefaults();
            $data['resumeDownloads'][] = [
                'id' => (string) Str::uuid(),
                'country' => $country,
                'referrer' => $referrer,
                'downloadedAt' => now()->toIso8601String(),
            ];
            $this->write($data);
        });
    }

    /**
     * Older analytics.ts files predate the "resumeDownloads" export, and write()
     * requires every declared export to be present. Backfill any missing keys
     * with an empty array so both old and new files round-trip safely.
     *
     * @return array<string, mixed>
     */
    private function readWithDefaults(): array
    {
        return [
            'pageViews' => [],
            'resumeDownloads' => [],
            ...$this->read(),
        ];
    }

    /**
     * Guards against lost updates when concurrent visitors record views/durations
     * at the same time, since every visit does a read-modify-write on this file.
     */
    private function withLock(callable $callback): void
    {
        $handle = fopen($this->path(), 'c+');

        if ($handle === false) {
            throw new \RuntimeException("Unable to open {$this->path()} for writing.");
        }

        flock($handle, LOCK_EX);

        try {
            $callback();
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }
}
