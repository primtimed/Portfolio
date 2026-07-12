import type { AboutStat, EducationItem, ExperienceItem, FeaturedGame, FeaturedProject, JobItem, SkillCategory } from '@/types/portfolio';

export const profile = {
    "name": "Brian Olthof",
    "tagline": "Software & Game engineering",
    "intro": "Building scalable gameplay systems, software tools, and interactive applications.",
    "accent": "#FF7A29",
    "email": "Brianolt@gmail.com",
    "github": "https://github.com/primtimed",
    "linkedin": "https://linkedin.com/in/brian-olthof-63789126a",
    "backgroundVideoUrl": "/videos/background.mp4",
    "photoUrl": "https://media.discordapp.net/attachments/1284942705453039646/1525644292205576313/file_000000008bc472469d8175fdf40961cc_1.png?ex=6a542278&is=6a52d0f8&hm=fd2bc50f600d95d9d406215387fd9f68c3ae446ae0947c3fb15d6356b6bf2ade&=&format=webp&quality=lossless&width=648&height=864",
    "aboutEyebrow": "Software engineer specialized in gameplay systems",
    "aboutHeading": "My name is Brian Olthof, game developer.",
    "aboutCtaPrompt": "Are you interested in my work?",
    "aboutCtaLabel": "Contact me!",
    "aboutParagraphs": [
        "Unity Developer with 4 years of experience in **C#** and **Unity**, specializing in gameplay systems and technical problem-solving. Additionally experienced in web application development using **PHP** (**Laravel**), **TypeScript** with **Vue 3**, and Blade templating. Currently pursuing a degree in Game Development and seeking a junior Unity developer position to contribute strong technical and creative skills."
    ]
};

export const aboutStats: AboutStat[] = [
    {
        "icon": "device",
        "value": "4+",
        "label": "Finished Projects"
    },
    {
        "icon": "controller",
        "value": "2",
        "label": "Game Prototypes"
    },
    {
        "icon": "package",
        "value": "3",
        "label": "Unity Packages"
    },
    {
        "icon": "trophy",
        "value": "1",
        "label": "Personal Milestone"
    }
];

export const focusTags: string[] = [
    "Gaming",
    "Archery",
    "Summer terrace",
    "Anime / Series / Esport",
    "Music"
];

export const skillCategories: SkillCategory[] = [
    {
        "title": "Gameplay Engineer",
        "icon": "gamepad",
        "skills": [
            {
                "name": "Unity",
                "level": 4
            },
            {
                "name": "C#",
                "level": 4
            },
            {
                "name": null,
                "level": 3
            }
        ]
    },
    {
        "title": "Web Engineer",
        "icon": "code",
        "skills": [
            {
                "name": "PHP",
                "level": 3
            },
            {
                "name": "Vue 3",
                "level": 3
            },
            {
                "name": "JavaScript / TypeScript",
                "level": 2
            }
        ]
    },
    {
        "title": "Languages",
        "icon": "code",
        "skills": [
            {
                "name": "Dutch",
                "level": 5
            },
            {
                "name": "English",
                "level": 4
            },
            {
                "name": "German",
                "level": 1
            }
        ]
    }
];

export const featuredGamesItchUrl = "#";

export const featuredGames: FeaturedGame[] = [
    {
        "title": "Momentum FPS",
        "tagline": "Multiplayer movement tech — wallrun, dash, grapple, slide.",
        "genre": "Multiplayer FPS",
        "engine": "Unity",
        "status": "Prototype",
        "image": "https://picsum.photos/seed/momentum-fps/600/900",
        "url": "#"
    },
    {
        "title": "Card Tactics AI",
        "tagline": "Card strategy game with an AI that adapts mid-match.",
        "genre": "Strategy",
        "engine": "Unity",
        "status": "Prototype",
        "image": "https://picsum.photos/seed/card-tactics-ai/600/900",
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "url": "#"
    },
    {
        "title": "Architecture Sandbox",
        "tagline": "Playable showcase of state machines and modular systems.",
        "genre": "Tech Demo",
        "engine": "Unity",
        "status": "In Development",
        "image": "https://picsum.photos/seed/architecture-sandbox/600/900",
        "url": "#"
    }
];

export const featuredProject: FeaturedProject = {
    "title": "Momentum FPS",
    "tagline": "Multiplayer movement tech — wallrun, dash, grapple, slide.",
    "description": "A multiplayer FPS prototype built around a custom momentum-driven movement system. Focused on server-authoritative networking, client-side prediction, and tuning movement feel so it stays responsive under real-world latency.",
    "image": "https://picsum.photos/seed/momentum-fps-spotlight/1200/800",
    "status": "Prototype",
    "url": "#",
    "sourceUrl": "#",
    "tags": [
        "Unity",
        "C#",
        "Netcode",
        "Multiplayer"
    ],
    "highlights": [
        "Server-authoritative movement with client-side prediction and reconciliation",
        "Wallrun, dash, grapple, and slide chained into a single momentum system",
        "Custom network tick loop tuned for low-latency multiplayer feel"
    ]
};

export const featuredProjectStats: AboutStat[] = [
    {
        "icon": "device",
        "value": "Unity",
        "label": "Engine"
    },
    {
        "icon": "controller",
        "value": "Multiplayer",
        "label": "Genre"
    },
    {
        "icon": "trophy",
        "value": "Prototype",
        "label": "Status"
    }
];

export const portfolioCta = {
    "eyebrow": "Software & Game engineering",
    "heading": "Check out my portfolio",
    "buttonLabel": "Portfolio",
    "buttonUrl": "/portfolio",
    "lines": [
        "Are you interested in knowing more about my profile and experience?",
        "Take a look at my portfolio!"
    ]
};

export const experience: ExperienceItem[] = [];

export const education: EducationItem[] = [
    {
        "title": "Creative Development (Game Engineer)",
        "institution": "Deltion Colage",
        "meta": "2022 - 2026",
        "description": "Description"
    },
    {
        "title": "Pastry chef",
        "institution": "Roc Van Twente",
        "meta": "2018 - 2021",
        "description": "Description"
    }
];

export const jobs: JobItem[] = [
    {
        "title": "Talentrush - Software development intern",
        "company": null,
        "meta": "09/2025 - 07/2026",
        "description": null
    },
    {
        "title": "Domino's - Shift Management",
        "company": null,
        "meta": "03/2021 – 09/2025",
        "description": null
    },
    {
        "title": "Van Otten - Pastry Chef",
        "company": null,
        "meta": "02/2019 – 03/2021",
        "description": null
    }
];
