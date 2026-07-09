<template>
    <section id="games" class="games-section">
        <RevealOnView variant="up" class="games-heading">
            <span class="games-eyebrow">Featured Projects</span>
            <h2 class="games-heading-title">My Projects Library</h2>
            <span class="games-heading-rule" />
        </RevealOnView>

        <div class="games-row">
            <button
                type="button"
                class="games-nav games-nav-prev"
                :class="{ 'is-disabled': atStart }"
                aria-label="Scroll to previous game"
                @click="scrollByTile(-1)"
            >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <div
                ref="trackEl"
                class="games-track"
                :class="{ 'is-dragging': isDragging, 'is-settling': isSettling }"
                tabindex="0"
                role="list"
                aria-label="Featured games"
                @scroll="updateEdges"
                @keydown.left.prevent="scrollByTile(-1)"
                @keydown.right.prevent="scrollByTile(1)"
                @pointerdown="onPointerDown"
                @pointermove="onPointerMove"
                @pointerup="onPointerUp"
                @pointercancel="onPointerUp"
                @click.capture="onTrackClick"
            >
                <a
                    v-for="(game, i) in games"
                    :key="game.title"
                    :href="game.url"
                    target="_blank"
                    rel="noopener"
                    role="listitem"
                    class="game-tile"
                    :class="`game-tile--art${(i % 4) + 1}`"
                >
                    <img
                        class="game-tile-img"
                        :src="game.image"
                        :alt="`${game.title} cover art`"
                        loading="lazy"
                        draggable="false"
                    />

                    <span class="game-tile-status">{{ game.status }}</span>

                    <span class="game-tile-info">
                        <span class="game-tile-title">{{ game.title }}</span>
                        <span class="game-tile-tagline">{{ game.tagline }}</span>
                        <span class="game-tile-meta">
                            <span class="game-tile-chip">{{ game.genre }}</span>
                            <span class="game-tile-chip">{{ game.engine }}</span>
                        </span>
                        <span class="game-tile-cta">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                <path d="M8 5v14l11-7L8 5Z" />
                            </svg>
                            Play
                        </span>
                    </span>
                </a>

                <a
                    :href="moreUrl"
                    target="_blank"
                    rel="noopener"
                    role="listitem"
                    class="game-tile game-tile--more"
                >
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 5v14M5 12h14" stroke-linecap="round" />
                    </svg>
                    <span>More on itch.io</span>
                </a>
            </div>

            <button
                type="button"
                class="games-nav games-nav-next"
                :class="{ 'is-disabled': atEnd }"
                aria-label="Scroll to next game"
                @click="scrollByTile(1)"
            >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import RevealOnView from '@/components/ui/RevealOnView.vue';
import { featuredGamesItchUrl } from '@/data/portfolio';
import type { FeaturedGame } from '@/types/portfolio';

defineProps<{ games: FeaturedGame[] }>();

const moreUrl = featuredGamesItchUrl;

const trackEl = ref<HTMLElement | null>(null);
const atStart = ref(true);
const atEnd = ref(false);
const isDragging = ref(false);
const isSettling = ref(false);
let dragMoved = false;
let dragStartX = 0;
let dragStartScrollLeft = 0;
let lastMoveX = 0;
let lastMoveTime = 0;
let velocityX = 0;
let inertiaRaf: number | null = null;

function stopInertia() {
    if (inertiaRaf !== null) {
        cancelAnimationFrame(inertiaRaf);
        inertiaRaf = null;
    }
    isSettling.value = false;
}

function startInertia(initialVelocity: number) {
    const el = trackEl.value;
    if (!el || Math.abs(initialVelocity) < 0.05) return;

    isSettling.value = true;
    let velocity = initialVelocity;
    let lastTime = performance.now();

    const step = (now: number) => {
        const dt = now - lastTime;
        lastTime = now;
        if (!el) return;

        el.scrollLeft += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16.67);

        const atLimit = el.scrollLeft <= 0 || el.scrollLeft >= el.scrollWidth - el.clientWidth;
        if (Math.abs(velocity) < 0.02 || atLimit) {
            inertiaRaf = null;
            isSettling.value = false;
            updateEdges();
            return;
        }

        updateEdges();
        inertiaRaf = requestAnimationFrame(step);
    };

    inertiaRaf = requestAnimationFrame(step);
}

function updateEdges() {
    const el = trackEl.value;
    if (!el) return;
    atStart.value = el.scrollLeft <= 4;
    atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
}

function scrollByTile(direction: 1 | -1) {
    const el = trackEl.value;
    if (!el) return;
    const tile = el.querySelector<HTMLElement>('.game-tile');
    const step = (tile?.offsetWidth ?? 260) + 24;
    el.scrollBy({ left: step * direction, behavior: 'smooth' });
}

function onPointerDown(e: PointerEvent) {
    const el = trackEl.value;
    if (!el || e.pointerType !== 'mouse' || e.button !== 0) return;
    stopInertia();
    isDragging.value = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragStartScrollLeft = el.scrollLeft;
    lastMoveX = e.clientX;
    lastMoveTime = performance.now();
    velocityX = 0;
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
}

function onPointerMove(e: PointerEvent) {
    const el = trackEl.value;
    if (!el || !isDragging.value) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 3) dragMoved = true;
    el.scrollLeft = dragStartScrollLeft - dx;

    const now = performance.now();
    const dt = now - lastMoveTime;
    if (dt > 0) {
        velocityX = (e.clientX - lastMoveX) / dt;
        lastMoveX = e.clientX;
        lastMoveTime = now;
    }
}

function onPointerUp(e: PointerEvent) {
    const el = trackEl.value;
    if (!el || !isDragging.value) return;
    isDragging.value = false;
    el.releasePointerCapture(e.pointerId);
    startInertia(-velocityX);
}

function onTrackClick(e: MouseEvent) {
    if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        dragMoved = false;
    }
}

onMounted(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateEdges);
    stopInertia();
});
</script>

<style lang="scss" scoped>
.games-section {
    position: relative;
    width: 100%;
    padding: 90px 50px;
    overflow: hidden;
}

.games-heading {
    padding: 0 32px;
    width: 100%;
    margin: 0 0 40px;
    text-align: center;
}

.games-eyebrow {
    display: block;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
}

.games-heading-title {
    margin: 0 0 14px;
    font-family: var(--font-display, inherit);
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    letter-spacing: -0.01em;
}

.games-heading-rule {
    display: inline-block;
    width: 64px;
    height: 2px;
    background: var(--accent);
}

.games-row {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
}

.games-nav {
    flex: 0 0 auto;
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin: 0 4px;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    background: var(--bg-sunken);
    color: var(--text);
    cursor: pointer;
    transition:
        background 0.15s,
        border-color 0.15s,
        opacity 0.15s,
        transform 0.15s;

    &:hover {
        border-color: var(--accent);
        background: var(--accent);
        color: var(--accent-ink);
        transform: scale(1.06);
    }

    &.is-disabled {
        opacity: 0.3;
        pointer-events: none;
    }

    @media (max-width: 760px) {
        display: none;
    }
}

.games-track {
    flex: 1 1 auto;
    display: flex;
    gap: 24px;
    padding: 30px 32px 40px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-left: 32px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    cursor: grab;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &:focus-visible {
        outline: none;
    }

    &:hover .game-tile:not(:hover, :focus-visible),
    &:focus-within .game-tile:not(:hover, :focus-visible) {
        opacity: 0.55;
        filter: saturate(0.7);
    }

    &.is-dragging {
        cursor: grabbing;
        scroll-snap-type: none;

        .game-tile {
            transition: none;
        }
    }

    &.is-settling {
        scroll-snap-type: none;

        .game-tile {
            transition: none;
        }
    }
}

.game-tile {
    position: relative;
    flex: 0 0 auto;
    width: 320px;
    aspect-ratio: 2 / 3;
    scroll-snap-align: start;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-decoration: none;
    color: var(--text);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        opacity 0.25s ease,
        filter 0.25s ease;

    &--art1 {
        background-color: #c23f1c;
    }
    &--art2 {
        background-color: #16324f;
    }
    &--art3 {
        background-color: #2c1e63;
    }
    &--art4 {
        background-color: #114634;
    }

    &:hover,
    &:focus-visible {
        transform: scale(1.06) translateY(-6px);
        box-shadow: 0 18px 34px rgba(0, 0, 0, 0.45);
        z-index: 1;
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
}

.game-tile-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
    -webkit-user-drag: none;
    pointer-events: none;
}

.game-tile:hover .game-tile-img,
.game-tile:focus-visible .game-tile-img {
    transform: scale(1.05);
}

.game-tile-status {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 1;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #fff;
}

.game-tile-info {
    position: relative;
    z-index: 1;
    padding: 18px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0) 100%);
    display: flex;
    flex-direction: column;
}

.game-tile-title {
    font-family: var(--font-display, inherit);
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
}

.game-tile-tagline,
.game-tile-meta,
.game-tile-cta {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition:
        max-height 0.25s ease,
        opacity 0.2s ease,
        margin 0.25s ease;
}

.game-tile-tagline {
    margin-top: 0;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
}

.game-tile-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 0;
}

.game-tile-chip {
    padding: 3px 8px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    font-size: 10px;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.9);
}

.game-tile-cta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--accent);
}

.game-tile:hover .game-tile-tagline,
.game-tile:focus-visible .game-tile-tagline {
    max-height: 60px;
    opacity: 1;
    margin-top: 6px;
}

.game-tile:hover .game-tile-meta,
.game-tile:focus-visible .game-tile-meta {
    max-height: 30px;
    opacity: 1;
    margin-top: 10px;
}

.game-tile:hover .game-tile-cta,
.game-tile:focus-visible .game-tile-cta {
    max-height: 20px;
    opacity: 1;
    margin-top: 12px;
}

.game-tile--more {
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--bg-sunken);
    border: 1px dashed var(--border-strong);
    color: var(--text-dim);
    box-shadow: none;

    &:hover,
    &:focus-visible {
        color: var(--accent);
        border-color: var(--accent);
        box-shadow: none;
        outline: none;
    }

    span {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.02em;
    }
}

@media (max-width: 760px) {
    .games-track {
        padding: 20px 20px 30px;
    }

    .game-tile {
        width: 230px;
    }
}
</style>
