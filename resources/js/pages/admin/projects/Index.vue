<template>
    <Head title="Projects" />

    <AdminLayout>
        <div class="mb-8 flex items-center justify-between">
            <h1
                class="text-2xl font-extrabold tracking-tight uppercase [font-family:var(--font-display)]"
            >
                Projects
            </h1>
            <AdminButton :href="create().url">+ Add project</AdminButton>
        </div>

        <div class="space-y-3">
            <div
                v-for="(project, index) in projects"
                :key="project.title + index"
                class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-(--border) bg-(--bg-sunken) p-4"
            >
                <div class="min-w-0">
                    <div class="truncate font-semibold">
                        {{ project.title }}
                    </div>
                    <div class="truncate text-sm text-(--text-dim)">
                        {{ project.tagline }}
                    </div>
                </div>
                <div class="flex flex-wrap shrink-0 items-center gap-2">
                    <a
                        :href="`/project/${projectSlug(project.title)}`"
                        target="_blank"
                        class="rounded-lg border border-(--border-strong) px-3 py-2 text-xs font-bold tracking-wide text-(--text-dim) uppercase hover:border-(--accent) hover:text-(--accent)"
                    >
                        View ↗
                    </a>
                    <AdminButton variant="secondary" :href="edit(index).url"
                        >Edit</AdminButton
                    >
                    <AdminButton
                        variant="danger"
                        @click="destroy(index, project.title)"
                        >Delete</AdminButton
                    >
                </div>
            </div>

            <p v-if="projects.length === 0" class="text-sm text-(--text-faint)">
                No projects yet.
            </p>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import AdminButton from '@/components/admin/AdminButton.vue';
import { projectSlug } from '@/data/portfolio';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { create, destroy as destroyRoute, edit } from '@/routes/admin/projects';
import type { Project } from '@/types/portfolio';

defineProps<{ projects: Project[] }>();

function destroy(index: number, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) {
        return;
    }

    router.delete(destroyRoute(index).url);
}
</script>
