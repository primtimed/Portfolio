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
                v-for="(hobby, index) in hobbies"
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
                    <div class="flex items-center gap-1">
                        <button
                            type="button"
                            class="rounded-lg border border-(--border-strong) px-2 py-2 text-xs font-bold text-(--text-dim) uppercase hover:border-(--accent) hover:text-(--accent) disabled:pointer-events-none disabled:opacity-30"
                            :disabled="index === 0"
                            aria-label="Move up"
                            @click="move(index, index - 1)"
                        >
                            ↑
                        </button>
                        <button
                            type="button"
                            class="rounded-lg border border-(--border-strong) px-2 py-2 text-xs font-bold text-(--text-dim) uppercase hover:border-(--accent) hover:text-(--accent) disabled:pointer-events-none disabled:opacity-30"
                            :disabled="index === hobbies.length - 1"
                            aria-label="Move down"
                            @click="move(index, index + 1)"
                        >
                            ↓
                        </button>
                    </div>
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
import { create, destroy as destroyRoute, edit, reorder } from '@/routes/admin/hobbies';
import type { Hobby } from '@/types/hobby';

const props = defineProps<{ hobbies: Hobby[] }>();

function destroy(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) {
        return;
    }

    router.delete(destroyRoute(slug).url);
}

function move(from: number, to: number) {
    if (to < 0 || to >= props.hobbies.length) {
        return;
    }

    const order = props.hobbies.map((hobby) => hobby.slug);
    order.splice(to, 0, order.splice(from, 1)[0]);

    router.post(reorder().url, { order }, { preserveScroll: true });
}
</script>
