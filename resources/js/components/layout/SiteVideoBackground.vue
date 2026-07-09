<template>
    <div class="site-video-bg">
        <video
            v-if="src && !reducedMotion"
            class="site-video-bg-el"
            autoplay
            muted
            loop
            playsinline
            :src="src"
        ></video>
        <div class="site-video-scrim"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{ src: string }>();

const reducedMotion = ref(false);

onMounted(() => {
    reducedMotion.value = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;
});
</script>

<style lang="scss" scoped>
.site-video-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: var(--bg, #0a0f14);
}

.site-video-bg-el {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.site-video-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        rgba(10, 15, 20, 0.5) 0%,
        rgba(10, 15, 20, 0.82) 100%
    );
}
</style>
