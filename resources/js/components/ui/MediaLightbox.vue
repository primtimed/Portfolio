<template>
    <Teleport to="body" :disabled="!mounted">
        <transition name="lb-fade">
            <div v-if="open" class="lb-overlay" role="dialog" aria-modal="true" @click.self="close">
                <button type="button" class="lb-close" aria-label="Close" @click="close">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M5 5l14 14M19 5 5 19" stroke-linecap="round" />
                    </svg>
                </button>

                <template v-if="mode === 'grid'">
                    <div class="lb-panel">
                        <div class="lb-panel-header">
                            <span class="lb-eyebrow">Media Library</span>
                            <span class="lb-grid-count">{{ items.length }} {{ items.length === 1 ? 'photo' : 'photos' }}</span>
                            <span class="lb-header-rule" />
                        </div>

                        <div class="lb-grid-row">
                            <button
                                v-if="pageCount > 1"
                                type="button"
                                class="lb-arrow lb-page-prev"
                                :disabled="page === 0"
                                aria-label="Previous page"
                                @click="page--"
                            >
                                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M16 4 6 12l10 8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>

                            <div class="lb-grid">
                                <button
                                    v-for="item in pagedItems"
                                    :key="item.src"
                                    type="button"
                                    class="lb-grid-tile"
                                    @click="openSingle(items.indexOf(item))"
                                >
                                    <img v-if="item.type === 'image'" :src="item.src" :alt="item.caption || ''" loading="lazy" />
                                    <template v-else>
                                        <img v-if="getYoutubeThumbnailUrl(item.src)" :src="getYoutubeThumbnailUrl(item.src)!" :alt="item.caption || ''" loading="lazy" />
                                        <video v-else :src="item.src" muted playsinline />
                                        <span class="lb-grid-play">
                                            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                                                <path d="M8 5v14l11-7L8 5Z" />
                                            </svg>
                                        </span>
                                    </template>
                                    <span class="lb-grid-scrim" />
                                    <span v-if="item.caption" class="lb-grid-caption">{{ item.caption }}</span>
                                </button>
                            </div>

                            <button
                                v-if="pageCount > 1"
                                type="button"
                                class="lb-arrow lb-page-next"
                                :disabled="page === pageCount - 1"
                                aria-label="Next page"
                                @click="page++"
                            >
                                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="m8 4 10 8-10 8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <span v-if="pageCount > 1" class="lb-page-count">Page {{ page + 1 }} / {{ pageCount }}</span>
                    </div>
                </template>

                <template v-else>
                    <button type="button" class="lb-back" @click="mode = 'grid'">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        All photos
                    </button>

                    <button v-if="items.length > 1" type="button" class="lb-arrow lb-arrow-prev" aria-label="Previous" @click="prev">
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M16 4 6 12l10 8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <div class="lb-stage">
                        <div class="lb-frame">
                            <transition name="lb-item-fade" mode="out-in">
                                <img
                                    v-if="current?.type === 'image'"
                                    :key="current.src"
                                    :src="current.src"
                                    :alt="current.caption || ''"
                                    class="lb-media"
                                />
                                <iframe
                                    v-else-if="current?.type === 'video' && getYoutubeEmbedUrl(current.src, { autoplay: true, controls: true })"
                                    :key="current.src"
                                    :src="getYoutubeEmbedUrl(current.src, { autoplay: true, controls: true })!"
                                    class="lb-media lb-media-iframe"
                                    frameborder="0"
                                    allow="autoplay; encrypted-media"
                                    allowfullscreen
                                    title=""
                                />
                                <video
                                    v-else-if="current?.type === 'video'"
                                    :key="current.src"
                                    :src="current.src"
                                    class="lb-media"
                                    controls
                                    autoplay
                                />
                            </transition>
                        </div>
                    </div>

                    <button v-if="items.length > 1" type="button" class="lb-arrow lb-arrow-next" aria-label="Next" @click="next">
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="m8 4 10 8-10 8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <div class="lb-footer">
                        <div class="lb-caption-row">
                            <span v-if="current?.caption" class="lb-caption">{{ current.caption }}</span>
                            <span class="lb-count">{{ index + 1 }} / {{ items.length }}</span>
                        </div>

                        <div v-if="items.length > 1" ref="filmstripEl" class="lb-filmstrip">
                            <button
                                v-for="(item, i) in items"
                                :key="item.src"
                                type="button"
                                class="lb-thumb"
                                :class="{ 'is-active': i === index }"
                                :aria-label="`Show item ${i + 1}`"
                                @click="index = i"
                            >
                                <img v-if="item.type === 'image'" :src="item.src" alt="" loading="lazy" />
                                <span v-else class="lb-thumb-video">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                        <path d="M8 5v14l11-7L8 5Z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from '@/lib/youtube';
import type { ProjectMediaItem } from '@/types/portfolio';

const PAGE_SIZE = 4;

const props = defineProps<{
    open: boolean;
    items: ProjectMediaItem[];
}>();

const emit = defineEmits<{ close: [] }>();

const mounted = ref(false);
const mode = ref<'grid' | 'single'>('grid');
const page = ref(0);
const index = ref(0);
const filmstripEl = ref<HTMLElement | null>(null);

const current = computed(() => props.items[index.value]);
const pageCount = computed(() => Math.ceil(props.items.length / PAGE_SIZE));
const pagedItems = computed(() => props.items.slice(page.value * PAGE_SIZE, page.value * PAGE_SIZE + PAGE_SIZE));

watch(
    () => props.open,
    (isOpen) => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (isOpen) {
            mode.value = 'grid';
            page.value = 0;
            index.value = 0;
        }
    },
);

watch(index, () => {
    nextTick(() => {
        const active = filmstripEl.value?.querySelector<HTMLElement>('.is-active');
        active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
});

function openSingle(i: number) {
    index.value = i;
    mode.value = 'single';
}

function close() {
    emit('close');
}

function next() {
    index.value = (index.value + 1) % props.items.length;
}

function prev() {
    index.value = (index.value - 1 + props.items.length) % props.items.length;
}

function onKeydown(e: KeyboardEvent) {
    if (!props.open) return;
    if (e.key === 'Escape') close();
    else if (mode.value === 'single' && e.key === 'ArrowRight') next();
    else if (mode.value === 'single' && e.key === 'ArrowLeft') prev();
}

onMounted(() => {
    mounted.value = true;
    window.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
    document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
.lb-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--color-black) 80%, transparent);
}

.lb-fade-enter-active,
.lb-fade-leave-active {
    transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.lb-fade-enter-from,
.lb-fade-leave-to {
    opacity: 0;
}

.lb-close {
    position: absolute;
    top: 22px;
    right: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    color: var(--color-white);
    cursor: pointer;
    transition: color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        color: var(--accent, #ff7a29);
    }
}

.lb-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: none;
    background: none;
    color: #737373;
    cursor: pointer;
    transition: color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        color: var(--accent, #ff7a29);
    }
}

.lb-arrow-prev {
    left: 12px;
}

.lb-arrow-next {
    right: 12px;
}

.lb-back {
    position: absolute;
    top: 22px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    background: none;
    padding: 0;
    color: #b0b0b0;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        color: var(--accent, #ff7a29);
    }
}

/* ── grid overview ──────────────────────────────────────────────────── */
.lb-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    padding: 48px 56px;
    border-radius: 20px;
    border: 1px solid #e5e5e5;
    background:
        linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%),
        linear-gradient(#eee 1px, transparent 1px),
        linear-gradient(90deg, #eee 1px, transparent 1px);
    background-size:
        100% 100%,
        28px 28px,
        28px 28px;
    box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.8) inset,
        0 28px 70px rgba(0, 0, 0, 0.45);
    max-width: 94vw;
    max-height: 92vh;
    overflow-y: auto;

    .lb-arrow {
        color: #8c8c8c;

        &:hover {
            color: var(--accent, #ff7a29);
        }
    }
}

.lb-panel-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.lb-eyebrow {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent, #ff7a29);
    margin-bottom: 8px;
}

.lb-grid-count {
    font-family: var(--font-display, inherit);
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.01em;
    text-transform: none;
    color: #111111;
    margin-bottom: 14px;
}

.lb-header-rule {
    display: block;
    width: 48px;
    height: 2px;
    background: var(--accent, #ff7a29);
}

.lb-grid-row {
    display: flex;
    align-items: center;
    gap: 18px;
}

.lb-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 380px));
    gap: 28px;
}

.lb-grid-tile {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e5e5e5;
    padding: 0;
    cursor: pointer;
    background: #f2f2f2;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition:
        border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    img,
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &:hover {
        border-color: var(--accent, #ff7a29);
        box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
        transform: translateY(-3px);

        img,
        video {
            transform: scale(1.04);
        }

        .lb-grid-scrim,
        .lb-grid-caption {
            opacity: 1;
        }
    }
}

.lb-page-prev,
.lb-page-next {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    transform: none;
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
}

.lb-page-count {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    letter-spacing: 0.03em;
    color: #8c8c8c;
}

.lb-grid-play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
}

.lb-grid-scrim {
    position: absolute;
    inset: auto 0 0 0;
    height: 55%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.lb-grid-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px 12px;
    font-size: 12.5px;
    color: #fff;
    text-align: left;
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.lb-stage {
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lb-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: calc(70vh + 2%);
    max-height: calc(70vh + 2%);
    padding: 20px;
    border-radius: 14px;
    border: 1px solid #e5e5e5;
    background: #ffffff;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

.lb-item-fade-enter-active,
.lb-item-fade-leave-active {
    transition: opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.lb-item-fade-enter-from,
.lb-item-fade-leave-to {
    opacity: 0;
}

.lb-media {
    height: 70vh;
    width: auto;
    border-radius: 8px;
    object-fit: contain;
}

.lb-media-iframe {
    aspect-ratio: 16 / 9;
    max-width: 88vw;
}

.lb-footer {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding-top: 18px;
}

.lb-caption-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    max-width: 90%;
}

.lb-caption {
    font-size: 14px;
    color: var(--color-white);
    text-align: center;
}

.lb-count {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    color: var(--color-white);
    white-space: nowrap;
}

.lb-filmstrip {
    display: flex;
    gap: 8px;
    max-width: 100%;
    overflow-x: auto;
    padding: 4px 2px 8px;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.lb-thumb {
    flex: 0 0 auto;
    width: 64px;
    height: 44px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid transparent;
    padding: 0;
    cursor: pointer;
    background: #1c1c1c;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b0b0b0;
    transition:
        opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        opacity: 0.85;
    }

    &.is-active {
        opacity: 1;
        border-color: var(--accent, #ff7a29);
    }
}

@media (max-width: 600px) {
    .lb-arrow {
        width: 44px;
        height: 44px;
    }

    .lb-arrow-prev {
        left: 2px;
    }

    .lb-arrow-next {
        right: 2px;
    }

    .lb-panel {
        gap: 14px;
        padding: 28px 20px;
    }

    .lb-grid-row {
        gap: 6px;
    }

    .lb-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    .lb-page-prev,
    .lb-page-next {
        width: 32px;
        height: 32px;
    }
}

@media (max-width: 400px) {
    .lb-panel {
        padding: 20px 14px;
    }
}

@media (max-height: 500px) and (orientation: landscape) {
    .lb-frame {
        max-width: 92vw;
        max-height: 85vh;
        padding: 12px;
    }

    .lb-media {
        height: auto;
        width: auto;
        max-height: 85vh;
        max-width: 88vw;
    }
}
</style>
