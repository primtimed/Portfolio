<template>
    <div class="site-video-bg">
        <iframe
            v-if="embedUrl && !reducedMotion"
            :key="embedUrl"
            class="site-video-bg-el site-video-bg-iframe"
            :src="embedUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            title=""
        ></iframe>
        <img
            v-else-if="isImage"
            :key="src"
            class="site-video-bg-el"
            :src="src"
            alt=""
        />
        <video
            v-else-if="src && !reducedMotion"
            :key="src"
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
import { computed, onMounted, ref } from 'vue';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

const props = defineProps<{ src: string }>();

const reducedMotion = ref(false);

const embedUrl = computed(() =>
    getYoutubeEmbedUrl(props.src, { autoplay: true, mute: true, loop: true, controls: false }),
);

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

const isImage = computed(() => {
    const path = props.src?.split(/[?#]/)[0].toLowerCase() ?? '';

    return IMAGE_EXTENSIONS.some((ext) => path.endsWith(ext));
});

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

.site-video-bg-iframe {
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 56.25vw; /* 16:9 */
    min-height: 100vh;
    min-width: 177.78vh; /* 16:9 */
    transform: translate(-50%, -50%);
    pointer-events: none;
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
