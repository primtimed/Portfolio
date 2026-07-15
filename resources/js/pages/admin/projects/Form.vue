<template>
    <Head :title="isEdit ? `Edit ${form.title}` : 'Add project'" />

    <AdminLayout full-width>
        <div class="flex h-screen flex-col">
            <!-- toolbar -->
            <div
                class="flex flex-wrap shrink-0 items-center justify-between gap-4 border-b border-(--border) bg-(--bg-sunken) px-6 py-3"
            >
                <div class="flex min-w-0 items-center gap-3">
                    <AdminButton variant="secondary" :href="projectsIndex().url"
                        >&larr; Exit</AdminButton
                    >
                    <h1
                        class="truncate text-sm font-bold tracking-tight text-(--text) uppercase [font-family:var(--font-display)]"
                    >
                        {{ isEdit ? `Editing “${form.title || 'project'}”` : 'Add project' }}
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
                        :href="`/project/${liveSlug}`"
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
                                  : 'Add project'
                        }}
                    </AdminButton>
                </div>
            </div>

            <div class="flex flex-1 flex-col overflow-hidden lg:flex-row">
                <!-- fields -->
                <div class="w-full shrink-0 overflow-y-auto border-(--border) px-6 py-6 lg:w-[440px] lg:border-r">
                    <form id="project-form" class="space-y-6" @submit.prevent="form.submit()">
                        <AdminSection title="Hero" preview-target=".cs-hero">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <AdminField label="Title" :error="form.errors.title"
                                    ><AdminInput v-model="form.title"
                                /></AdminField>
                                <AdminField label="Tagline" :error="form.errors.tagline"
                                    ><AdminInput v-model="form.tagline"
                                /></AdminField>
                            </div>

                            <AdminField label="Role" :error="form.errors.role">
                                <AdminInput
                                    v-model="form.role"
                                    :placeholder="`${form.genre || 'Genre'} Engineer`"
                                />
                            </AdminField>

                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <AdminField label="Genre" :error="form.errors.genre"
                                    ><AdminInput v-model="form.genre"
                                /></AdminField>
                                <AdminField label="Engine" :error="form.errors.engine"
                                    ><AdminInput v-model="form.engine"
                                /></AdminField>
                                <AdminField label="Status" :error="form.errors.status">
                                    <AdminSelect v-model="form.status" :options="statuses" />
                                </AdminField>
                            </div>

                            <AdminField label="Tags" :error="form.errors.tags"
                                ><AdminStringList v-model="form.tags"
                            /></AdminField>

                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <AdminField label="URL" :error="form.errors.url"
                                    ><AdminInput v-model="form.url"
                                /></AdminField>
                                <AdminField label="Source URL" :error="form.errors.sourceUrl"
                                    ><AdminInput v-model="form.sourceUrl"
                                /></AdminField>
                            </div>

                            <AdminField
                                label="Game Design Document"
                                :error="form.errors.gddUrl"
                                hint="Files placed in storage/app/public/GDD (served at /storage/GDD/…) show up here."
                            >
                                <AdminSelect v-model="form.gddUrl" :options="gddOptions" />
                            </AdminField>
                        </AdminSection>

                        <AdminSection title="Overview" preview-target=".cs-overview">
                            <AdminField label="Cover image URL" :error="form.errors.image"
                                ><AdminInput v-model="form.image"
                            /></AdminField>

                            <AdminField
                                label="Background video/image URL"
                                :error="form.errors.backgroundVideoUrl"
                                ><AdminInput
                                    v-model="form.backgroundVideoUrl"
                                    placeholder="Video, YouTube link, or image URL — leave blank to use the site default"
                            /></AdminField>

                            <AdminField label="Description" :error="form.errors.description">
                                <AdminTextarea v-model="form.description" :rows="4" />
                            </AdminField>

                            <AdminField label="Highlights" :error="form.errors.highlights"
                                ><AdminStringList v-model="form.highlights"
                            /></AdminField>
                        </AdminSection>

                        <AdminSection title="Contributions" preview-target=".cs-contrib">
                            <AdminField
                                label="Body text"
                                :error="form.errors.contributionsText"
                                hint="Also supports ## headings, - bullets (indent with 2 spaces to nest), and **bold**. The side rail pulls automatically from the Gallery images below."
                            >
                                <AdminRichTextEditor v-model="form.contributionsText" :rows="10" />
                            </AdminField>
                        </AdminSection>

                        <AdminSection title="Process (“My Approach”)" preview-target=".cs-process">
                            <AdminRepeaterCard
                                :model-value="form.processSteps"
                                label="step"
                                @add="form.processSteps.push({ title: '', description: '' })"
                                @remove="(i) => form.processSteps.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <AdminField label="Step title"
                                        ><AdminInput v-model="item.title"
                                    /></AdminField>
                                    <AdminField label="Description">
                                        <AdminTextarea v-model="item.description" :rows="2" />
                                    </AdminField>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>

                        <AdminSection title="Gallery" preview-target=".cs-gallery">
                            <AdminRepeaterCard
                                :model-value="form.media"
                                label="media item"
                                @add="
                                    form.media.push({ type: 'image', src: '', caption: '' })
                                "
                                @remove="(i) => form.media.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <AdminField label="Type"
                                            ><AdminSelect
                                                v-model="item.type"
                                                :options="mediaTypes"
                                        /></AdminField>
                                        <AdminField label="Source URL" class="col-span-2"
                                            ><AdminInput v-model="item.src"
                                        /></AdminField>
                                    </div>
                                    <AdminField label="Caption"
                                        ><AdminInput v-model="item.caption"
                                    /></AdminField>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>

                        <AdminSection title="Outcomes" preview-target=".cs-outcomes">
                            <AdminRepeaterCard
                                :model-value="form.outcomes"
                                label="outcome"
                                @add="form.outcomes.push({ label: '', value: '' })"
                                @remove="(i) => form.outcomes.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <AdminField label="Value"
                                            ><AdminInput v-model="item.value"
                                        /></AdminField>
                                        <AdminField label="Label"
                                            ><AdminInput v-model="item.label"
                                        /></AdminField>
                                    </div>
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
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditor.vue';
import AdminSection from '@/components/admin/AdminSection.vue';
import AdminSelect from '@/components/admin/AdminSelect.vue';
import AdminStringList from '@/components/admin/AdminStringList.vue';
import AdminTextarea from '@/components/admin/AdminTextarea.vue';
import { useAdminPreviewPublisher, useAdminPreviewScrollSync } from '@/composables/useAdminPreview';
import { projectSlug } from '@/data/projects';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { index as projectsIndex, store, update } from '@/routes/admin/projects';
import type { Project, ProjectMediaItem, ProjectProcessStep, ProjectStat } from '@/types/portfolio';

type ProjectFormData = Omit<
    Project,
    'role' | 'backgroundVideoUrl' | 'sourceUrl' | 'media' | 'outcomes' | 'processSteps' | 'contributionsText'
> & {
    role: string;
    backgroundVideoUrl: string;
    sourceUrl: string;
    media: ProjectMediaItem[];
    outcomes: ProjectStat[];
    processSteps: ProjectProcessStep[];
    contributionsText: string;
};

const props = defineProps<{
    project: Project | null;
    index: number | null;
    gddFiles: { label: string; value: string }[];
}>();

const isEdit = computed(() => props.project !== null);

const blank: ProjectFormData = {
    title: '',
    tagline: '',
    description: '',
    role: '',
    genre: '',
    engine: '',
    status: 'Prototype',
    image: '',
    backgroundVideoUrl: '',
    tags: [],
    highlights: [],
    url: '',
    sourceUrl: '',
    gddUrl: '',
    media: [],
    outcomes: [],
    processSteps: [],
    contributionsText: '',
};

const form = useForm(
    isEdit.value ? update(props.index as number) : store(),
    props.project
        ? {
              ...blank,
              ...props.project,
              role: props.project.role ?? '',
              backgroundVideoUrl: props.project.backgroundVideoUrl ?? '',
              gddUrl: props.project.gddUrl ?? '',
              media: props.project.media ?? [],
              outcomes: props.project.outcomes ?? [],
              processSteps: props.project.processSteps ?? [],
              contributionsText: props.project.contributionsText ?? '',
          }
        : blank,
);

const statuses = ['Prototype', 'In Development', 'Released'];
const mediaTypes = ['image', 'video'];
const gddOptions = computed(() => [{ label: '— None —', value: '' }, ...props.gddFiles]);

const devices = [
    { key: 'desktop' as const, label: 'Desktop' },
    { key: 'tablet' as const, label: 'Tablet' },
    { key: 'mobile' as const, label: 'Mobile' },
];
const device = ref<'desktop' | 'tablet' | 'mobile'>('desktop');
const previewWidth = computed(() => ({ desktop: '100%', tablet: '768px', mobile: '390px' })[device.value]);

const liveSlug = props.project ? projectSlug(props.project.title) : '';
const previewUrl = `/project/${liveSlug || '__preview__'}?admin_preview=1`;

const previewFrame = ref<HTMLIFrameElement | null>(null);

useAdminPreviewPublisher('project', previewFrame, () => ({
    project: {
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        role: form.role,
        genre: form.genre,
        engine: form.engine,
        status: form.status,
        image: form.image,
        backgroundVideoUrl: form.backgroundVideoUrl,
        tags: form.tags,
        highlights: form.highlights,
        url: form.url,
        sourceUrl: form.sourceUrl,
        gddUrl: form.gddUrl,
        media: form.media,
        outcomes: form.outcomes,
        processSteps: form.processSteps,
        contributionsText: form.contributionsText,
    },
}));

useAdminPreviewScrollSync(previewFrame);
</script>
