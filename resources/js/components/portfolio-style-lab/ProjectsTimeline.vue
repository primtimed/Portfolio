<template>
    <section class="timeline-section">
        <div class="timeline-heading">
            <span class="timeline-eyebrow">My Projects</span>
            <h2 class="timeline-heading-title">Continue Building</h2>
            <span class="timeline-heading-rule" />
        </div>

        <div class="timeline-wrap">
            <div class="timeline">
                <div class="timeline-line"></div>
                <div class="timeline-track">
                    <RevealOnView
                        v-for="(project, i) in projects"
                        :key="project.title"
                        :variant="i % 2 === 0 ? 'right' : 'left'"
                        class="timeline-row"
                        :class="i % 2 === 0 ? 'is-left' : 'is-right'"
                    >
                        <span class="timeline-dot"></span>
                        <div class="timeline-card">
                            <h3 class="timeline-title">{{ project.title }}</h3>
                            <span class="timeline-meta">{{ project.engine }} · {{ project.genre }} · {{ project.status }}</span>
                            <p class="timeline-desc">{{ project.tagline }}</p>

                            <button type="button" class="timeline-cta" @click="toggle(i)">
                                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                    <path
                                        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM13 17h-2v-6h2v6Z"
                                    />
                                </svg>
                                {{ openIndex === i ? 'Hide details' : 'View details' }}
                            </button>

                            <transition name="expand">
                                <div v-if="openIndex === i" class="timeline-expand">
                                    <p class="timeline-expand-description">{{ project.description }}</p>

                                    <ul class="timeline-expand-highlights">
                                        <li v-for="highlight in project.highlights" :key="highlight">
                                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3">
                                                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span>{{ highlight }}</span>
                                        </li>
                                    </ul>

                                    <div class="timeline-expand-tags">
                                        <span v-for="tag in project.tags" :key="tag" class="timeline-tag">{{ tag }}</span>
                                    </div>

                                    <div class="timeline-expand-actions">
                                        <a :href="project.url" target="_blank" rel="noopener" class="timeline-btn">
                                            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M8 5v14l11-7L8 5Z" /></svg>
                                            View Project
                                        </a>
                                        <a v-if="project.sourceUrl" :href="project.sourceUrl" target="_blank" rel="noopener" class="timeline-btn">
                                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5">
                                                <path d="M9 6 3 12l6 6M15 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Source Code
                                        </a>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </RevealOnView>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RevealOnView from '@/components/ui/RevealOnView.vue';
import { projects } from '@/data/projects';

const openIndex = ref<number | null>(0);

function toggle(i: number) {
    openIndex.value = openIndex.value === i ? null : i;
}
</script>

<style lang="scss" scoped>
.timeline-section {
    position: relative;
    width: 100%;
    padding: 90px 32px;
    overflow: hidden;
}

.timeline-heading {
    position: relative;
    text-align: center;
    margin-bottom: 70px;
}

.timeline-eyebrow {
    display: block;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
}

.timeline-heading-title {
    margin: 0 0 14px;
    font-family: var(--font-display, inherit);
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    letter-spacing: -0.01em;
}

.timeline-heading-rule {
    display: inline-block;
    width: 64px;
    height: 2px;
    background: var(--accent);
}

.timeline-wrap {
    position: relative;
    max-width: 1120px;
    margin: 0 auto;
}

.timeline {
    position: relative;
}

.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-strong);
    transform: translateX(-50%);
}

.timeline-track {
    display: flex;
    flex-direction: column;
    gap: 56px;
}

.timeline-row {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 48px;

    &.is-left .timeline-card {
        grid-column: 1;
        text-align: right;
    }
    &.is-right .timeline-card {
        grid-column: 2;
        text-align: left;
    }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        padding-left: 30px;

        &.is-left .timeline-card,
        &.is-right .timeline-card {
            grid-column: 1;
            text-align: left;
        }
    }
}

.timeline-dot {
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid var(--bg);
    box-shadow: 0 0 0 1px var(--border-strong);
    z-index: 1;

    @media (max-width: 760px) {
        left: 7px;
    }
}

.timeline-card {
    display: flex;
    flex-direction: column;
}

.is-left .timeline-card {
    align-items: flex-end;
}
.is-right .timeline-card {
    align-items: flex-start;
}

.timeline-title {
    margin: 0 0 4px;
    font-size: 22px;
    font-weight: 700;
}

.timeline-meta {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    color: var(--text-faint);
    margin-bottom: 14px;
    display: block;
}

.timeline-desc {
    margin: 0 0 18px;
    max-width: 380px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-dim);
}

.timeline-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 999px;
    border: none;
    background: var(--bg-sunken);
    color: var(--text);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
        background 0.15s,
        transform 0.15s;

    &:hover {
        background: var(--accent);
        color: var(--accent-ink);
        transform: translateY(-1px);
    }
}

.timeline-expand {
    margin-top: 22px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
    max-width: 420px;
}

.expand-enter-active,
.expand-leave-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}
.expand-enter-from {
    opacity: 0;
    transform: translateY(-6px);
}
.expand-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.timeline-expand-description {
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-dim);
}

.timeline-expand-highlights {
    margin: 0 0 16px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 13px;
        line-height: 1.5;
        color: var(--text-dim);
    }

    svg {
        flex: 0 0 auto;
        margin-top: 3px;
        color: var(--accent);
    }
}

.is-left .timeline-expand-highlights li {
    flex-direction: row-reverse;
    justify-content: flex-end;
}

.timeline-expand-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
}

.is-left .timeline-expand-tags {
    justify-content: flex-end;
}

.timeline-tag {
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-dim);
}

.timeline-expand-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.is-left .timeline-expand-actions {
    justify-content: flex-end;
}

.timeline-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 8px;
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition:
        border-color 0.15s,
        background 0.15s;

    &:hover {
        border-color: var(--accent);
        background: var(--bg-hover);
    }
}

@media (max-width: 760px) {
    .timeline-line {
        left: 7px;
    }

    .timeline-expand,
    .timeline-expand-highlights li,
    .timeline-expand-tags,
    .timeline-expand-actions {
        justify-content: flex-start !important;
        flex-direction: row !important;
    }
}
</style>
