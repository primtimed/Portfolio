<template>
    <Head>
        <title>{{ hobby.title }} — {{ profile.name }}</title>
        <meta name="description" :content="hobby.tagline" />
    </Head>

    <div class="cs-root root" :style="{ '--accent': profile.accent }">
        <SiteNav :name="profile.name" />

        <!-- HERO -->
        <header class="cs-hero" :style="{ backgroundImage: `url(${hobby.heroImage})` }">
            <div class="cs-hero-scrim" />
            <div class="cs-hero-inner">
                <a href="/#top" class="cs-back-link">&larr; Back home</a>
                <div class="cs-eyebrow">Hobby</div>
                <h1 class="cs-hero-title">{{ hobby.title }}</h1>
                <p class="cs-hero-tagline">{{ hobby.tagline }}</p>
            </div>
        </header>

        <!-- META STRIP -->
        <section class="cs-meta-strip">
            <div v-for="stat in hobby.stats" :key="stat.label" class="cs-meta-item">
                <div class="cs-meta-label">{{ stat.label }}</div>
                <div class="cs-meta-value">{{ stat.value }}</div>
            </div>
        </section>

        <!-- OVERVIEW -->
        <section class="cs-overview">
            <div class="cs-overview-inner">
                <div>
                    <div class="cs-eyebrow">About</div>
                    <h2 class="cs-h2">The Story</h2>
                    <p v-for="(para, i) in hobby.description" :key="i" class="cs-body">{{ para }}</p>
                </div>
                <div v-if="overviewImage" class="cs-overview-media">
                    <img :src="overviewImage" :alt="`${hobby.title} overview`" loading="lazy" />
                </div>
            </div>
        </section>

        <!-- GALLERY -->
        <section v-if="hobby.gallery.length" class="cs-gallery">
            <div class="cs-gallery-inner">
                <div class="cs-section-heading">
                    <div class="cs-eyebrow">Gallery</div>
                    <h2 class="cs-h2">Selected Shots</h2>
                </div>
                <div class="cs-gallery-row cs-gallery-row-2">
                    <div v-for="item in hobby.gallery.slice(0, 2)" :key="item.image" class="cs-gallery-tile cs-gallery-tile-wide">
                        <img :src="item.image" :alt="item.caption" loading="lazy" />
                    </div>
                </div>
                <div v-if="hobby.gallery.length > 2" class="cs-gallery-row cs-gallery-row-3">
                    <div v-for="item in hobby.gallery.slice(2, 5)" :key="item.image" class="cs-gallery-tile">
                        <img :src="item.image" :alt="item.caption" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>

        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteNav from '@/components/layout/SiteNav.vue';
import { hobbies } from '@/data/hobbies';
import { profile } from '@/data/portfolio';

const props = defineProps<{ slug: string }>();

const hobby = hobbies.find((h) => h.slug === props.slug) ?? hobbies[0];
const overviewImage = hobby.gallery[0]?.image;
</script>

<style lang="scss" scoped>
.cs-root {
    --cs-cream: #f7f3ec;
    --cs-dark: #1c1a17;
    --cs-dark-2: #14120f;
    --cs-accent: #e2733a;
    --cs-accent-hover: #c85f2b;
    --cs-ink: #1c1a17;
    --cs-body: #4a453f;
    --cs-muted: #8a8078;
    --cs-inverse-dim: #b8afa5;
    --cs-border-light: #e5ddd0;
    --cs-border-dark: #2e2a25;
    --cs-border-dark-2: #3a342c;
    --cs-border-dark-3: #4a423a;

    position: relative;
    font-family: 'Inter', sans-serif;
    color: var(--cs-ink);
    min-height: 100vh;
}

/* ── hero ───────────────────────────────────────────────────────────── */
.cs-hero {
    position: relative;
    background-size: cover;
    background-position: center;
    padding: 172px 64px 90px;
    overflow: hidden;

    @media (max-width: 760px) {
        padding: 140px 24px 60px;
    }
}

.cs-hero-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(28, 26, 23, 0.35) 0%, rgba(28, 26, 23, 0.6) 55%, rgba(28, 26, 23, 0.92) 100%);
}

.cs-hero-inner {
    max-width: 980px;
    position: relative;
    z-index: 2;
}

.cs-back-link {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    color: var(--cs-inverse-dim);
    letter-spacing: 0.5px;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
        color: var(--cs-accent);
    }
}

.cs-eyebrow {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--cs-accent);
    text-transform: uppercase;
}

.cs-hero .cs-eyebrow {
    margin-top: 28px;
}

.cs-hero-title {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(38px, 7vw, 76px);
    line-height: 1.02;
    color: #fff;
    margin: 18px 0 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.cs-hero-tagline {
    margin: 22px 0 0;
    max-width: 560px;
    font-size: clamp(15px, 1.6vw, 19px);
    color: rgba(255, 255, 255, 0.85);
}

/* ── meta strip ─────────────────────────────────────────────────────── */
.cs-meta-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--cs-border-light);
    background: #fff;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
}

.cs-meta-item {
    padding: 30px 40px;
    border-right: 1px solid var(--cs-border-light);
    text-align: center;

    &:last-child {
        border-right: none;
    }
}

.cs-meta-label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    color: var(--cs-muted);
    text-transform: uppercase;
}

.cs-meta-value {
    font-family: 'Archivo Black', sans-serif;
    font-size: 18px;
    color: var(--cs-ink);
    margin-top: 8px;
    text-transform: uppercase;
}

/* ── overview ───────────────────────────────────────────────────────── */
.cs-overview {
    width: 100%;
    background: var(--cs-cream);
}

.cs-overview-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 110px 64px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    align-items: center;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding: 64px 24px;
        gap: 40px;
    }
}

.cs-h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(28px, 3.6vw, 42px);
    margin: 16px 0 24px;
    text-transform: uppercase;
    line-height: 1.1;
}

.cs-body {
    font-size: 17px;
    line-height: 1.7;
    color: var(--cs-body);
    margin: 0 0 18px;

    &:last-child {
        margin-bottom: 0;
    }
}

.cs-overview-media {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(28, 26, 23, 0.12);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

/* ── gallery ────────────────────────────────────────────────────────── */
.cs-gallery {
    width: 100%;
    background: var(--cs-cream);
}

.cs-gallery-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 64px 110px;

    @media (max-width: 700px) {
        padding: 0 24px 64px;
    }
}

.cs-section-heading {
    max-width: 900px;
    margin: 0 auto 60px;
    text-align: center;
}

.cs-gallery-row {
    display: grid;
    gap: 24px;
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
}

.cs-gallery-row-2 {
    grid-template-columns: 1.4fr 1fr;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
}

.cs-gallery-row-3 {
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
}

.cs-gallery-tile {
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(28, 26, 23, 0.1);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.cs-gallery-tile-wide {
    aspect-ratio: 16 / 10;

    &:nth-child(2) {
        aspect-ratio: 4 / 5;
    }
}
</style>
