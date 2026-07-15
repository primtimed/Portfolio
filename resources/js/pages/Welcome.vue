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

            <AboutSection :profile="profile" :stats="aboutStats" />

            <TimelineSection :items="roadmap" />

            <SkillsSection :categories="skillCategories" />

            <FeaturedGamesSection :games="projects" :itch-url="featuredGamesItchUrl" />

            <FeaturedProjectSection v-if="featuredProject" :project="featuredProject" :stats="featuredProjectStats" />

            <PortfolioCtaSection :cta="portfolioCta" />

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
import { computed } from 'vue';
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
import { useAdminPreviewOverrides, useAdminPreviewScrollTarget } from '@/composables/useAdminPreview';
import {
    aboutStats as baseAboutStats,
    featuredGamesItchUrl as baseFeaturedGamesItchUrl,
    featuredProjectSlug as baseFeaturedProjectSlug,
    featuredProjectStats as baseFeaturedProjectStats,
    focusTags as baseFocusTags,
    portfolioCta as basePortfolioCta,
    profile as baseProfile,
    roadmap as baseRoadmap,
    skillCategories as baseSkillCategories,
} from '@/data/portfolio';
import { projects, projectSlug } from '@/data/projects';
import type { AboutStat, RoadmapItem, SkillCategory } from '@/types/portfolio';

interface PortfolioMetaOverrides {
    profile: typeof baseProfile;
    aboutStats: AboutStat[];
    roadmap: RoadmapItem[];
    focusTags: string[];
    skillCategories: SkillCategory[];
    featuredGamesItchUrl: string;
    featuredProjectSlug: string;
    featuredProjectStats: AboutStat[];
    portfolioCta: typeof basePortfolioCta;
}

const overrides = useAdminPreviewOverrides<PortfolioMetaOverrides>('portfolio-meta');
useAdminPreviewScrollTarget();

const profile = computed(() => ({ ...baseProfile, ...overrides.profile }));
const aboutStats = computed(() => overrides.aboutStats ?? baseAboutStats);
const roadmap = computed(() => overrides.roadmap ?? baseRoadmap);
const focusTags = computed(() => overrides.focusTags ?? baseFocusTags);
const skillCategories = computed(() => overrides.skillCategories ?? baseSkillCategories);
const featuredGamesItchUrl = computed(() => overrides.featuredGamesItchUrl ?? baseFeaturedGamesItchUrl);
const featuredProjectSlug = computed(() => overrides.featuredProjectSlug ?? baseFeaturedProjectSlug);
const featuredProject = computed(
    () => projects.find((p) => projectSlug(p.title) === featuredProjectSlug.value) ?? projects[0],
);
const featuredProjectStats = computed(() => overrides.featuredProjectStats ?? baseFeaturedProjectStats);
const portfolioCta = computed(() => ({ ...basePortfolioCta, ...overrides.portfolioCta }));
</script>

<style lang="scss" scoped>
.root {
    min-height: 100vh;
}
</style>
