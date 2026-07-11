<template>
    <section id="portfolio-cta" class="cta-section">
        <RevealOnView variant="up" class="cta-content">
            <span class="cta-eyebrow">{{ cta.eyebrow }}</span>
            <h2 class="cta-heading">{{ cta.heading }}</h2>

            <p v-for="line in cta.lines" :key="line" class="cta-line">
                {{ line }}
            </p>

            <a :href="cta.buttonUrl" class="cta-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M4 5.5C4 4.67 4.67 4 5.5 4H11a2 2 0 0 1 2 2v14a1.5 1.5 0 0 0-1.5-1.5H4V5.5Z" stroke-linejoin="round" />
                    <path d="M20 5.5c0-.83-.67-1.5-1.5-1.5H13a2 2 0 0 0-2 2v14a1.5 1.5 0 0 1 1.5-1.5H20V5.5Z" stroke-linejoin="round" />
                </svg>
                {{ cta.buttonLabel }}
            </a>
        </RevealOnView>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RevealOnView from '@/components/ui/RevealOnView.vue';
import { portfolioCta as baseCta } from '@/data/portfolio';

const props = defineProps<{ cta?: typeof baseCta }>();

const cta = computed(() => props.cta ?? baseCta);
</script>

<style lang="scss" scoped>
.cta-section {
    position: relative;
    width: 100%;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 32px;
    text-align: center;
    overflow: hidden;
    background: radial-gradient(
        ellipse 60% 50% at 50% 50%,
        rgba(255, 122, 41, 0.14),
        transparent 70%
    );
}

.cta-content {
    position: relative;
    z-index: 1;
    max-width: 760px;
}

.cta-eyebrow {
    display: block;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 18px;
}

.cta-heading {
    margin: 0 0 28px;
    font-family: var(--font-display, inherit);
    font-size: clamp(32px, 5.5vw, 56px);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    line-height: 1.1;
    color: #ffffff;
}

.cta-line {
    margin: 0 0 6px;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    padding: 16px 32px;
    border-radius: 999px;
    background: #ffffff;
    color: var(--accent-ink, #1a0e05);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none;
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        transform: translateY(-2px);
    }
}
</style>
