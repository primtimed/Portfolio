export interface AboutStat {
    icon: 'device' | 'controller' | 'package' | 'trophy';
    value: string;
    label: string;
}

export interface ExperienceItem {
    title: string;
    meta: string;
    description: string;
    tags?: string[];
}

export interface FeaturedGame {
    title: string;
    tagline: string;
    genre: string;
    engine: string;
    status: 'Prototype' | 'In Development' | 'Released';
    image: string;
    url: string;
}

export interface FeaturedProject {
    title: string;
    tagline: string;
    description: string;
    image: string;
    status: 'Prototype' | 'In Development' | 'Released';
    tags: string[];
    highlights: string[];
    url: string;
    sourceUrl?: string;
}

export interface Skill {
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
}

export interface SkillCategory {
    title: string;
    icon: 'code' | 'gamepad' | 'network' | 'tools';
    skills: Skill[];
}

export interface ProjectMediaItem {
    type: 'image' | 'video';
    src: string;
    caption?: string;
}

export interface ProjectStat {
    label: string;
    value: string;
}

export interface ProjectProcessStep {
    title: string;
    description: string;
}

export interface Project {
    title: string;
    tagline: string;
    description: string;
    role?: string;
    genre: string;
    engine: string;
    status: 'Prototype' | 'In Development' | 'Released';
    image: string;
    backgroundVideoUrl?: string;
    tags: string[];
    highlights: string[];
    url: string;
    sourceUrl?: string;
    media?: ProjectMediaItem[];
    outcomes?: ProjectStat[];
    processSteps?: ProjectProcessStep[];
}
