<template>
    <Head :title="isEdit ? `Edit ${form.title}` : 'Add hobby'" />

    <AdminLayout full-width>
        <div class="flex h-screen flex-col">
            <!-- toolbar -->
            <div
                class="flex flex-wrap shrink-0 items-center justify-between gap-4 border-b border-(--border) bg-(--bg-sunken) px-6 py-3"
            >
                <div class="flex min-w-0 items-center gap-3">
                    <AdminButton variant="secondary" :href="index().url"
                        >&larr; Exit</AdminButton
                    >
                    <h1
                        class="truncate text-sm font-bold tracking-tight text-(--text) uppercase [font-family:var(--font-display)]"
                    >
                        {{ isEdit ? `Editing “${form.title || 'hobby'}”` : 'Add hobby' }}
                    </h1>
                </div>

                <div class="flex flex-wrap items-center justify-end gap-3">
                    <div class="flex items-center gap-1 rounded-lg border border-(--border) p-1">
                        <button
                            v-for="d in devices"
                            :key="d.key"
                            type="button"
                            :title="d.label"
                            class="rounded-md px-2.5 py-1.5 text-xs font-bold tracking-wide uppercase transition-colors"
                            :class="
                                device === d.key
                                    ? 'bg-(--accent) text-(--accent-ink)'
                                    : 'text-(--text-faint) hover:text-(--text)'
                            "
                            @click="device = d.key"
                        >
                            {{ d.label }}
                        </button>
                    </div>

                    <a
                        v-if="isEdit"
                        :href="`/hobbies/${props.hobby!.slug}`"
                        target="_blank"
                        rel="noopener"
                        class="text-xs font-bold tracking-wide text-(--text-faint) uppercase hover:text-(--accent)"
                        >View live ↗</a
                    >

                    <AdminButton :disabled="form.processing" @click="form.submit()">
                        {{
                            form.processing
                                ? 'Saving…'
                                : isEdit
                                  ? 'Save changes'
                                  : 'Add hobby'
                        }}
                    </AdminButton>
                </div>
            </div>

            <div class="flex flex-1 flex-col overflow-hidden lg:flex-row">
                <!-- fields -->
                <div class="w-full shrink-0 overflow-y-auto border-(--border) px-6 py-6 lg:w-[440px] lg:border-r">
                    <form id="hobby-form" class="space-y-6" @submit.prevent="form.submit()">
                        <AdminSection title="Hero" preview-target=".cs-hero">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <AdminField label="Title" :error="form.errors.title"
                                    ><AdminInput v-model="form.title"
                                /></AdminField>
                                <AdminField label="Slug" :error="form.errors.slug">
                                    <AdminInput
                                        v-model="form.slug"
                                        placeholder="e.g. photography"
                                    />
                                </AdminField>
                            </div>

                            <AdminField label="Tagline" :error="form.errors.tagline"
                                ><AdminInput v-model="form.tagline"
                            /></AdminField>
                            <AdminField
                                label="Hero background"
                                :error="form.errors.heroImage"
                                hint="Image URL, video file (.mp4), or a YouTube link."
                            >
                                <AdminInput v-model="form.heroImage" />
                            </AdminField>
                        </AdminSection>

                        <AdminSection title="Stats (meta strip)" preview-target=".cs-meta-strip">
                            <AdminRepeaterCard
                                :model-value="form.stats"
                                label="stat"
                                @add="form.stats.push({ label: '', value: '' })"
                                @remove="(i) => form.stats.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <AdminField label="Label"
                                            ><AdminInput v-model="item.label"
                                        /></AdminField>
                                        <AdminField label="Value"
                                            ><AdminInput v-model="item.value"
                                        /></AdminField>
                                    </div>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>

                        <AdminSection title="Overview" preview-target=".cs-overview">
                            <AdminField
                                label="Description paragraphs"
                                :error="form.errors.description"
                                hint="Wrap text in **double asterisks** to make it bold."
                            >
                                <AdminStringList v-model="form.description" />
                            </AdminField>
                        </AdminSection>

                        <AdminSection title="Gallery" preview-target=".cs-gallery">
                            <AdminRepeaterCard
                                :model-value="form.gallery"
                                label="gallery item"
                                @add="form.gallery.push({ type: 'image', image: '', caption: '' })"
                                @remove="(i) => form.gallery.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <AdminField label="Type"
                                            ><AdminSelect
                                                v-model="item.type"
                                                :options="galleryTypes"
                                        /></AdminField>
                                        <AdminField label="Image/Video URL" class="col-span-2"
                                            ><AdminInput v-model="item.image"
                                        /></AdminField>
                                    </div>
                                    <AdminField label="Caption"
                                        ><AdminInput v-model="item.caption"
                                    /></AdminField>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>
                    </form>
                </div>

                <!-- live preview -->
                <div class="hidden flex-1 flex-col items-center overflow-auto bg-(--bg) px-6 py-6 lg:flex">
                    <div
                        class="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                    >
                        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live preview
                    </div>
                    <div
                        class="overflow-hidden rounded-xl border border-(--border) bg-white shadow-2xl transition-[width] duration-200"
                        :style="{ width: previewWidth }"
                    >
                        <iframe
                            ref="previewFrame"
                            :src="previewUrl"
                            title="Live preview"
                            class="h-[calc(100vh-170px)] w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AdminField from '@/components/admin/AdminField.vue';
import AdminInput from '@/components/admin/AdminInput.vue';
import AdminRepeaterCard from '@/components/admin/AdminRepeaterCard.vue';
import AdminSection from '@/components/admin/AdminSection.vue';
import AdminSelect from '@/components/admin/AdminSelect.vue';
import AdminStringList from '@/components/admin/AdminStringList.vue';
import { useAdminPreviewPublisher, useAdminPreviewScrollSync } from '@/composables/useAdminPreview';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { index, store, update } from '@/routes/admin/hobbies';
import type { Hobby } from '@/types/hobby';

const props = defineProps<{ hobby: Hobby | null }>();

const isEdit = computed(() => props.hobby !== null);

const blank: Hobby = {
    slug: '',
    title: '',
    tagline: '',
    heroImage: '',
    description: [],
    stats: [],
    gallery: [],
};

const form = useForm(
    isEdit.value ? update(props.hobby!.slug) : store(),
    props.hobby
        ? { ...props.hobby, gallery: props.hobby.gallery.map((item) => ({ ...item, type: item.type ?? 'image' })) }
        : blank,
);

const galleryTypes = ['image', 'video'];

const devices = [
    { key: 'desktop' as const, label: 'Desktop' },
    { key: 'tablet' as const, label: 'Tablet' },
    { key: 'mobile' as const, label: 'Mobile' },
];
const device = ref<'desktop' | 'tablet' | 'mobile'>('desktop');
const previewWidth = computed(() => ({ desktop: '100%', tablet: '768px', mobile: '390px' })[device.value]);

const previewUrl = `/hobbies/${props.hobby?.slug || '__preview__'}?admin_preview=1`;

const previewFrame = ref<HTMLIFrameElement | null>(null);

useAdminPreviewPublisher('hobby', previewFrame, () => ({
    hobby: {
        slug: form.slug,
        title: form.title,
        tagline: form.tagline,
        heroImage: form.heroImage,
        description: form.description,
        stats: form.stats,
        gallery: form.gallery,
    },
}));

useAdminPreviewScrollSync(previewFrame);
</script>
