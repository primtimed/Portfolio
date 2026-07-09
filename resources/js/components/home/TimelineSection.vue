<template>
    <section class="timeline-section">
        <div class="timeline-heading">
            <h2 class="timeline-heading-title">My Roadmap</h2>
            <h1 class="timeline-header-discription"></h1>
            <span class="timeline-heading-rule" />
        </div>

        <div class="timeline-wrap">
            <div class="timeline">
                <div class="timeline-line"></div>
                <div class="timeline-track">
                    <RevealOnView
                        v-for="(item, i) in items"
                        :key="item.title"
                        :variant="i % 2 === 0 ? 'right' : 'left'"
                        class="timeline-row"
                        :class="i % 2 === 0 ? 'is-left' : 'is-right'"
                    >
                        <span class="timeline-dot"></span>
                        <div class="timeline-card">
                            <h3 class="timeline-title">{{ item.title }}</h3>
                            <span class="timeline-meta">{{ item.meta }}</span>
                            <p class="timeline-desc">{{ item.description }}</p>
                            <a href="#" class="timeline-cta">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="12"
                                    height="12"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM13 17h-2v-6h2v6Z"
                                    />
                                </svg>
                                View details
                            </a>
                        </div>
                    </RevealOnView>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import RevealOnView from '@/components/ui/RevealOnView.vue';
import type { ExperienceItem } from '@/types/portfolio';

defineProps<{ items: ExperienceItem[] }>();
</script>

<style lang="scss" scoped>
.timeline-section {
    position: relative;
    width: 100%;
    padding: 90px 32px;
    overflow: hidden;
}

.timeline-section::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.35;
    pointer-events: none;
}

.timeline-heading {
    position: relative;
    text-align: center;
    margin-bottom: 70px;
}

.timeline-heading-title {
    font-family: var(--font-display, inherit);
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    letter-spacing: -0.01em;
}

.timeline-header-discription {
    margin: 0 0 10px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--accent);
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
    background: var(--bg-sunken);
    color: var(--text);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none;
    transition:
        background 0.15s,
        transform 0.15s;

    &:hover {
        background: var(--accent);
        color: var(--accent-ink);
        transform: translateY(-1px);
    }
}

@media (max-width: 760px) {
    .timeline-line {
        left: 7px;
    }
}
</style>
