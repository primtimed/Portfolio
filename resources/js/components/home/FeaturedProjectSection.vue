<template>
    <section id="featured-project" class="spotlight-section">
        <div class="spotlight-layout">
            <div class="spotlight-content">
                <RevealOnView variant="left" class="spotlight-stats">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="spotlight-stat"
                    >
                        <span class="spotlight-stat-icon">
                            <svg
                                v-if="stat.icon === 'device'"
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <rect
                                    x="7"
                                    y="2"
                                    width="10"
                                    height="20"
                                    rx="2"
                                />
                                <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
                            </svg>
                            <svg
                                v-else-if="stat.icon === 'controller'"
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path d="M6 9h2m-1-1v2m7-1h.01M17 10h.01" />
                                <path
                                    d="M7.5 6h9A4.5 4.5 0 0 1 21 10.5v4a3 3 0 0 1-5.4 1.8L14 14h-4l-1.6 2.3A3 3 0 0 1 3 14.5v-4A4.5 4.5 0 0 1 7.5 6Z"
                                />
                            </svg>
                            <svg
                                v-else-if="stat.icon === 'package'"
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" />
                                <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
                                <path d="M12 12v9" />
                            </svg>
                            <svg
                                v-else
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
                                <path
                                    d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4"
                                />
                                <path d="M12 13v3m-3 4h6m-3-4v4" />
                            </svg>
                        </span>
                        <div class="spotlight-stat-value">{{ stat.value }}</div>
                        <div class="spotlight-stat-label">{{ stat.label }}</div>
                    </div>
                </RevealOnView>

                <RevealOnView variant="right" class="spotlight-main">
                    <div class="spotlight-eyebrow">Spotlight</div>
                    <h2 class="spotlight-heading">{{ project.title }}</h2>
                    <p class="spotlight-tagline">{{ project.tagline }}</p>

                    <div class="spotlight-tags">
                        <span
                            v-for="tag in project.tags"
                            :key="tag"
                            class="spotlight-chip"
                            >{{ tag }}</span
                        >
                    </div>

                    <div class="spotlight-body">
                        <p>{{ project.description }}</p>
                    </div>

                    <ul class="spotlight-highlights">
                        <li
                            v-for="highlight in project.highlights"
                            :key="highlight"
                        >
                            <svg
                                class="spotlight-highlight-icon"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                            >
                                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>{{ highlight }}</span>
                        </li>
                    </ul>

                    <p class="spotlight-cta-prompt">Curious how it works under the hood?</p>
                    <div class="spotlight-actions">
                        <a
                            :href="caseStudyUrl"
                            target="_blank"
                            rel="noopener"
                            class="spotlight-cta-btn"
                        >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                <path d="M8 5v14l11-7L8 5Z" />
                            </svg>
                            View Project
                        </a>
                        <a
                            v-if="project.sourceUrl"
                            :href="project.sourceUrl"
                            target="_blank"
                            rel="noopener"
                            class="spotlight-cta-btn"
                        >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M9 6 3 12l6 6M15 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Source Code
                        </a>
                    </div>
                </RevealOnView>
            </div>

            <div class="spotlight-media">
                <img
                    class="spotlight-media-img"
                    :src="project.image"
                    :alt="`${project.title} screenshot`"
                    loading="lazy"
                />
                <span class="spotlight-media-status">{{ project.status }}</span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RevealOnView from '@/components/ui/RevealOnView.vue';
import { featuredProjectStats as baseStats } from '@/data/portfolio';
import { projectSlug } from '@/data/projects';
import type { AboutStat, FeaturedProject } from '@/types/portfolio';

const props = defineProps<{ project: FeaturedProject; stats?: AboutStat[] }>();

const stats = computed(() => props.stats ?? baseStats);
const caseStudyUrl = computed(() => `/project/${projectSlug(props.project.title)}`);
</script>

<style lang="scss" scoped>
.spotlight-section {
    --bg: #f7f3ec;
    --bg-sunken: #f2f2f2;
    --bg-hover: #ececec;
    --border: #e5e5e5;
    --border-strong: #d0d0d0;
    --text: #111111;
    --text-dim: #595959;
    --text-faint: #8c8c8c;

    width: 100%;
    min-height: 100vh;
    display: flex;
    background: var(--bg);
    color: var(--text);
}

.spotlight-layout {
    flex: 1 1 auto;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(200px, clamp(320px, 42vw, 750px));
    align-items: stretch;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
    }
}

.spotlight-content {
    display: flex;
    gap: 40px;
    align-items: stretch;
    align-self: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 56px;

    @media (max-width: 960px) {
        flex-direction: column;
        padding: 48px 24px;
    }
}

.spotlight-stats {
    flex: 0 0 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-right: 40px;
    border-right: 1px solid var(--border);

    @media (max-width: 960px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding-right: 0;
        padding-bottom: 24px;
        border-right: none;
        border-bottom: 1px solid var(--border);
    }
}

.spotlight-stat {
    text-align: center;
}

.spotlight-stat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-faint);
    margin-bottom: 10px;
}

.spotlight-stat-value {
    font-family: var(--font-display, inherit);
    font-size: 20px;
    font-weight: 800;
    color: var(--accent);
}

.spotlight-stat-label {
    margin-top: 4px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-faint);
    line-height: 1.4;
}

.spotlight-main {
    flex: 1 1 auto;
    min-width: 0;
    text-align: center;
}

.spotlight-eyebrow {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 14px;
}

.spotlight-heading {
    margin: 0 auto 10px;
    max-width: 720px;
    font-family: var(--font-display, inherit);
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    line-height: 1.2;
}

.spotlight-tagline {
    margin: 0 auto 20px;
    max-width: 560px;
    font-size: 15px;
    color: var(--text-dim);
}

.spotlight-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
}

.spotlight-chip {
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--text-dim);
}

.spotlight-body {
    font-size: 16px;
    line-height: 1.75;
    color: var(--text-dim);

    p {
        margin: 0 0 18px;
    }
}

.spotlight-highlights {
    margin: 0 0 28px;
    padding: 0;
    list-style: none;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--text-dim);
        text-align: left;
    }
}

.spotlight-highlight-icon {
    flex: 0 0 auto;
    margin-top: 3px;
    padding: 3px;
    border-radius: 50%;
    background: rgba(255, 122, 41, 0.14);
    color: var(--accent);
}

.spotlight-cta-prompt {
    margin: 0 0 16px;
    font-size: 15px;
    color: var(--text-dim);
}

.spotlight-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
}

.spotlight-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 26px;
    border-radius: 10px;
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition:
        border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        background 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        border-color: var(--accent);
        background: var(--bg-hover);
    }
}

.spotlight-media {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 480px;
    overflow: hidden;
    border-left: 1px solid var(--border);
    background-color: var(--bg-sunken);
    background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 26px 26px;

    @media (max-width: 860px) {
        min-height: 320px;
        border-left: none;
        border-top: 1px solid var(--border);
    }
}

.spotlight-media-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.spotlight-media::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 120px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
    pointer-events: none;
}

.spotlight-media-status {
    position: absolute;
    bottom: 24px;
    left: 24px;
    z-index: 1;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #fff;
}
</style>
