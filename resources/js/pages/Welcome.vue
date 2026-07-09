<template>
    <Head>
        <title>{{ profile.name }} — {{ profile.tagline }}</title>
        <meta name="description" :content="profile.intro" />
    </Head>

    <div :style="{ '--accent': profile.accent }" class="root">
        <SiteVideoBackground :src="profile.backgroundVideoUrl" />

        <SiteNav :name="profile.name" :on-home="true" />

        <main>
            <HeroSection :name="profile.name" :focus-tags="focusTags" />

            <AboutSection />

            <TimelineSection :items="experience" />

            <SkillsSection />

            <FeaturedGamesSection :games="featuredGames" />

            <FeaturedProjectSection :project="featuredProject" />

            <PortfolioCtaSection />

        </main>

        <SiteFooter />

        <SocialRail
            :github="profile.github"
            :linkedin="profile.linkedin"
            :email="profile.email"
        />
    </div>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AboutSection from '@/components/home/AboutSection.vue';
import FeaturedGamesSection from '@/components/home/FeaturedGamesSection.vue';
import FeaturedProjectSection from '@/components/home/FeaturedProjectSection.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import PortfolioCtaSection from '@/components/home/PortfolioCtaSection.vue';
import SkillsSection from '@/components/home/SkillsSection.vue';
import TimelineSection from '@/components/home/TimelineSection.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import SiteNav from '@/components/layout/SiteNav.vue';
import SiteVideoBackground from '@/components/layout/SiteVideoBackground.vue';
import SocialRail from '@/components/layout/SocialRail.vue';
import { experience, featuredGames, featuredProject, focusTags, profile } from '@/data/portfolio';
</script>

<style lang="scss" scoped>
.root {
    min-height: 100vh;
}
</style>
