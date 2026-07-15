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
                    <a v-if="project.gddUrl" :href="project.gddUrl" target="_blank" rel="noopener" class="cs-btn cs-btn-outline">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14 3v5h5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Game Design Document
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
                <div class="cs-overview-text">
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
                <div v-if="showcaseImages.length" class="cs-showcase-grid">
                    <div v-for="(img, i) in showcaseImages" :key="`showcase-${i}`" class="cs-showcase-item" :class="{ 'cs-showcase-item--lead': i === 0 }">
                        <img :src="img.src" :alt="img.caption || `${project.title} showcase`" loading="lazy" />
                    </div>
                </div>
                <div v-else class="cs-overview-media">
                    <img :src="project.image" :alt="`${project.title} overview`" loading="lazy" />
                </div>
            </div>
        </section>

        <!-- CONTRIBUTIONS -->
        <section class="cs-contrib">
            <div class="cs-contrib-inner">
                <div class="cs-contrib-text">
                    <div class="cs-eyebrow">Contributions</div>
                    <h2 class="cs-h2">My Contributions</h2>
                    <div ref="contribBodyRef" class="cs-contrib-body" v-html="contributionsHtml" />
                </div>
                <div v-if="railImages.length" ref="contribRailRef" class="cs-contrib-rail">
                    <div v-for="(item, i) in railImages" :key="`contrib-${i}`" class="cs-contrib-rail-item">
                        <video v-if="item.type === 'video'" :src="item.src" muted loop autoplay playsinline />
                        <img v-else :src="item.src" :alt="item.caption || project.title" loading="lazy" />
                    </div>
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
        <section v-if="remainingGalleryImages.length" class="cs-gallery">
            <div class="cs-gallery-inner">
                <div class="cs-section-heading">
                    <div class="cs-eyebrow">Gallery</div>
                    <h2 class="cs-h2">Final Designs</h2>
                </div>
                <div class="cs-gallery-grid">
                    <button
                        v-for="(img, i) in remainingGalleryImages"
                        :key="`${img.src}-${i}`"
                        type="button"
                        class="cs-gallery-tile"
                        :class="tileVariant(i)"
                        :aria-label="`View ${img.caption || 'image'} larger`"
                        @click="openLightbox(i)"
                    >
                        <img :src="img.src" :alt="img.caption" loading="lazy" />
                        <span v-if="img.caption" class="cs-gallery-caption">{{ img.caption }}</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- GALLERY LIGHTBOX -->
        <Teleport to="body">
            <div
                v-if="lightboxIndex !== null"
                class="cs-lightbox"
                role="dialog"
                aria-modal="true"
                @click.self="closeLightbox"
            >
                <button type="button" class="cs-lightbox-close" aria-label="Close" @click="closeLightbox">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 5l14 14M19 5 5 19" stroke-linecap="round" />
                    </svg>
                </button>

                <button
                    v-if="remainingGalleryImages.length > 1"
                    type="button"
                    class="cs-lightbox-nav cs-lightbox-prev"
                    aria-label="Previous image"
                    @click="stepLightbox(-1)"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>

                <div v-if="lightboxImage" class="cs-lightbox-frame" :class="{ 'cs-lightbox-frame--with-caption': lightboxImage.caption }">
                    <img :src="lightboxImage.src" :alt="lightboxImage.caption" class="cs-lightbox-img" />
                    <div v-if="lightboxImage.caption" class="cs-lightbox-caption">
                        <span class="cs-lightbox-caption-count">{{ (lightboxIndex ?? 0) + 1 }} / {{ remainingGalleryImages.length }}</span>
                        <p class="cs-lightbox-caption-text">{{ lightboxImage.caption }}</p>
                    </div>
                </div>

                <button
                    v-if="remainingGalleryImages.length > 1"
                    type="button"
                    class="cs-lightbox-nav cs-lightbox-next"
                    aria-label="Next image"
                    @click="stepLightbox(1)"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </Teleport>

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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteNav from '@/components/layout/SiteNav.vue';
import SiteVideoBackground from '@/components/layout/SiteVideoBackground.vue';
import { useAdminPreviewOverrides, useAdminPreviewScrollTarget } from '@/composables/useAdminPreview';
import { profile } from '@/data/portfolio';
import { projects, projectSlug } from '@/data/projects';
import { renderRichText } from '@/lib/richText';
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

const galleryImages = computed(() => (project.value.media ?? []).filter((item) => item.type === 'image'));

const showcaseImages = computed(() => galleryImages.value.slice(0, 5));

const fallbackContributionsText = `- Designing **core systems**
  - General
    - [Placeholder — a foundational mechanic or system you built.]
    - [Placeholder — another foundational piece.]
  - Tools
    - [Placeholder — an editor tool or pipeline you shipped.]
  - AI
    - [Placeholder — behavior trees, state machines, or pathfinding you configured.]
    - [Placeholder — how many characters/entities this scales to.]
![](/storage/Image/Profile/Profile.png)
- Player-facing features
  - [Placeholder — a feature you owned end to end.] **→** [Placeholder — the specific outcome or scale, e.g. "shipped to 10k+ users".]
  - [Placeholder — a second feature you owned end to end.]
!video[](/videos/background.mp4)
- Polish & performance
  - [Placeholder — a bug class you fixed or a perf win you delivered.]
  - [Placeholder — a performance optimization and the measured improvement.]
![](/storage/Image/Profile/Profile.png)
- Tools & pipeline
  - [Placeholder — an internal tool that sped up the team's workflow.]
!video[](/videos/background.mp4)`;

const contributionsHtml = computed(() => renderRichText(project.value.contributionsText || fallbackContributionsText));

// The rail takes as many gallery images as fit alongside the contributions
// text (measured, not guessed) and the Gallery section below gets the rest —
// so the same image never appears twice.
const contribBodyRef = ref<HTMLElement | null>(null);
const contribRailRef = ref<HTMLElement | null>(null);
const railVisibleCount = ref(galleryImages.value.length);

function recalcRailCount() {
    const total = galleryImages.value.length;
    const textEl = contribBodyRef.value;
    const railEl = contribRailRef.value;
    const firstItem = railEl?.querySelector('.cs-contrib-rail-item');
    if (!textEl || !firstItem) {
        railVisibleCount.value = total;
        return;
    }
    const itemHeight = firstItem.getBoundingClientRect().height;
    if (itemHeight <= 0) return;
    const gap = parseFloat(getComputedStyle(railEl as HTMLElement).rowGap || '0') || 0;
    const textHeight = textEl.getBoundingClientRect().height;
    const fitting = Math.floor((textHeight + gap) / (itemHeight + gap));
    railVisibleCount.value = Math.min(total, Math.max(1, fitting));
}

const railImages = computed(() => galleryImages.value.slice(0, railVisibleCount.value));
const remainingGalleryImages = computed(() => galleryImages.value.slice(railVisibleCount.value));

let contribResizeObserver: ResizeObserver | null = null;

onMounted(() => {
    contribResizeObserver = new ResizeObserver(() => recalcRailCount());
    if (contribBodyRef.value) contribResizeObserver.observe(contribBodyRef.value);
    requestAnimationFrame(recalcRailCount);
});

onUnmounted(() => contribResizeObserver?.disconnect());

// Deterministic per-index "randomness" (not Math.random) so the mosaic layout
// stays stable across re-renders instead of reshuffling on every reactive update.
const tileVariants = ['', 'cs-gallery-tile--wide', 'cs-gallery-tile--tall', 'cs-gallery-tile--big', 'cs-gallery-tile--small'];

function tileVariant(i: number): string {
    let hash = (i * 2654435761) >>> 0;
    hash = (hash ^ (hash >>> 15)) >>> 0;
    return tileVariants[hash % tileVariants.length];
}

const lightboxIndex = ref<number | null>(null);
const lightboxImage = computed(() => (lightboxIndex.value !== null ? remainingGalleryImages.value[lightboxIndex.value] : null));

function openLightbox(index: number) {
    lightboxIndex.value = index;
}

function closeLightbox() {
    lightboxIndex.value = null;
}

function stepLightbox(direction: 1 | -1) {
    if (lightboxIndex.value === null || !remainingGalleryImages.value.length) return;
    const total = remainingGalleryImages.value.length;
    lightboxIndex.value = (lightboxIndex.value + direction + total) % total;
}

function onLightboxKeydown(e: KeyboardEvent) {
    if (lightboxIndex.value === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
}

watch(lightboxIndex, (index) => {
    document.body.style.overflow = index !== null ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', onLightboxKeydown));
onUnmounted(() => {
    window.removeEventListener('keydown', onLightboxKeydown);
    document.body.style.overflow = '';
});

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
    --cs-cream-warm: #f1e4d2;
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
    padding: 172px 32px 90px;
    overflow: hidden;

    @media (max-width: 760px) {
        padding: 140px 16px 60px;
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
    background: var(--cs-cream-warm);
}

.cs-overview-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 110px 32px;
    display: flex;
    flex-direction: column;
    gap: 56px;

    @media (max-width: 900px) {
        padding: 64px 16px;
        gap: 36px;
    }
}

.cs-overview-text {
    max-width: 760px;
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
    max-width: 640px;
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

.cs-showcase-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px;
    gap: 18px;

    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 180px;
    }

    @media (max-width: 460px) {
        grid-template-columns: 1fr;
        grid-auto-rows: 240px;
    }
}

.cs-showcase-item {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(28, 26, 23, 0.12);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    &--lead {
        grid-column: span 2;
        grid-row: span 2;

        @media (max-width: 460px) {
            grid-column: span 1;
            grid-row: span 1;
        }
    }
}

/* ── contributions ──────────────────────────────────────────────────── */
.cs-contrib {
    width: 100%;
    background: var(--cs-cream);
    border-top: 1px solid var(--cs-border-light);
}

.cs-contrib-inner {
    max-width: 1520px;
    margin: 0 auto;
    padding: 110px 24px;
    display: grid;
    grid-template-columns: 1fr 410px;
    gap: 60px;
    align-items: start;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding: 64px 16px;
        gap: 32px;
    }
}

.cs-contrib-text {
    min-width: 0;
}

.cs-contrib-body {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.7;
    color: var(--cs-body);

    :deep(h4) {
        font-family: 'Archivo Black', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: var(--cs-ink);
        margin: 26px 0 10px;

        &:first-child {
            margin-top: 0;
        }
    }

    :deep(p) {
        margin: 0 0 16px;
    }

    :deep(ul) {
        margin: 0 0 8px;
        padding-left: 20px;
        list-style: disc;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    :deep(ul ul) {
        margin-top: 6px;
        list-style: circle;
    }

    :deep(ul ul ul) {
        list-style: square;
    }

    :deep(li) {
        line-height: 1.6;
    }

    :deep(li > ul) {
        margin-top: 6px;
    }

    :deep(strong) {
        color: var(--cs-ink);
        text-decoration: underline;
        text-decoration-color: rgba(226, 115, 58, 0.5);
        text-underline-offset: 3px;
    }

    :deep(.cs-rich-figure) {
        width: 66%;
        margin: 28px auto;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(28, 26, 23, 0.12);

        @media (max-width: 700px) {
            width: 100%;
        }

        img,
        video {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            display: block;
        }

        figcaption {
            padding: 10px 4px 0;
            font-size: 13px;
            color: var(--cs-muted);
        }
    }
}

.cs-contrib-rail {
    position: sticky;
    top: 110px;
    display: flex;
    flex-direction: column;
    gap: 23px;

    @media (max-width: 900px) {
        position: static;
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 6px;
    }
}

.cs-contrib-rail-item {
    flex: 0 0 auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 14px 34px rgba(28, 26, 23, 0.14);

    img,
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    @media (max-width: 900px) {
        width: 280px;
    }
}

/* ── process ────────────────────────────────────────────────────────── */
.cs-process {
    position: relative;
    background: rgba(28, 26, 23, 0.50);
    padding: 110px 32px;

    @media (max-width: 700px) {
        padding: 64px 16px;
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
    max-width: 1680px;
    margin: 0 auto;
    padding: 110px 32px;

    @media (max-width: 700px) {
        padding: 64px 16px;
    }
}

.cs-gallery-grid {
    column-count: 2;
    column-gap: 40px;

    @media (min-width: 1500px) {
        column-count: 3;
    }

    @media (max-width: 600px) {
        column-count: 1;
    }
}

.cs-gallery-tile {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 0 40px;
    break-inside: avoid;
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 20px 50px rgba(28, 26, 23, 0.1);
    border: none;
    padding: 0;
    cursor: pointer;
    transition:
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover,
    &:focus-visible {
        transform: translateY(-5px) rotate(-0.3deg) scale(1.015);
        box-shadow: 0 26px 60px rgba(28, 26, 23, 0.18);
        outline: 2px solid var(--cs-accent);
        outline-offset: 2px;
    }

    img {
        width: 100%;
        display: block;
        object-fit: cover;
        aspect-ratio: 1 / 1;
    }

    &--wide img {
        aspect-ratio: 16 / 10;
    }

    &--tall img {
        aspect-ratio: 3 / 4;
    }

    &--big img {
        aspect-ratio: 4 / 5;
    }

    &--small img {
        aspect-ratio: 5 / 4;
    }
}

.cs-gallery-caption {
    padding: 14px 18px;
    text-align: left;
    font-size: 14px;
    line-height: 1.5;
    color: var(--cs-body);
}

/* ── gallery lightbox ───────────────────────────────────────────────── */
.cs-lightbox {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    background: rgba(10, 9, 8, 0.97);
}

.cs-lightbox-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: min(92vw, 1300px);
    max-height: 84vh;
}

.cs-lightbox-frame--with-caption {
    gap: 28px;

    @media (max-width: 760px) {
        flex-direction: column;
        gap: 0;
    }
}

.cs-lightbox-img {
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    max-height: 84vh;
    border-radius: 8px;
    object-fit: contain;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.cs-lightbox-frame--with-caption .cs-lightbox-img {
    max-height: 70vh;

    @media (min-width: 761px) {
        max-width: 68%;
    }
}

.cs-lightbox-caption {
    flex: 0 0 auto;
    width: 100%;
    max-width: 320px;
    padding: 24px 26px;
    border-radius: 12px;
    background: var(--cs-cream);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);

    @media (max-width: 760px) {
        max-width: 100%;
        margin-top: 16px;
    }
}

.cs-lightbox-caption-count {
    display: block;
    margin-bottom: 10px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: var(--cs-accent);
}

.cs-lightbox-caption-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--cs-body);
}

.cs-lightbox-close {
    position: absolute;
    top: 24px;
    right: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    transition:
        background 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: var(--cs-accent);
        transform: scale(1.05);
    }
}

.cs-lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    transition:
        background 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: var(--cs-accent);
        transform: translateY(-50%) scale(1.06);
    }
}

.cs-lightbox-prev {
    left: 24px;
}

.cs-lightbox-next {
    right: 24px;
}

@media (max-width: 640px) {
    .cs-lightbox {
        padding: 80px 16px;
    }

    .cs-lightbox-nav {
        width: 40px;
        height: 40px;
    }

    .cs-lightbox-prev {
        left: 8px;
    }

    .cs-lightbox-next {
        right: 8px;
    }
}

/* ── outcomes ───────────────────────────────────────────────────────── */
.cs-outcomes {
    position: relative;
    background: rgba(28, 26, 23, 0.50);
    padding: 110px 32px 130px;

    @media (max-width: 700px) {
        padding: 64px 16px 80px;
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
