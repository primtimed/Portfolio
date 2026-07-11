<template>
    <Head title="Hobbies" />

    <AdminLayout>
        <div class="mb-8 flex items-center justify-between">
            <h1
                class="text-2xl font-extrabold tracking-tight uppercase [font-family:var(--font-display)]"
            >
                Hobbies
            </h1>
            <AdminButton :href="create().url">+ Add hobby</AdminButton>
        </div>

        <div class="space-y-3">
            <div
                v-for="hobby in hobbies"
                :key="hobby.slug"
                class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-(--border) bg-(--bg-sunken) p-4"
            >
                <div class="min-w-0">
                    <div class="truncate font-semibold">{{ hobby.title }}</div>
                    <div class="truncate text-sm text-(--text-dim)">
                        {{ hobby.tagline }}
                    </div>
                </div>
                <div class="flex flex-wrap shrink-0 items-center gap-2">
                    <a
                        :href="`/hobbies/${hobby.slug}`"
                        target="_blank"
                        class="rounded-lg border border-(--border-strong) px-3 py-2 text-xs font-bold tracking-wide text-(--text-dim) uppercase hover:border-(--accent) hover:text-(--accent)"
                    >
                        View ↗
                    </a>
                    <AdminButton
                        variant="secondary"
                        :href="edit(hobby.slug).url"
                        >Edit</AdminButton
                    >
                    <AdminButton
                        variant="danger"
                        @click="destroy(hobby.slug, hobby.title)"
                        >Delete</AdminButton
                    >
                </div>
            </div>

            <p v-if="hobbies.length === 0" class="text-sm text-(--text-faint)">
                No hobbies yet.
            </p>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import AdminButton from '@/components/admin/AdminButton.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { create, destroy as destroyRoute, edit } from '@/routes/admin/hobbies';
import type { Hobby } from '@/types/hobby';

defineProps<{ hobbies: Hobby[] }>();

function destroy(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) {
        return;
    }

    router.delete(destroyRoute(slug).url);
}
</script>
