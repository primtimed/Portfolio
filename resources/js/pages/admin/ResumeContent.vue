<template>
    <Head title="Resume" />

    <AdminLayout full-width>
        <div class="flex h-screen flex-col">
            <!-- toolbar -->
            <div
                class="flex flex-wrap shrink-0 items-center justify-between gap-4 border-b border-(--border) bg-(--bg-sunken) px-6 py-3"
            >
                <div class="flex min-w-0 items-center gap-3">
                    <h1
                        class="truncate text-sm font-bold tracking-tight text-(--text) uppercase [font-family:var(--font-display)]"
                    >
                        Resume
                    </h1>
                    <span
                        v-if="form.recentlySuccessful"
                        class="text-xs text-emerald-400"
                        >Saved.</span
                    >
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
                        href="/resume"
                        target="_blank"
                        rel="noopener"
                        class="text-xs font-bold tracking-wide text-(--text-faint) uppercase hover:text-(--accent)"
                        >View live ↗</a
                    >

                    <AdminButton :disabled="form.processing" @click="form.submit()">
                        {{ form.processing ? 'Saving…' : 'Save changes' }}
                    </AdminButton>
                </div>
            </div>

            <div class="flex flex-1 flex-col overflow-hidden lg:flex-row">
                <!-- fields -->
                <div class="w-full shrink-0 overflow-y-auto border-(--border) px-6 py-6 lg:w-[440px] lg:border-r">
                    <form id="resume-form" class="space-y-10" @submit.prevent="form.submit()">
                        <AdminSection title="Profile" preview-target=".rs-header">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <AdminField label="Name"
                                    ><AdminInput v-model="form.profile.name"
                                /></AdminField>
                                <AdminField label="Tagline"
                                    ><AdminInput v-model="form.profile.tagline"
                                /></AdminField>
                            </div>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <AdminField label="Email"
                                    ><AdminInput v-model="form.profile.email"
                                /></AdminField>
                                <AdminField label="GitHub URL"
                                    ><AdminInput v-model="form.profile.github"
                                /></AdminField>
                                <AdminField label="LinkedIn URL"
                                    ><AdminInput v-model="form.profile.linkedin"
                                /></AdminField>
                            </div>
                            <AdminField label="Photo URL"
                                ><AdminInput
                                    v-model="form.profile.photoUrl"
                                    placeholder="Leave blank to show the placeholder icon"
                            /></AdminField>
                        </AdminSection>

                        <AdminSection title="Summary" preview-target=".rs-summary">
                            <AdminField label="Summary paragraphs">
                                <AdminStringList v-model="form.profile.aboutParagraphs" />
                            </AdminField>
                        </AdminSection>

                        <AdminSection title="Experience (Projects section)" preview-target=".rs-proj-list">
                            <AdminRepeaterCard
                                :model-value="form.experience"
                                label="experience item"
                                @add="
                                    form.experience.push({
                                        title: '',
                                        meta: '',
                                        description: '',
                                        tags: [],
                                    })
                                "
                                @remove="(i) => form.experience.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <AdminField label="Title"
                                            ><AdminInput v-model="item.title"
                                        /></AdminField>
                                        <AdminField label="Meta"
                                            ><AdminInput v-model="item.meta"
                                        /></AdminField>
                                    </div>
                                    <AdminField label="Description"
                                        ><AdminTextarea
                                            v-model="item.description"
                                            :rows="2"
                                    /></AdminField>
                                    <AdminField label="Tags"
                                        ><AdminStringList v-model="item.tags"
                                    /></AdminField>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>

                        <AdminSection title="Education" preview-target=".rs-edu-placeholder">
                            <AdminRepeaterCard
                                :model-value="form.education"
                                label="education item"
                                @add="
                                    form.education.push({
                                        title: '',
                                        institution: '',
                                        meta: '',
                                        description: '',
                                    })
                                "
                                @remove="(i) => form.education.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <AdminField label="Title"
                                            ><AdminInput v-model="item.title"
                                        /></AdminField>
                                        <AdminField label="Meta"
                                            ><AdminInput v-model="item.meta"
                                        /></AdminField>
                                    </div>
                                    <AdminField label="Institution"
                                        ><AdminInput v-model="item.institution"
                                    /></AdminField>
                                    <AdminField label="Description"
                                        ><AdminTextarea
                                            v-model="item.description"
                                            :rows="2"
                                    /></AdminField>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>

                        <AdminSection title="Skills" preview-target=".rs-sidebar-skill-group">
                            <AdminRepeaterCard
                                :model-value="form.skillCategories"
                                label="category"
                                @add="
                                    form.skillCategories.push({
                                        title: '',
                                        icon: 'code',
                                        skills: [],
                                    })
                                "
                                @remove="(i) => form.skillCategories.splice(i, 1)"
                            >
                                <template #default="{ item }">
                                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <AdminField label="Title"
                                            ><AdminInput v-model="item.title"
                                        /></AdminField>
                                        <AdminField label="Icon"
                                            ><AdminSelect
                                                v-model="item.icon"
                                                :options="skillIcons"
                                        /></AdminField>
                                    </div>
                                    <div class="mt-3">
                                        <span
                                            class="mb-1.5 block text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
                                            >Skills</span
                                        >
                                        <div class="space-y-2">
                                            <div
                                                v-for="(skill, si) in item.skills"
                                                :key="si"
                                                class="flex items-end gap-2"
                                            >
                                                <AdminField label="Name" class="flex-1"
                                                    ><AdminInput v-model="skill.name"
                                                /></AdminField>
                                                <AdminField label="Level">
                                                    <select
                                                        :value="skill.level"
                                                        class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) outline-none focus:border-(--accent)"
                                                        @change="
                                                            skill.level = Number(
                                                                (
                                                                    $event.target as HTMLSelectElement
                                                                ).value,
                                                            ) as 1 | 2 | 3 | 4 | 5
                                                        "
                                                    >
                                                        <option
                                                            v-for="level in skillLevels"
                                                            :key="level"
                                                            :value="level"
                                                        >
                                                            {{ level }}
                                                        </option>
                                                    </select>
                                                </AdminField>
                                                <button
                                                    type="button"
                                                    class="mb-0.5 shrink-0 rounded-lg border border-(--border-strong) px-3 py-2 text-xs text-(--text-faint) hover:border-red-500 hover:text-red-400"
                                                    @click="item.skills.splice(si, 1)"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                class="w-full rounded-lg border border-dashed border-(--border-strong) py-2 text-xs font-semibold tracking-wide text-(--text-faint) uppercase hover:border-(--accent) hover:text-(--accent)"
                                                @click="
                                                    item.skills.push({ name: '', level: 3 })
                                                "
                                            >
                                                + Add skill
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </AdminRepeaterCard>
                        </AdminSection>

                        <AdminSection title="Interests" preview-target=".rs-interest-list">
                            <AdminField label="Interests">
                                <AdminStringList v-model="form.focusTags" />
                            </AdminField>
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
                            src="/resume?admin_preview=1"
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
import AdminTextarea from '@/components/admin/AdminTextarea.vue';
import { useAdminPreviewPublisher, useAdminPreviewScrollSync } from '@/composables/useAdminPreview';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { update } from '@/routes/admin/portfolio-meta';
import type { PortfolioMeta } from '@/types/admin';

type PortfolioMetaFormData = Omit<
    PortfolioMeta,
    'featuredProject' | 'experience'
> & {
    featuredProject: Omit<PortfolioMeta['featuredProject'], 'sourceUrl'> & {
        sourceUrl: string;
    };
    experience: (Omit<PortfolioMeta['experience'][number], 'tags'> & {
        tags: string[];
    })[];
};

const props = defineProps<{ meta: PortfolioMeta }>();

// The save endpoint is shared with the Site content page, so the full meta
// object round-trips here too — otherwise saving from this page would wipe
// every field this form doesn't render (featured games, portfolio CTA, etc).
const form = useForm(update(), {
    ...props.meta,
    featuredProject: {
        ...props.meta.featuredProject,
        sourceUrl: props.meta.featuredProject.sourceUrl ?? '',
    },
    experience: props.meta.experience.map((item) => ({
        ...item,
        tags: item.tags ?? [],
    })),
} satisfies PortfolioMetaFormData);

const skillIcons = ['code', 'gamepad', 'network', 'tools'];
const skillLevels = [1, 2, 3, 4, 5];

const devices = [
    { key: 'desktop' as const, label: 'Desktop' },
    { key: 'tablet' as const, label: 'Tablet' },
    { key: 'mobile' as const, label: 'Mobile' },
];
const device = ref<'desktop' | 'tablet' | 'mobile'>('desktop');
const previewWidth = computed(() => ({ desktop: '100%', tablet: '768px', mobile: '390px' })[device.value]);

const previewFrame = ref<HTMLIFrameElement | null>(null);

useAdminPreviewPublisher('portfolio-meta', previewFrame, () => ({
    profile: form.profile,
    aboutStats: form.aboutStats,
    focusTags: form.focusTags,
    skillCategories: form.skillCategories,
    featuredGamesItchUrl: form.featuredGamesItchUrl,
    featuredGames: form.featuredGames,
    featuredProject: form.featuredProject,
    featuredProjectStats: form.featuredProjectStats,
    portfolioCta: form.portfolioCta,
    experience: form.experience,
    education: form.education,
}));

useAdminPreviewScrollSync(previewFrame);
</script>
