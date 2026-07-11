<?php

namespace App\Http\Controllers;

use App\Services\CountryLookup;
use App\Services\TsData\AnalyticsDataFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AnalyticsController extends Controller
{
    public function store(Request $request, AnalyticsDataFile $analytics, CountryLookup $countryLookup): JsonResponse
    {
        $validated = $request->validate([
            'page' => ['required', 'string', 'max:255'],
            'referrer' => ['nullable', 'string', 'max:2048'],
        ]);

        $country = $countryLookup->resolve($request->ip());
        $referrer = isset($validated['referrer']) ? (parse_url($validated['referrer'], PHP_URL_HOST) ?: null) : null;

        $id = $analytics->recordView($validated['page'], $country, $referrer);

        return response()->json(['id' => $id]);
    }

    public function duration(Request $request, string $id, AnalyticsDataFile $analytics): Response
    {
        $validated = $request->validate([
            'durationMs' => ['required', 'integer', 'min:0'],
        ]);

        $analytics->recordDuration($id, $validated['durationMs']);

        return response()->noContent();
    }

    public function downloadResume(Request $request, AnalyticsDataFile $analytics, CountryLookup $countryLookup): Response
    {
        $validated = $request->validate([
            'referrer' => ['nullable', 'string', 'max:2048'],
        ]);

        $country = $countryLookup->resolve($request->ip());
        $referrer = isset($validated['referrer']) ? (parse_url($validated['referrer'], PHP_URL_HOST) ?: null) : null;

        $analytics->recordDownload($country, $referrer);

        return response()->noContent();
    }
}
