<template>
    <Head>
        <title>{{ project.title }} — {{ profile.name }}</title>
        <meta name="description" :content="project.tagline" />
    </Head>

    <div class="cs-root root" :style="{ '--accent': profile.accent }">
        <SiteVideoBackground :src="project.backgroundVideoUrl || profile.backgroundVideoUrl" />

        <SiteNav :name="profile.name" />

        <!-- HERO -->
        <header class="cs-hero">
            <div class="cs-hero-inner">
                <a href="/portfolio-lab" class="cs-back-link">&larr; Back to Projects</a>
                <div class="cs-eyebrow">Case Study</div>
                <h1 class="cs-hero-title">{{ project.title }}</h1>
                <p class="cs-hero-role"><span class="cs-accent-text">{{ role }}</span></p>
                <div class="cs-tags">
                    <span v-for="tag in project.tags" :key="tag" class="cs-tag">{{ tag }}</span>
                </div>
                <div class="cs-hero-actions">
                    <a :href="project.url" target="_blank" rel="noopener" class="cs-btn cs-btn-solid">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7L8 5Z" /></svg>
                        View Project
                    </a>
                    <a v-if="project.sourceUrl" :href="project.sourceUrl" target="_blank" rel="noopener" class="cs-btn cs-btn-outline">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M9 6 3 12l6 6M15 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Source Code
                    </a>
                </div>
            </div>
        </header>

        <!-- META STRIP -->
        <section class="cs-meta-strip">
            <div v-for="fact in metaStats" :key="fact.label" class="cs-meta-item">
                <div class="cs-meta-label">{{ fact.label }}</div>
                <div class="cs-meta-value">{{ fact.value }}</div>
            </div>
        </section>

        <!-- OVERVIEW -->
        <section class="cs-overview">
            <div class="cs-overview-inner">
                <div>
                    <div class="cs-eyebrow">Overview</div>
                    <h2 class="cs-h2">The Problem</h2>
                    <p class="cs-body">{{ project.description }}</p>
                    <ul v-if="project.highlights.length" class="cs-highlights">
                        <li v-for="highlight in project.highlights" :key="highlight">
                            <svg class="cs-highlight-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3">
                                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>{{ highlight }}</span>
                        </li>
                    </ul>
                    <p v-else class="cs-body cs-placeholder">[Placeholder — summarize your role, the team, and the scope of what you owned end to end.]</p>
                </div>
                <div class="cs-overview-media">
                    <img :src="project.image" :alt="`${project.title} overview`" loading="lazy" />
                </div>
            </div>
        </section>

        <!-- PROCESS -->
        <section class="cs-process">
            <div class="cs-section-heading">
                <div class="cs-eyebrow">Process</div>
                <h2 class="cs-h2 cs-h2-inverse">My Approach</h2>
            </div>
            <div class="cs-timeline">
                <div class="cs-timeline-rule" />
                <div v-for="(step, i) in processSteps" :key="step.title" class="cs-timeline-step">
                    <div class="cs-timeline-dot" />
                    <div class="cs-timeline-step-label">Step {{ i + 1 }}</div>
                    <h3 class="cs-timeline-step-title">{{ step.title }}</h3>
                    <p class="cs-timeline-step-desc">{{ step.description }}</p>
                </div>
            </div>
        </section>

        <!-- GALLERY -->
        <section v-if="galleryImages.length" class="cs-gallery">
            <div class="cs-gallery-inner">
                <div class="cs-section-heading">
                    <div class="cs-eyebrow">Gallery</div>
                    <h2 class="cs-h2">Final Designs</h2>
                </div>
                <div class="cs-gallery-row cs-gallery-row-2">
                    <div v-for="img in galleryImages.slice(0, 2)" :key="img.src" class="cs-gallery-tile cs-gallery-tile-wide">
                        <img :src="img.src" :alt="img.caption" loading="lazy" />
                    </div>
                </div>
                <div v-if="galleryImages.length > 2" class="cs-gallery-row cs-gallery-row-3">
                    <div v-for="img in galleryImages.slice(2, 5)" :key="img.src" class="cs-gallery-tile">
                        <img :src="img.src" :alt="img.caption" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>

        <!-- OUTCOMES -->
        <section class="cs-outcomes">
            <div class="cs-section-heading">
                <div class="cs-eyebrow">Outcomes</div>
                <h2 class="cs-h2 cs-h2-inverse">Results &amp; Impact</h2>
            </div>
            <div class="cs-terminal">
                <div class="cs-terminal-bar">
                    <span class="cs-dot cs-dot-red" />
                    <span class="cs-dot cs-dot-yellow" />
                    <span class="cs-dot cs-dot-green" />
                    <span class="cs-terminal-path">~/{{ slug }}/outcomes --summary</span>
                </div>
                <div class="cs-terminal-body">
                    <div v-for="outcome in outcomes" :key="outcome.label" class="cs-outcome">
                        <div class="cs-outcome-value">{{ outcome.value }}</div>
                        <div class="cs-outcome-label">{{ outcome.label }}</div>
                    </div>
                </div>
            </div>
        </section>

        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteNav from '@/components/layout/SiteNav.vue';
import SiteVideoBackground from '@/components/layout/SiteVideoBackground.vue';
import { useAdminPreviewOverrides, useAdminPreviewScrollTarget } from '@/composables/useAdminPreview';
import { profile } from '@/data/portfolio';
import { projects, projectSlug } from '@/data/projects';
import type { Project } from '@/types/portfolio';

const props = defineProps<{ slug: string }>();

const blankProject: Project = {
    title: '',
    tagline: '',
    description: '',
    genre: '',
    engine: '',
    status: 'Prototype',
    image: '',
    tags: [],
    highlights: [],
    url: '',
};

const baseProject = projects.find((p) => projectSlug(p.title) === props.slug) ?? projects[0] ?? blankProject;
const overrides = useAdminPreviewOverrides<{ project: Project }>('project');
useAdminPreviewScrollTarget();

const project = computed(() => overrides.project ?? baseProject);
const slug = computed(() => projectSlug(project.value.title));
const role = computed(() => project.value.role || `${project.value.genre} Engineer`);

const metaStats = computed(() => [
    { label: 'Role', value: role.value },
    { label: 'Engine', value: project.value.engine },
    { label: 'Genre', value: project.value.genre },
    { label: 'Status', value: project.value.status },
]);

const fallbackProcessSteps = [
    { title: 'Discover', description: '[Placeholder — research, constraints, and goals that shaped the direction.]' },
    { title: 'Design', description: '[Placeholder — how you explored the system architecture and gameplay feel.]' },
    { title: 'Build', description: '[Placeholder — implementation details, tools, and technical challenges solved.]' },
    { title: 'Iterate', description: '[Placeholder — playtesting, tuning, and refinement based on feedback.]' },
];

const processSteps = computed(() => (project.value.processSteps?.length ? project.value.processSteps : fallbackProcessSteps));

const galleryImages = computed(() => (project.value.media ?? []).filter((item) => item.type === 'image').slice(1));

const fallbackOutcomes = [
    { value: '00%', label: 'Placeholder Metric' },
    { value: '00ms', label: 'Placeholder Metric' },
    { value: '00+', label: 'Placeholder Metric' },
];

const outcomes = computed(() => (project.value.outcomes?.length ? project.value.outcomes : fallbackOutcomes));
</script>

<style lang="scss" scoped>
.cs-root {
    --cs-cream: #f7f3ec;
    --cs-dark: #1c1a17;
    --cs-dark-2: #14120f;
    --cs-accent: #e2733a;
    --cs-accent-hover: #c85f2b;
    --cs-ink: #1c1a17;
    --cs-body: #4a453f;
    --cs-muted: #8a8078;
    --cs-inverse-dim: #b8afa5;
    --cs-border-light: #e5ddd0;
    --cs-border-dark: #2e2a25;
    --cs-border-dark-2: #3a342c;
    --cs-border-dark-3: #4a423a;

    position: relative;
    font-family: 'Inter', sans-serif;
    color: var(--cs-ink);
    min-height: 100vh;
}

.cs-accent-text {
    color: var(--cs-accent);
}

/* ── hero ───────────────────────────────────────────────────────────── */
.cs-hero {
    position: relative;
    background: rgba(28, 26, 23, 0.50);
    padding: 172px 64px 90px;
    overflow: hidden;

    @media (max-width: 760px) {
        padding: 140px 24px 60px;
    }
}

.cs-hero-inner {
    max-width: 980px;
    position: relative;
    z-index: 2;
}

.cs-back-link {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: var(--cs-inverse-dim);
    letter-spacing: 0.5px;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
        color: var(--cs-accent);
    }
}

.cs-eyebrow {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--cs-accent);
    text-transform: uppercase;
}

.cs-hero .cs-eyebrow {
    margin-top: 28px;
}

.cs-hero-title {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(38px, 7vw, 76px);
    line-height: 1.02;
    color: #fff;
    margin: 18px 0 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.cs-hero-role {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(16px, 2.2vw, 22px);
    margin: 22px 0 0;
    text-transform: uppercase;
    color: #fff;
}

.cs-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
}

.cs-tag {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: #e8e2d8;
    border: 1px solid var(--cs-border-dark-3);
    padding: 7px 16px;
    border-radius: 999px;
}

.cs-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 40px;
}

.cs-btn {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-weight: 600;
    font-size: 13px;
    padding: 14px 26px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition:
        background 0.15s ease,
        border-color 0.15s ease,
        color 0.15s ease;
}

.cs-btn-solid {
    color: var(--cs-ink);
    background: #fff;

    &:hover {
        background: #e8e2d8;
    }
}

.cs-btn-outline {
    color: #fff;
    border: 1px solid var(--cs-border-dark-3);

    &:hover {
        border-color: var(--cs-accent);
        color: var(--cs-accent);
    }
}

/* ── meta strip ─────────────────────────────────────────────────────── */
.cs-meta-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid var(--cs-border-light);
    background: #fff;

    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
}

.cs-meta-item {
    min-width: 0;
    padding: 30px 40px;
    border-right: 1px solid var(--cs-border-light);
    text-align: center;

    &:last-child {
        border-right: none;
    }

    @media (max-width: 700px) {
        padding: 24px 16px;
        border-bottom: 1px solid var(--cs-border-light);

        &:nth-last-child(-n + 2) {
            border-bottom: none;
        }
    }

    @media (max-width: 420px) {
        border-right: none;

        &:nth-last-child(-n + 2) {
            border-bottom: 1px solid var(--cs-border-light);
        }

        &:last-child {
            border-bottom: none;
        }
    }
}

.cs-meta-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    color: var(--cs-muted);
    text-transform: uppercase;
}

.cs-meta-value {
    font-family: 'Archivo Black', sans-serif;
    font-size: 18px;
    color: var(--cs-ink);
    margin-top: 8px;
    text-transform: uppercase;
    overflow-wrap: break-word;
}

/* ── overview ───────────────────────────────────────────────────────── */
.cs-overview {
    width: 100%;
    background: var(--cs-cream);
}

.cs-overview-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 110px 64px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    align-items: center;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding: 64px 24px;
        gap: 40px;
    }
}

.cs-h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(28px, 3.6vw, 42px);
    margin: 16px 0 24px;
    text-transform: uppercase;
    line-height: 1.1;
}

.cs-h2-inverse {
    color: #fff;
}

.cs-body {
    font-size: 17px;
    line-height: 1.7;
    color: var(--cs-body);
}

.cs-placeholder {
    margin-top: 18px;
    font-style: italic;
    opacity: 0.75;
}

.cs-highlights {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 15px;
        line-height: 1.5;
        color: var(--cs-body);
    }
}

.cs-highlight-icon {
    flex: 0 0 auto;
    margin-top: 3px;
    padding: 3px;
    border-radius: 50%;
    background: rgba(226, 115, 58, 0.14);
    color: var(--cs-accent);
}

.cs-overview-media {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(28, 26, 23, 0.12);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

/* ── process ────────────────────────────────────────────────────────── */
.cs-process {
    position: relative;
    background: rgba(28, 26, 23, 0.50);
    padding: 110px 64px;

    @media (max-width: 700px) {
        padding: 64px 24px;
    }
}

.cs-section-heading {
    max-width: 900px;
    margin: 0 auto 70px;
    text-align: center;
}

.cs-timeline {
    max-width: 760px;
    margin: 0 auto;
    position: relative;
}

.cs-timeline-rule {
    position: absolute;
    left: 11px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: var(--cs-border-dark-2);
}

.cs-timeline-step {
    position: relative;
    padding-left: 50px;
    padding-bottom: 56px;

    &:last-child {
        padding-bottom: 0;
    }
}

.cs-timeline-dot {
    position: absolute;
    left: 0;
    top: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--cs-dark);
    border: 3px solid var(--cs-accent);
}

.cs-timeline-step-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    color: var(--cs-accent);
    letter-spacing: 1.5px;
    text-transform: uppercase;
}

.cs-timeline-step-title {
    font-family: 'Archivo Black', sans-serif;
    font-size: 24px;
    color: #fff;
    margin: 10px 0 10px;
    text-transform: uppercase;
}

.cs-timeline-step-desc {
    font-size: 16px;
    line-height: 1.7;
    color: var(--cs-inverse-dim);
    max-width: 560px;
}

/* ── gallery ────────────────────────────────────────────────────────── */
.cs-gallery {
    width: 100%;
    background: var(--cs-cream);
}

.cs-gallery-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 110px 64px;

    @media (max-width: 700px) {
        padding: 64px 24px;
    }
}

.cs-gallery-row {
    display: grid;
    gap: 24px;
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
}

.cs-gallery-row-2 {
    grid-template-columns: 1.4fr 1fr;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
}

.cs-gallery-row-3 {
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
}

.cs-gallery-tile {
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(28, 26, 23, 0.1);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.cs-gallery-tile-wide {
    aspect-ratio: 16 / 10;

    &:nth-child(2) {
        aspect-ratio: 4 / 5;
    }
}

/* ── outcomes ───────────────────────────────────────────────────────── */
.cs-outcomes {
    position: relative;
    background: rgba(28, 26, 23, 0.50);
    padding: 110px 64px 130px;

    @media (max-width: 700px) {
        padding: 64px 24px 80px;
    }
}

.cs-terminal {
    max-width: 980px;
    margin: 0 auto;
    background: var(--cs-cream);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
}

.cs-terminal-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    background: #e8e2d8;
    border-bottom: 1px solid var(--cs-border-light);
}

.cs-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
}

.cs-dot-red {
    background: #ec6a5e;
}

.cs-dot-yellow {
    background: #f5bd4f;
}

.cs-dot-green {
    background: #61c454;
}

.cs-terminal-path {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: #6b6560;
    margin-left: 12px;
}

.cs-terminal-body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 50px 40px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}

.cs-outcome {
    text-align: center;
    padding: 0 20px;
}

.cs-outcome-value {
    font-family: 'Archivo Black', sans-serif;
    font-size: 48px;
    color: var(--cs-accent);
}

.cs-outcome-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: #6b6560;
    margin-top: 10px;
    letter-spacing: 0.5px;
}

</style>
