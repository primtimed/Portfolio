<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TsData\AnalyticsDataFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAnalyticsController extends Controller
{
    public function index(Request $request, AnalyticsDataFile $analytics): Response
    {
        $views = $analytics->views();

        return Inertia::render('admin/Analytics', [
            'totalViews' => count($views),
            'totalResumeDownloads' => count($analytics->downloads()),
            'countries' => $this->countryCounts($views),
            'sources' => $this->trafficSources($views, $request->getHost()),
            'pages' => $this->pageStats($views),
        ]);
    }

    /**
     * @param  array<int, array<string, mixed>>  $views
     * @return array<int, array{country: string, count: int}>
     */
    private function countryCounts(array $views): array
    {
        $counts = [];

        foreach ($views as $view) {
            $country = $view['country'] ?? 'Unknown';
            $counts[$country] = ($counts[$country] ?? 0) + 1;
        }

        arsort($counts);

        return collect($counts)
            ->map(fn (int $count, string $country) => ['country' => $country, 'count' => $count])
            ->values()
            ->all();
    }

    /**
     * @param  array<int, array<string, mixed>>  $views
     * @return array<int, array{source: string, count: int}>
     */
    private function trafficSources(array $views, string $ownHost): array
    {
        $counts = [];

        foreach ($views as $view) {
            $source = $this->trafficSourceLabel($view['referrer'] ?? null, $ownHost);
            $counts[$source] = ($counts[$source] ?? 0) + 1;
        }

        arsort($counts);

        return collect($counts)
            ->map(fn (int $count, string $source) => ['source' => $source, 'count' => $count])
            ->values()
            ->all();
    }

    private function trafficSourceLabel(?string $referrerHost, string $ownHost): string
    {
        if ($referrerHost === null || $referrerHost === $ownHost) {
            return 'Direct';
        }

        $searchEngines = [
            'google.' => 'Google',
            'bing.com' => 'Bing',
            'duckduckgo.com' => 'DuckDuckGo',
            'yahoo.' => 'Yahoo',
            'baidu.com' => 'Baidu',
            'yandex.' => 'Yandex',
            'ecosia.org' => 'Ecosia',
        ];

        foreach ($searchEngines as $needle => $label) {
            if (str_contains($referrerHost, $needle)) {
                return $label;
            }
        }

        return $referrerHost;
    }

    /**
     * @param  array<int, array<string, mixed>>  $views
     * @return array<int, array{page: string, views: int, minMs: ?int, maxMs: ?int, avgMs: ?int}>
     */
    private function pageStats(array $views): array
    {
        $byPage = [];

        foreach ($views as $view) {
            $page = $view['page'];
            $byPage[$page]['views'] = ($byPage[$page]['views'] ?? 0) + 1;

            if ($view['durationMs'] !== null) {
                $byPage[$page]['durations'][] = $view['durationMs'];
            }
        }

        $stats = [];

        foreach ($byPage as $page => $data) {
            $durations = $data['durations'] ?? [];

            $stats[] = [
                'page' => $page,
                'views' => $data['views'],
                'minMs' => $durations === [] ? null : min($durations),
                'maxMs' => $durations === [] ? null : max($durations),
                'avgMs' => $durations === [] ? null : (int) round(array_sum($durations) / count($durations)),
            ];
        }

        usort($stats, fn (array $a, array $b) => $b['views'] <=> $a['views']);

        return $stats;
    }
}
