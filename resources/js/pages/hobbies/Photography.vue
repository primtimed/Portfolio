<template>
    <Head>
        <title>{{ hobby.title }} — {{ profile.name }}</title>
        <meta name="description" :content="hobby.tagline" />
    </Head>

    <div :style="{ '--accent': profile.accent }" class="root hb-root">
        <SiteNav :name="profile.name" />

        <main class="hb-main">
            <section class="hb-hero" :style="{ backgroundImage: `url(${hobby.heroImage})` }">
                <div class="hb-hero-scrim" />
                <div class="hb-hero-content">
                    <a href="/#top" class="hb-hero-back">← Back home</a>
                    <span class="hb-hero-eyebrow">Hobby</span>
                    <h1 class="hb-hero-title">{{ hobby.title }}</h1>
                    <p class="hb-hero-tagline">{{ hobby.tagline }}</p>
                </div>
            </section>

            <section class="hb-intro">
                <RevealOnView variant="up" class="hb-intro-text">
                    <p v-for="(para, i) in hobby.description" :key="i">{{ para }}</p>
                </RevealOnView>

                <RevealOnView variant="up" class="hb-stats">
                    <div v-for="stat in hobby.stats" :key="stat.label" class="hb-stat">
                        <span class="hb-stat-value">{{ stat.value }}</span>
                        <span class="hb-stat-label">{{ stat.label }}</span>
                    </div>
                </RevealOnView>
            </section>

            <section class="hb-gallery">
                <RevealOnView
                    v-for="item in hobby.gallery"
                    :key="item.image"
                    variant="up"
                    class="hb-gallery-item"
                >
                    <img :src="item.image" :alt="item.caption" loading="lazy" />
                    <span class="hb-gallery-caption">{{ item.caption }}</span>
                </RevealOnView>
            </section>
        </main>

        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import RevealOnView from '@/components/ui/RevealOnView.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteNav from '@/components/layout/SiteNav.vue';
import { hobbies } from '@/data/hobbies';
import { profile } from '@/data/portfolio';

const hobby = hobbies.find((h) => h.slug === 'photography')!;
</script>

<style lang="scss" scoped>
.hb-root {
    --bg: #ffffff;
    --bg-sunken: #f2f2f2;
    --bg-hover: #ececec;
    --border: #e5e5e5;
    --border-strong: #d0d0d0;
    --text: #111111;
    --text-dim: #595959;
    --text-faint: #8c8c8c;

    min-height: 100vh;
    background: var(--bg);
}

.hb-hero {
    position: relative;
    height: 62vh;
    min-height: 420px;
    display: flex;
    align-items: flex-end;
    background-size: cover;
    background-position: center;
}

.hb-hero-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.92) 100%);
}

.hb-hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px 56px;
}

.hb-hero-back {
    display: inline-block;
    margin-bottom: 18px;
    color: var(--color-white);
    font-size: 14px;
    text-decoration: none;

    &:hover {
        color: var(--accent);
    }
}

.hb-hero-eyebrow {
    display: block;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
}

.hb-hero-title {
    margin: 0 0 12px;
    font-family: var(--font-display, inherit);
    font-weight: 800;
    text-transform: uppercase;
    font-size: clamp(38px, 6vw, 76px);
    line-height: 1;
    color: var(--color-white);
}

.hb-hero-tagline {
    margin: 0;
    max-width: 560px;
    font-size: clamp(15px, 1.6vw, 19px);
    color: var(--color-white);
}

.hb-intro {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 32px;
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(220px, 1fr);
    gap: 56px;

    @media (max-width: 780px) {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 56px 24px;
    }
}

.hb-intro-text {
    font-size: 16px;
    line-height: 1.75;
    color: var(--text-dim);

    p {
        margin: 0 0 18px;
    }
}

.hb-stats {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding-left: 40px;
    border-left: 1px solid var(--border);

    @media (max-width: 780px) {
        padding-left: 0;
        border-left: none;
        border-top: 1px solid var(--border);
        padding-top: 24px;
        flex-direction: row;
        flex-wrap: wrap;
    }
}

.hb-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.hb-stat-value {
    font-family: var(--font-display, inherit);
    font-size: 20px;
    font-weight: 800;
    color: var(--text);
}

.hb-stat-label {
    font-size: 12px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-faint);
}

.hb-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
        padding: 0 24px 64px;
    }
}

.hb-gallery-item {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 4 / 5;
    background: var(--bg-sunken);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &:hover img {
        transform: scale(1.05);
    }
}

.hb-gallery-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-white);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, transparent 100%);
}
</style>
