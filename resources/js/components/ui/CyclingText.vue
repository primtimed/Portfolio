<template>
    <span class="cycling-text"
        ><span class="accent-text">{{ displayed }}</span><span class="cycling-cursor"></span
        ><span v-if="suffix">{{ suffix }}</span></span
    >
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        words: string[];
        suffix?: string;
        typingSpeed?: number;
        deletingSpeed?: number;
        pauseTime?: number;
    }>(),
    {
        suffix: '',
        typingSpeed: 75,
        deletingSpeed: 40,
        pauseTime: 1600,
    },
);

const displayed = ref('');
let wordIndex = 0;
let charIndex = 0;
let timeoutId = 0;

function schedule(fn: () => void, delay: number) {
    timeoutId = window.setTimeout(fn, delay);
}

function tick() {
    const word = props.words[wordIndex] ?? '';
    const deleting = charIndex > word.length;

    if (!deleting) {
        charIndex += 1;
        displayed.value = word.slice(0, charIndex);
        if (charIndex === word.length) {
            schedule(startDeleting, props.pauseTime);
            return;
        }
        schedule(tick, props.typingSpeed);
        return;
    }
}

function startDeleting() {
    charIndex = props.words[wordIndex]?.length ?? 0;
    eraseTick();
}

function eraseTick() {
    const word = props.words[wordIndex] ?? '';
    charIndex -= 1;
    displayed.value = word.slice(0, Math.max(charIndex, 0));
    if (charIndex <= 0) {
        wordIndex = (wordIndex + 1) % props.words.length;
        schedule(tick, props.typingSpeed);
        return;
    }
    schedule(eraseTick, props.deletingSpeed);
}

onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || props.words.length === 0) {
        displayed.value = props.words[0] ?? '';
        return;
    }
    charIndex = 0;
    schedule(tick, props.typingSpeed);
});

onUnmounted(() => clearTimeout(timeoutId));
</script>

<style lang="scss" scoped>
.cycling-text {
    display: inline-block;
    min-width: 1ch;
}

.cycling-cursor {
    display: inline-block;
    width: 3px;
    height: 0.85em;
    background: var(--text);
    vertical-align: -0.12em;
    margin-left: 3px;
    animation: blink 0.9s step-end infinite;
}

@keyframes blink {
    0%,
    49% {
        opacity: 1;
    }
    50%,
    100% {
        opacity: 0;
    }
}
</style>
