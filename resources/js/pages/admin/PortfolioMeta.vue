<template>
    <Head title="Site content" />

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
                        Site content
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
                        href="/"
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
        <form id="portfolio-meta-form" class="space-y-10" @submit.prevent="form.submit()">
            <!-- Site-wide (nav wordmark, background video, social rail — appear on every page) -->
            <AdminSection title="Site-wide" preview-target="#top">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <AdminField label="Name"
                        ><AdminInput v-model="form.profile.name"
                    /></AdminField>
                    <AdminField label="Accent color"
                        ><AdminInput v-model="form.profile.accent"
                    /></AdminField>
                </div>
                <AdminField label="Background video/image URL"
                    ><AdminInput
                        v-model="form.profile.backgroundVideoUrl"
                        placeholder="Video, YouTube link, or image URL"
                /></AdminField>
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
            </AdminSection>

            <!-- Hero -->
            <AdminSection title="Hero" preview-target="#top">
                <AdminField label="Tagline"
                    ><AdminInput v-model="form.profile.tagline"
                /></AdminField>
                <AdminField label="Intro (meta description)"
                    ><AdminTextarea v-model="form.profile.intro" :rows="2"
                /></AdminField>
                <AdminField label="Focus tags">
                    <AdminStringList v-model="form.focusTags" />
                </AdminField>
            </AdminSection>

            <!-- About -->
            <AdminSection title="About" preview-target="#about">
                <AdminField label="About eyebrow"
                    ><AdminInput v-model="form.profile.aboutEyebrow"
                /></AdminField>
                <AdminField label="About heading"
                    ><AdminInput v-model="form.profile.aboutHeading"
                /></AdminField>
                <AdminField label="About paragraphs">
                    <AdminStringList v-model="form.profile.aboutParagraphs" />
                </AdminField>
                <AdminField label="Photo URL"
                    ><AdminInput
                        v-model="form.profile.photoUrl"
                        placeholder="Leave blank to show the placeholder icon"
                /></AdminField>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <AdminField label="About CTA prompt"
                        ><AdminInput v-model="form.profile.aboutCtaPrompt"
                    /></AdminField>
                    <AdminField label="About CTA label"
                        ><AdminInput v-model="form.profile.aboutCtaLabel"
                    /></AdminField>
                </div>

                <AdminRepeaterCard
                    :model-value="form.aboutStats"
                    label="stat"
                    @add="
                        form.aboutStats.push({
                            icon: 'device',
                            value: '',
                            label: '',
                        })
                    "
                    @remove="(i) => form.aboutStats.splice(i, 1)"
                >
                    <template #default="{ item }">
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <AdminField label="Icon"
                                ><AdminSelect
                                    v-model="item.icon"
                                    :options="statIcons"
                            /></AdminField>
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

            <!-- Roadmap (Timeline) -->
            <AdminSection title="Roadmap (timeline)" preview-target=".timeline-section">
                <AdminRepeaterCard
                    :model-value="form.roadmap"
                    label="roadmap item"
                    @add="
                        form.roadmap.push({
                            title: '',
                            meta: '',
                            description: '',
                            details: '',
                            url: '',
                        })
                    "
                    @remove="(i) => form.roadmap.splice(i, 1)"
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
                        <AdminField label="Card description (short teaser on the timeline)"
                            ><AdminTextarea
                                v-model="item.description"
                                :rows="2"
                        /></AdminField>
                        <AdminField label="Modal details (supports ## headings, - bullets, **bold**)"
                            ><AdminTextarea
                                v-model="item.details"
                                :rows="6"
                        /></AdminField>
                        <AdminField label="View Project URL (optional button inside the modal)"
                            ><AdminInput v-model="item.url" placeholder="https://…"
                        /></AdminField>
                    </template>
                </AdminRepeaterCard>
            </AdminSection>

            <!-- Skill categories -->
            <AdminSection title="Skills" preview-target="#skills">
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

            <!-- Featured games -->
            <AdminSection title="Featured games (My Projects Library)" preview-target="#games">
                <p class="text-xs text-(--text-faint)">
                    The library automatically shows every project from
                    <a :href="projectsIndex().url" class="underline hover:text-(--accent)">Projects</a>
                    — add or edit entries there.
                </p>
                <AdminField label="Itch.io URL (the &quot;more on itch.io&quot; tile at the end)"
                    ><AdminInput v-model="form.featuredGamesItchUrl"
                /></AdminField>
            </AdminSection>

            <!-- Featured project -->
            <AdminSection title="Featured project (homepage spotlight)" preview-target="#featured-project">
                <AdminField label="Project">
                    <select
                        v-model="form.featuredProjectSlug"
                        class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) outline-none focus:border-(--accent)"
                    >
                        <option value="">— Select a project —</option>
                        <option v-for="p in projects" :key="p.title" :value="projectSlug(p.title)">
                            {{ p.title }}
                        </option>
                    </select>
                </AdminField>
                <p v-if="!projects.length" class="text-xs text-(--text-faint)">
                    No projects yet —
                    <a :href="projectsIndex().url" class="underline hover:text-(--accent)">add one</a>
                    first.
                </p>
            </AdminSection>

            <!-- Featured project stats -->
            <AdminSection title="Featured project stats" preview-target="#featured-project">
                <AdminRepeaterCard
                    :model-value="form.featuredProjectStats"
                    label="stat"
                    @add="
                        form.featuredProjectStats.push({
                            icon: 'device',
                            value: '',
                            label: '',
                        })
                    "
                    @remove="(i) => form.featuredProjectStats.splice(i, 1)"
                >
                    <template #default="{ item }">
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <AdminField label="Icon"
                                ><AdminSelect
                                    v-model="item.icon"
                                    :options="statIcons"
                            /></AdminField>
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

            <!-- Portfolio CTA -->
            <AdminSection title="Portfolio CTA" preview-target="#portfolio-cta">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <AdminField label="Eyebrow"
                        ><AdminInput v-model="form.portfolioCta.eyebrow"
                    /></AdminField>
                    <AdminField label="Heading"
                        ><AdminInput v-model="form.portfolioCta.heading"
                    /></AdminField>
                </div>
                <AdminField label="Lines"
                    ><AdminStringList v-model="form.portfolioCta.lines"
                /></AdminField>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <AdminField label="Button label"
                        ><AdminInput v-model="form.portfolioCta.buttonLabel"
                    /></AdminField>
                    <AdminField label="Button URL"
                        ><AdminInput v-model="form.portfolioCta.buttonUrl"
                    /></AdminField>
                </div>
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
                            src="/?admin_preview=1"
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
import { projectSlug } from '@/data/projects';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { update } from '@/routes/admin/portfolio-meta';
import { index as projectsIndex } from '@/routes/admin/projects';
import type { PortfolioMeta } from '@/types/admin';
import type { Project } from '@/types/portfolio';

const props = defineProps<{ meta: PortfolioMeta; projects: Project[] }>();

const form = useForm(update(), { ...props.meta } satisfies PortfolioMeta);

const statIcons = ['device', 'controller', 'package', 'trophy'];
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
    roadmap: form.roadmap,
    focusTags: form.focusTags,
    skillCategories: form.skillCategories,
    featuredGamesItchUrl: form.featuredGamesItchUrl,
    featuredProjectSlug: form.featuredProjectSlug,
    featuredProjectStats: form.featuredProjectStats,
    portfolioCta: form.portfolioCta,
}));

useAdminPreviewScrollSync(previewFrame);
</script>
