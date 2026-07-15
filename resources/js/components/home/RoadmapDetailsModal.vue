<template>
    <Teleport to="body" :disabled="!mounted">
        <transition name="rm-fade">
            <div v-if="item" class="rm-overlay" role="dialog" aria-modal="true" @click.self="close">
                <div class="rm-panel">
                    <button type="button" class="rm-close" aria-label="Close" @click="close">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 5l14 14M19 5 5 19" stroke-linecap="round" />
                        </svg>
                    </button>

                    <div class="rm-scroll">
                        <h3 class="rm-title">{{ item.title }}</h3>
                        <span v-if="item.meta" class="rm-meta">{{ item.meta }}</span>
                        <span class="rm-rule" />

                        <p v-if="item.description" class="rm-intro" v-html="renderBold(item.description)"></p>
                        <div v-if="item.details" class="rm-details" v-html="renderRichText(item.details)"></div>

                        <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="rm-cta">View Project</a>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { renderBold, renderRichText } from '@/lib/richText';
import type { RoadmapItem } from '@/types/portfolio';

const props = defineProps<{ item: RoadmapItem | null }>();
const emit = defineEmits<{ close: [] }>();

const mounted = ref(false);

watch(
    () => props.item,
    (item) => {
        document.body.style.overflow = item ? 'hidden' : '';
    },
);

function close() {
    emit('close');
}

function onKeydown(e: KeyboardEvent) {
    if (props.item && e.key === 'Escape') close();
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
.rm-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: color-mix(in srgb, var(--color-black) 80%, transparent);
}

.rm-fade-enter-active,
.rm-fade-leave-active {
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.rm-fade-enter-from,
.rm-fade-leave-to {
    opacity: 0;
}

.rm-panel {
    position: relative;
    width: 100%;
    max-width: 720px;
    max-height: 86vh;
    border-radius: 16px;
    border: 1px solid #e5e5e5;
    background: #ffffff;
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.45);
    overflow: hidden;
}

.rm-close {
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: #111111;
    color: #ffffff;
    cursor: pointer;
    transition:
        background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        background: var(--accent, #ff7a29);
        transform: scale(1.05);
    }
}

.rm-scroll {
    max-height: 86vh;
    overflow-y: auto;
    padding: 40px 44px 44px;
}

.rm-title {
    margin: 0 0 4px;
    font-family: var(--font-display, inherit);
    font-size: clamp(22px, 3vw, 28px);
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #111111;
}

.rm-meta {
    display: block;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    color: #8c8c8c;
    margin-bottom: 16px;
}

.rm-rule {
    display: block;
    height: 0;
    border-top: 1px dashed #d0d0d0;
    margin-bottom: 22px;
}

.rm-intro {
    margin: 0 0 18px;
    font-size: 15px;
    line-height: 1.6;
    color: #333333;

    :deep(strong) {
        color: #111111;
        font-weight: 700;
    }
}

.rm-details {
    font-size: 14px;
    line-height: 1.6;
    color: #333333;

    :deep(h4) {
        margin: 20px 0 8px;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.02em;
        color: #111111;

        &:first-child {
            margin-top: 0;
        }
    }

    :deep(p) {
        margin: 0 0 10px;
    }

    :deep(ul) {
        margin: 0 0 10px;
        padding-left: 18px;
        list-style: disc;
    }

    :deep(li) {
        margin: 0 0 6px;
    }

    :deep(strong) {
        color: #111111;
        font-weight: 700;
    }
}

.rm-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 12px 24px;
    border-radius: 999px;
    background: #111111;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none;
    transition:
        background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        background: var(--accent, #ff7a29);
        transform: translateY(-1px);
    }
}

@media (max-width: 600px) {
    .rm-scroll {
        padding: 32px 24px 32px;
    }
}
</style>
