<template>
    <component
        :is="as"
        ref="el"
        class="reveal"
        :class="[variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : '', { 'reveal-visible': visible }]"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

withDefaults(defineProps<{ as?: string; variant?: 'up' | 'left' | 'right' }>(), { as: 'div', variant: 'up' });

const el = ref<HTMLElement | null>(null);
const visible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
    if (!el.value) return;
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visible.value = true;
                    observer?.disconnect();
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<style lang="scss" scoped>
.reveal {
    opacity: 0;
    transform: translateY(22px);
    transition:
        opacity 0.7s ease,
        transform 0.7s ease;

    &.reveal-left {
        transform: translate(-28px, 0);
    }
    &.reveal-right {
        transform: translate(28px, 0);
    }
    &.reveal-visible {
        opacity: 1;
        transform: translate(0, 0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .reveal {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
</style>
