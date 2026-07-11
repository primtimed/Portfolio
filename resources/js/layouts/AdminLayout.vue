<template>
    <div
        class="root min-h-screen bg-(--bg) text-(--text)"
        style="
            --bg: #f7f3ec;
            --bg-sunken: #ffffff;
            --bg-hover: #efe7d8;
            --border: #e5ddd0;
            --border-strong: #d6c9b0;
            --text: #1c1a17;
            --text-dim: #4a453f;
            --text-faint: #8a8078;
            --accent: #e2733a;
            --accent-ink: #1c1a17;
        "
    >
        <div
            class="flex min-h-screen flex-col md:flex-row"
            :class="fullWidth ? 'w-full' : 'mx-auto max-w-6xl'"
        >
            <aside
                class="flex w-full shrink-0 flex-col border-b border-(--border) bg-(--bg-sunken) px-4 py-4 md:w-56 md:border-r md:border-b-0 md:py-6"
            >
                <div
                    class="mb-4 px-2 text-lg font-extrabold tracking-tight uppercase [font-family:var(--font-display)] md:mb-8"
                >
                    <span class="text-(--text)">brian</span
                    ><span class="text-(--accent)">admin</span>
                </div>
                <nav class="flex flex-1 flex-row gap-1 overflow-x-auto text-sm md:flex-col md:overflow-visible">
                    <Link
                        v-for="item in navItems"
                        :key="item.href"
                        :href="item.href"
                        class="rounded-lg border-l-2 px-3 py-2 whitespace-nowrap transition-colors"
                        :class="
                            isActive(item.href)
                                ? 'border-(--accent) bg-(--bg-hover) text-(--accent)'
                                : 'border-transparent text-(--text-dim) hover:bg-(--bg-hover) hover:text-(--text)'
                        "
                        >{{ item.label }}</Link
                    >
                </nav>
                <Link
                    :href="logout().url"
                    method="post"
                    as="button"
                    class="rounded-lg border-l-2 border-transparent px-3 py-2 text-left text-sm whitespace-nowrap text-(--text-faint) hover:bg-(--bg-hover) hover:text-(--text)"
                >
                    Log out
                </Link>
            </aside>

            <main
                class="min-w-0 flex-1"
                :class="fullWidth ? 'flex flex-col' : 'px-4 py-4 md:px-8 md:py-8'"
            >
                <div
                    v-if="flash.status"
                    class="mb-6 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                    :class="{ 'mx-8 mt-8': fullWidth }"
                >
                    {{ flash.status }}
                </div>
                <div
                    v-if="flash.error"
                    class="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                    :class="{ 'mx-8 mt-8': fullWidth }"
                >
                    {{ flash.error }}
                </div>
                <details
                    v-if="flash.buildOutput"
                    class="mb-6 rounded-lg border border-(--border) bg-(--bg-sunken) px-4 py-3 text-xs text-(--text-dim)"
                    :class="{ 'mx-8 mt-8': fullWidth }"
                >
                    <summary class="cursor-pointer text-sm text-(--text)">
                        Build output
                    </summary>
                    <pre class="mt-2 overflow-x-auto whitespace-pre-wrap">{{
                        flash.buildOutput
                    }}</pre>
                </details>

                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { analytics, dashboard, logout } from '@/routes/admin';
import { index as hobbiesIndex } from '@/routes/admin/hobbies';
import { edit } from '@/routes/admin/portfolio-meta';
import { index as projectsIndex } from '@/routes/admin/projects';
import { edit as editResume } from '@/routes/admin/resume-content';

withDefaults(defineProps<{ fullWidth?: boolean }>(), { fullWidth: false });

const page = usePage<{
    flash: { status?: string; error?: string; buildOutput?: string };
}>();
const flash = computed(() => page.props.flash ?? {});

const navItems = [
    { label: 'Dashboard', href: dashboard().url },
    { label: 'Analytics', href: analytics().url },
    { label: 'Site content', href: edit().url },
    { label: 'Resume', href: editResume().url },
    { label: 'Projects', href: projectsIndex().url },
    { label: 'Hobbies', href: hobbiesIndex().url },
];

const currentPath = computed(() => page.url.split('?')[0]);

function isActive(href: string) {
    return currentPath.value === href || (href !== dashboard().url && currentPath.value.startsWith(href));
}
</script>
