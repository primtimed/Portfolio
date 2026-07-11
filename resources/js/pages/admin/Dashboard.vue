<template>
    <Head title="Admin dashboard" />

    <AdminLayout>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1
                    class="text-2xl font-extrabold tracking-tight uppercase [font-family:var(--font-display)]"
                >
                    Dashboard
                </h1>
                <p class="mt-1 text-sm text-(--text-dim)">
                    Edits save straight to
                    <code class="text-(--text)">resources/js/data/*.ts</code>.
                    While <code class="text-(--text)">npm run dev</code> is
                    running, saved changes hot-reload on the live pages
                    immediately.
                </p>
            </div>
            <a
                href="/"
                target="_blank"
                class="text-sm text-(--text-dim) underline hover:text-(--accent)"
                >View site ↗</a
            >
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <Link
                :href="analytics().url"
                class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5 transition-colors hover:border-(--accent)"
            >
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Analytics
                </div>
                <div class="mt-1 text-lg font-semibold">
                    {{ totalViews }} view{{ totalViews === 1 ? '' : 's' }}
                </div>
            </Link>
            <Link
                :href="edit().url"
                class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5 transition-colors hover:border-(--accent)"
            >
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Site content
                </div>
                <div class="mt-1 text-lg font-semibold">
                    Profile, skills, featured, experience
                </div>
            </Link>
            <Link
                :href="projectsIndex().url"
                class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5 transition-colors hover:border-(--accent)"
            >
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Projects
                </div>
                <div class="mt-1 text-lg font-semibold">
                    {{ projectCount }} project{{
                        projectCount === 1 ? '' : 's'
                    }}
                </div>
            </Link>
            <Link
                :href="hobbiesIndex().url"
                class="rounded-xl border border-(--border) bg-(--bg-sunken) p-5 transition-colors hover:border-(--accent)"
            >
                <div
                    class="text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                >
                    Hobbies
                </div>
                <div class="mt-1 text-lg font-semibold">
                    {{ hobbyCount }} hobb{{ hobbyCount === 1 ? 'y' : 'ies' }}
                </div>
            </Link>
        </div>

        <div class="mt-8 rounded-xl border border-(--border) bg-(--bg-sunken) p-5">
            <div class="text-lg font-semibold">Rebuild for production</div>
            <p class="mt-1 text-sm text-(--text-dim)">
                Runs <code class="text-(--text)">npm run build</code> on the
                server so a deployed build picks up your edits. Only needed
                outside of <code class="text-(--text)">npm run dev</code>.
            </p>
            <form class="mt-4" @submit.prevent="rebuildForm.submit()">
                <AdminButton
                    type="submit"
                    variant="secondary"
                    :disabled="rebuildForm.processing"
                >
                    {{ rebuildForm.processing ? 'Building…' : 'Rebuild now' }}
                </AdminButton>
            </form>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminButton from '@/components/admin/AdminButton.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { analytics, rebuild } from '@/routes/admin';
import { index as hobbiesIndex } from '@/routes/admin/hobbies';
import { edit } from '@/routes/admin/portfolio-meta';
import { index as projectsIndex } from '@/routes/admin/projects';

defineProps<{ projectCount: number; hobbyCount: number; totalViews: number }>();

const rebuildForm = useForm(rebuild(), {});
</script>
