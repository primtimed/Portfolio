<template>
    <Head>
        <title>My Projects — {{ profile.name }}</title>
        <meta name="description" :content="`Browse ${profile.name}'s projects.`" />
    </Head>

    <div :style="{ '--accent': profile.accent }" class="root ps-root">
        <div class="ps-backdrop">
            <transition name="backdrop-fade" mode="out-in">
                <div
                    :key="activeProject.title"
                    class="ps-backdrop-img"
                    :style="{ backgroundImage: `url(${activeProject.image})` }"
                />
            </transition>
            <div class="ps-backdrop-wash" />
            <div class="ps-nav-scrim" />
        </div>

        <SiteNav :name="profile.name" />

        <main class="ps-main">
            <div class="ps-icon-row" role="list" aria-label="Projects">
                <a href="/" class="ps-icon-tile ps-icon-tile-home" aria-label="Back to home">
                    <svg class="ps-home-icon" viewBox="0 0 24 24" width="92" height="92" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M4 12 12 4l8 8v8H4v-8Z" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>

                <button
                    v-for="(project, i) in projects"
                    :key="project.title"
                    type="button"
                    role="listitem"
                    class="ps-icon-tile"
                    :class="{ 'is-active': i === activeIndex }"
                    @click="select(i)"
                >
                    <img
                        class="ps-icon-tile-img"
                        :src="project.image"
                        :alt="`${project.title} icon`"
                        loading="lazy"
                        draggable="false"
                    />
                </button>

                <span class="ps-icon-tile ps-icon-tile-more" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <circle cx="5" cy="12" r="1.6" />
                        <circle cx="12" cy="12" r="1.6" />
                        <circle cx="19" cy="12" r="1.6" />
                    </svg>
                </span>
            </div>

            <transition name="label-swap" mode="out-in">
                <div :key="activeProject.title" class="ps-active-label">
                    <span class="ps-active-title">{{ activeProject.title }}</span>
                    <span class="ps-active-tagline">{{ activeProject.tagline }}</span>
                </div>
            </transition>

            <transition name="grid-swap" mode="out-in">
                <div :key="activeProject.title" class="ps-grid">
                    <section class="ps-card card-stats">
                        <div class="card-head">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
                                <path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4" />
                                <path d="M12 13v3m-3 4h6m-3-4v4" />
                            </svg>
                            Project Stats
                        </div>

                        <div class="stat-row">
                            <span class="stat-label">Engine</span>
                            <span class="stat-value">{{ activeProject.engine }}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Genre</span>
                            <span class="stat-value">{{ activeProject.genre }}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Status</span>
                            <span class="stat-value">{{ activeProject.status }}</span>
                        </div>

                        <div class="completion">
                            <div class="completion-top">
                                <span>Completion</span>
                                <span>{{ statusProgress(activeProject.status) }}%</span>
                            </div>
                            <div class="completion-bar">
                                <span class="completion-fill" :style="{ width: `${statusProgress(activeProject.status)}%` }" />
                            </div>
                        </div>
                    </section>

                    <section class="ps-card card-stack">
                        <div class="card-head">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="7" y="2" width="10" height="20" rx="2" />
                                <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
                            </svg>
                            Tech Stack
                        </div>
                        <div class="stack-tags">
                            <span v-for="tag in activeProject.tags" :key="tag" class="stack-tag">{{ tag }}</span>
                        </div>
                    </section>

                    <button type="button" class="ps-card card-preview" @click="lightboxOpen = true">
                        <span class="card-head card-head-overlay">Preview</span>
                        <img class="card-preview-img" :src="activeProject.image" :alt="`${activeProject.title} preview`" loading="lazy" />
                        <span class="card-preview-hint">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6">
                                <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            View all media
                        </span>
                    </button>

                    <section class="ps-card card-catalog">
                        <div class="card-catalog-content">
                            <span class="catalog-eyebrow">About This Project</span>
                            <h2 class="catalog-title">{{ activeProject.title }}</h2>
                            <p class="catalog-description">{{ activeProject.description }}</p>
                            <ul class="catalog-highlights">
                                <li v-for="highlight in activeProject.highlights" :key="highlight">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3">
                                        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {{ highlight }}
                                </li>
                            </ul>
                            <div class="catalog-badges">
                                <span class="catalog-badge">{{ activeProject.engine }}</span>
                                <span class="catalog-badge">{{ activeProject.status }}</span>
                            </div>
                        </div>
                    </section>

                    <a
                        v-if="activeProject.sourceUrl"
                        :href="activeProject.sourceUrl"
                        target="_blank"
                        rel="noopener"
                        class="ps-card card-side"
                    >
                        <span class="card-head">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path
                                    d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z"
                                />
                            </svg>
                            Source
                        </span>
                        <span class="side-cta">View repository <span class="side-arrow">→</span></span>
                    </a>

                    <a :href="activeProject.url" target="_blank" rel="noopener" class="ps-card card-play">
                        <span class="play-ring">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M8 5v14l11-7L8 5Z" />
                            </svg>
                        </span>
                        <span class="play-text">
                            <span class="play-title">Play Project</span>
                            <span class="play-sub">Launch demo</span>
                        </span>
                    </a>
                </div>
            </transition>
        </main>

        <SiteFooter />

        <MediaLightbox :open="lightboxOpen" :items="activeMedia" @close="lightboxOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import MediaLightbox from '@/components/ui/MediaLightbox.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteNav from '@/components/layout/SiteNav.vue';
import { profile, projects } from '@/data/portfolio';
import type { ProjectMediaItem } from '@/types/portfolio';

const activeIndex = ref(0);
const activeProject = computed(() => projects[activeIndex.value]);

const activeMedia = computed<ProjectMediaItem[]>(
    () => activeProject.value.media ?? [{ type: 'image', src: activeProject.value.image, caption: activeProject.value.title }],
);

const lightboxOpen = ref(false);

function select(i: number) {
    activeIndex.value = i;
}

function statusProgress(status: string) {
    if (status === 'Released') return 100;
    if (status === 'In Development') return 65;
    return 30;
}
</script>

<style lang="scss" scoped>
.ps-root {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(180deg, #f3f4f6 0%, #e7e8eb 100%);
    overflow: hidden;
}

.ps-backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
}

.ps-backdrop-img {
    position: absolute;
    inset: -60px;
    background-size: cover;
    background-position: center;
    filter: blur(1px);
    transform: scale(1.15);
    opacity: 0.9;
}

.ps-backdrop-wash {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(238, 239, 242, 0.32) 0%, rgba(232, 233, 237, 0.42) 45%, rgba(228, 229, 233, 0.55) 100%);
}

.ps-nav-scrim {
    position: absolute;
    inset: 0 0 auto 0;
    height: 220px;
    background: linear-gradient(180deg, rgba(10, 10, 12, 0.5) 0%, rgba(10, 10, 12, 0) 100%);
    pointer-events: none;
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
    opacity: 0;
}

/* ── dashboard content ─────────────────────────────────────────────── */
.ps-main {
    --bg: #eceef1;
    --bg-sunken: #f4f5f7;
    --border: #e5e6ea;
    --text: #15161a;
    --text-dim: #55585f;
    --text-faint: #8b8e96;

    position: relative;
    z-index: 1;
    color: var(--text);
    padding: 132px 56px 120px;
    max-width: 1720px;
    margin: 0 auto;
    animation: ps-fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;

    @media (max-width: 700px) {
        padding: 108px 20px 60px;
    }
}

@keyframes ps-fade-in {
    from {
        opacity: 0;
        transform: translateY(14px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .ps-main {
        animation: none;
    }
}

.ps-icon-row {
    display: flex;
    gap: 18px;
    overflow-x: auto;
    padding: 6px 2px 6px;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.ps-icon-tile {
    position: relative;
    flex: 0 0 auto;
    width: 148px;
    height: 148px;
    border-radius: 24px;
    overflow: hidden;
    border: none;
    padding: 0;
    cursor: pointer;
    background: #1b1b1f;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    background: var(--color-white);
    transition:
        transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);

    @media (max-width: 700px) {
        width: 96px;
        height: 96px;
        border-radius: 16px;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);

        .ps-icon-tile-img {
            transform: scale(1.06);
        }
    }

    &.is-active {
        box-shadow:
            0 0 0 2px var(--accent),
            0 0 16px rgba(255, 122, 41, 0.3),
            0 10px 22px rgba(0, 0, 0, 0.2);
        transform: translateY(-4px);

        .ps-icon-tile-img {
            transform: scale(1.06);
        }
    }
}

.ps-icon-tile-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    -webkit-user-drag: none;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.ps-icon-tile-home {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.ps-home-icon {
    color: var(--accent);
}

.ps-icon-tile-more {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-sunken);
    color: var(--text-faint);
    cursor: default;
    box-shadow: none;
}

/* ── active label ───────────────────────────────────────────────────── */
.ps-active-label {
    display: flex;
    flex-direction: column;
    margin: 28px 0 34px;
}

.label-swap-enter-active,
.label-swap-leave-active {
    transition:
        opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.label-swap-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.label-swap-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.ps-active-title {
    font-family: var(--font-display, inherit);
    font-size: clamp(28px, 3vw, 38px);
    font-weight: 800;
    color: var(--text);
}

.ps-active-tagline {
    margin-top: 6px;
    font-size: 17px;
    color: var(--text-dim);
}

/* ── widget grid ────────────────────────────────────────────────────── */
.grid-swap-enter-active,
.grid-swap-leave-active {
    transition:
        opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.grid-swap-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
.grid-swap-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.ps-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr 1.6fr 0.9fr;
    grid-template-rows: auto auto;
    gap: 24px;
    grid-template-areas:
        'stats stack catalog side'
        'stats preview catalog play';

    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            'stats stats'
            'stack preview'
            'catalog catalog'
            'side play';
    }

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            'stats'
            'stack'
            'preview'
            'catalog'
            'side'
            'play';
    }
}

.ps-card {
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.62);
    border: 1px solid rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(30px) saturate(1.3);
    -webkit-backdrop-filter: blur(30px) saturate(1.3);
    box-shadow:
        0 1px 2px rgba(20, 20, 30, 0.03),
        0 14px 32px rgba(20, 20, 30, 0.09);
    text-decoration: none;
    color: inherit;
    transition:
        box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
        background 0.3s ease;
}

.card-head {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-dim);

    svg {
        width: 19px;
        height: 19px;
    }
}

.card-stats {
    grid-area: stats;
    padding: 30px 30px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 340px;
}

.stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;
    padding: 4px 0;
}

.stat-label {
    color: var(--text-faint);
}

.stat-value {
    font-weight: 700;
    color: var(--text);
}

.completion {
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid rgba(21, 22, 26, 0.1);
}

.completion-top {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-faint);
    margin-bottom: 10px;
}

.completion-bar {
    height: 8px;
    border-radius: 999px;
    background: rgba(21, 22, 26, 0.08);
    overflow: hidden;
}

.completion-fill {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--accent);
}

.card-stack {
    grid-area: stack;
    padding: 26px 26px 26px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.stack-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

.stack-tag {
    padding: 8px 15px;
    border-radius: 999px;
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dim);
}

.card-preview {
    grid-area: preview;
    position: relative;
    overflow: hidden;
    min-height: 180px;
    display: block;
    width: 100%;
    padding: 0;
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:hover .card-preview-img {
        transform: scale(1.05);
    }

    &:hover .card-preview-hint {
        opacity: 1;
        transform: translateY(0);
    }
}

.card-preview-hint {
    position: absolute;
    inset: auto 0 0 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    padding: 12px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, transparent 100%);
    opacity: 0;
    transform: translateY(6px);
    transition:
        opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-head-overlay {
    position: absolute;
    top: 16px;
    left: 18px;
    z-index: 1;
    padding: 5px 13px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
    font-size: 13px;
    backdrop-filter: blur(4px);
}

.card-preview-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-catalog {
    grid-area: catalog;
    position: relative;
    overflow: hidden;
    min-height: 340px;
}

.card-catalog-content {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 32px 38px 34px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: var(--text);
}

.catalog-eyebrow {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 10px;
}

.catalog-title {
    margin: 0 0 12px;
    font-family: var(--font-display, inherit);
    font-size: clamp(26px, 3.2vw, 38px);
    font-weight: 800;
    color: var(--text);
}

.catalog-description {
    margin: 0 0 20px;
    max-width: 560px;
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-dim);
}

.catalog-highlights {
    margin: 0 0 22px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 9px;

    li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--text-dim);

        svg {
            flex: 0 0 auto;
            margin-top: 3px;
            color: var(--accent);
        }
    }
}

.catalog-badges {
    display: flex;
    gap: 10px;
}

.catalog-badge {
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(21, 22, 26, 0.06);
    border: 1px solid rgba(21, 22, 26, 0.08);
    font-size: 13px;
    font-weight: 700;
    color: var(--text-dim);
}

.card-side {
    grid-area: side;
    padding: 26px 26px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 22px;
    min-height: 140px;

    &:hover {
        transform: translateY(-3px);
        box-shadow:
            0 1px 2px rgba(20, 20, 30, 0.03),
            0 18px 36px rgba(20, 20, 30, 0.12);
    }
}

.side-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
}

.side-arrow {
    display: inline-block;
    color: var(--accent);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-side:hover .side-arrow {
    transform: translateX(4px);
}

.card-play {
    grid-area: play;
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 24px 26px;

    &:hover {
        transform: translateY(-3px);
        box-shadow:
            0 1px 2px rgba(20, 20, 30, 0.03),
            0 18px 36px rgba(20, 20, 30, 0.12);
    }
}

.play-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid var(--accent);
    color: var(--accent);
    flex: 0 0 auto;

    svg {
        width: 22px;
        height: 22px;
    }
}

.play-text {
    display: flex;
    flex-direction: column;
}

.play-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
}

.play-sub {
    font-size: 13px;
    color: var(--text-faint);
}
</style>
