<template>
    <Head title="Analytics" />

    <AdminLayout>
        <div class="mb-8">
            <h1
                class="text-2xl font-extrabold tracking-tight uppercase [font-family:var(--font-display)]"
            >
                Analytics
            </h1>
            <p class="mt-1 text-sm text-(--text-dim)">
                Recorded straight from real visits, no database — logged to
                <code class="text-(--text)">storage/app/analytics.ts</code>.
            </p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Total views
                </div>
                <div class="mt-1 text-lg font-semibold">{{ totalViews }}</div>
            </div>
            <div class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Resume downloads
                </div>
                <div class="mt-1 text-lg font-semibold">{{ totalResumeDownloads }}</div>
            </div>
            <div class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Countries
                </div>
                <div class="mt-1 text-lg font-semibold">{{ countries.length }}</div>
            </div>
            <div class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Pages tracked
                </div>
                <div class="mt-1 text-lg font-semibold">{{ pages.length }}</div>
            </div>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
                <div class="mb-4 text-lg font-semibold">Viewers by country</div>

                <div class="space-y-2">
                    <div
                        v-for="row in countries"
                        :key="row.country"
                        class="flex items-center justify-between gap-3 border-b border-(--border) pb-2 text-sm last:border-b-0 last:pb-0"
                    >
                        <span class="text-(--text)">{{ row.country }}</span>
                        <span class="font-semibold text-(--text-dim)">{{ row.count }}</span>
                    </div>

                    <p v-if="countries.length === 0" class="text-sm text-(--text-faint)">
                        No views recorded yet.
                    </p>
                </div>
            </div>

            <div class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
                <div class="mb-4 text-lg font-semibold">Traffic sources</div>

                <div class="space-y-2">
                    <div
                        v-for="row in sources"
                        :key="row.source"
                        class="flex items-center justify-between gap-3 border-b border-(--border) pb-2 text-sm last:border-b-0 last:pb-0"
                    >
                        <span class="text-(--text)">{{ row.source }}</span>
                        <span class="font-semibold text-(--text-dim)">{{ row.count }}</span>
                    </div>

                    <p v-if="sources.length === 0" class="text-sm text-(--text-faint)">
                        No views recorded yet.
                    </p>
                </div>
            </div>
        </div>

        <div class="mt-4 rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
            <div class="mb-4 text-lg font-semibold">View time per page</div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="text-[11px] tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]">
                            <th class="pb-2 font-semibold">Page</th>
                            <th class="pb-2 font-semibold">Views</th>
                            <th class="pb-2 font-semibold">Min</th>
                            <th class="pb-2 font-semibold">Avg</th>
                            <th class="pb-2 font-semibold">Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="row in pages"
                            :key="row.page"
                            class="border-t border-(--border)"
                        >
                            <td class="py-2 pr-2 text-(--text)">{{ row.page }}</td>
                            <td class="py-2 pr-2 text-(--text-dim)">{{ row.views }}</td>
                            <td class="py-2 pr-2 text-(--text-dim)">{{ formatDuration(row.minMs) }}</td>
                            <td class="py-2 pr-2 text-(--text-dim)">{{ formatDuration(row.avgMs) }}</td>
                            <td class="py-2 text-(--text-dim)">{{ formatDuration(row.maxMs) }}</td>
                        </tr>
                    </tbody>
                </table>

                <p v-if="pages.length === 0" class="text-sm text-(--text-faint)">
                    No views recorded yet.
                </p>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface CountryRow {
    country: string;
    count: number;
}

interface SourceRow {
    source: string;
    count: number;
}

interface PageRow {
    page: string;
    views: number;
    minMs: number | null;
    avgMs: number | null;
    maxMs: number | null;
}

defineProps<{
    totalViews: number;
    totalResumeDownloads: number;
    countries: CountryRow[];
    sources: SourceRow[];
    pages: PageRow[];
}>();

function formatDuration(ms: number | null): string {
    if (ms === null) {
        return '—';
    }

    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}
</script>
