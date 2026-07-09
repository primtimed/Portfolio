<template>
    <section id="top" class="hero-full">
        <div class="hero-content">
            <h1 class="hero-name-xl" v-text="name" />

            <p class="hero-role-line">
                <CyclingText :words="focusTags" suffix=" Developer" />
            </p>
        </div>

        <button
            type="button"
            class="scroll-indicator"
            :class="{ 'is-hidden': !atTop }"
            aria-label="Scroll down"
            @click="scrollDown"
        >
            <span class="scroll-mouse">
                <span class="scroll-dot"></span>
            </span>
        </button>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import CyclingText from '@/components/ui/CyclingText.vue';

defineProps<{
    name: string;
    focusTags: string[];
}>();

const atTop = ref(true);
let ticking = false;

function updateAtTop() {
    atTop.value = window.scrollY < 260;
    ticking = false;
}

function onScroll() {
    if (ticking) {
        return;
    }

    ticking = true;
    requestAnimationFrame(updateAtTop);
}

onMounted(() => {
    updateAtTop();
    window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => window.removeEventListener('scroll', onScroll));

function scrollDown() {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}
</script>

<style lang="scss" scoped>
.hero-full {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px 32px 90px;
    text-align: center;
    overflow: hidden;
    background: radial-gradient(
        ellipse 60% 50% at 50% 0%,
        rgba(255, 122, 41, 0.14),
        transparent 70%
    );
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 920px;
}

.hero-name-xl {
    margin: 0;
    font-family: var(--font-display, inherit);
    font-weight: 800;
    text-transform: uppercase;
    font-size: clamp(46px, 8.5vw, 122px);
    line-height: 0.96;
    letter-spacing: -0.01em;
    color: var(--text);
}

.hero-role-line {
    margin: 22px 0 0;
    font-family: var(--font-display, inherit);
    font-size: clamp(20px, 3vw, 32px);
    font-weight: 700;
}

.scroll-indicator {
    position: absolute;
    left: 50%;
    bottom: 36px;
    transform: translateX(-50%);
    z-index: 1;
    background: none;
    border: none;
    width: 42px;
    height: 58px;
    padding: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.3s ease;

    &.is-hidden {
        opacity: 0;
        pointer-events: none;
    }
}

.scroll-mouse {
    display: block;
    width: 26px;
    height: 42px;
    border: 2px solid #ffffff;
    border-radius: 16px;
    position: relative;
    transition: border-color 0.2s ease;
}

.scroll-indicator:hover .scroll-mouse {
    border-color: var(--accent);
}

.scroll-dot {
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    border-radius: 2px;
    background: var(--accent);
    animation: scroll-dot-bounce 1.6s ease infinite;
}

@keyframes scroll-dot-bounce {
    0% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
    70% {
        opacity: 0;
        transform: translate(-50%, 16px);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, 16px);
    }
}

@media (prefers-reduced-motion: reduce) {
    .scroll-dot {
        animation: none;
    }
}
</style>
