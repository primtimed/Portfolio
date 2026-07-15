import type {
    AboutStat,
    EducationItem,
    ExperienceItem,
    JobItem,
    RoadmapItem,
    SkillCategory,
} from '@/types/portfolio';

export interface Profile {
    name: string;
    tagline: string;
    intro: string;
    accent: string;
    email: string;
    github: string;
    linkedin: string;
    backgroundVideoUrl: string;
    photoUrl: string;
    aboutEyebrow: string;
    aboutHeading: string;
    aboutParagraphs: string[];
    aboutCtaPrompt: string;
    aboutCtaLabel: string;
}

export interface PortfolioCta {
    eyebrow: string;
    heading: string;
    lines: string[];
    buttonLabel: string;
    buttonUrl: string;
}

export interface PortfolioMeta {
    profile: Profile;
    aboutStats: AboutStat[];
    roadmap: RoadmapItem[];
    focusTags: string[];
    skillCategories: SkillCategory[];
    featuredGamesItchUrl: string;
    featuredProjectSlug: string;
    featuredProjectStats: AboutStat[];
    portfolioCta: PortfolioCta;
    resumeSummary: string[];
    resumeSkillCategories: SkillCategory[];
    resumeInterests: string[];
    experience: ExperienceItem[];
    education: EducationItem[];
    jobs: JobItem[];
}
