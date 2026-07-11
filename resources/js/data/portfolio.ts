import type { AboutStat, EducationItem, ExperienceItem, FeaturedGame, FeaturedProject, SkillCategory } from '@/types/portfolio';

export const profile = {
    "name": "Brian Olthof",
    "tagline": "Software & Game engineering",
    "intro": "Building scalable gameplay systems, software tools, and interactive applications.",
    "accent": "#FF7A29",
    "email": "hello@example.com",
    "github": "#",
    "linkedin": "#",
    "backgroundVideoUrl": "/videos/background.mp4",
    "photoUrl": "https://cdn.discordapp.com/attachments/1284942705453039646/1525644292205576313/file_000000008bc472469d8175fdf40961cc_1.png?ex=6a542278&is=6a52d0f8&hm=fd2bc50f600d95d9d406215387fd9f68c3ae446ae0947c3fb15d6356b6bf2ade&",
    "aboutEyebrow": "Software engineer specialized in gameplay systems",
    "aboutHeading": "My name is Brian Olthof, game developer.",
    "aboutCtaPrompt": "Are you interested in my work?",
    "aboutCtaLabel": "Contact me!",
    "aboutParagraphs": [
        "Specialized in **gameplay** and **systems**. Since 2020, I have been building interactive projects and tools in both **Unity** and **.NET**, some of them shared as prototypes on **itch.io** or as internal **Windows** tools, sharpening my skills as a **Software Engineer**.",
        "Currently focused on **personal projects** as a **Solo Developer**, shipping gameplay systems, AI-assisted tools, and interactive software while leveling up my **system design** and **networking** skills."
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
    "Gameplay systems",
    "AI tools",
    "Multiplayer systems",
    "Software architecture"
];

export const skillCategories: SkillCategory[] = [
    {
        "title": "Gameplay & Engines",
        "icon": "gamepad",
        "skills": [
            {
                "name": "Unity",
                "level": 5
            },
            {
                "name": "C#",
                "level": 5
            },
            {
                "name": "Gameplay Systems",
                "level": 4
            },
            {
                "name": "Animation & Physics",
                "level": 3
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

export const experience: ExperienceItem[] = [
    {
        "title": "Multiplayer FPS — Movement Systems",
        "meta": "Personal Project",
        "description": "Built a multiplayer FPS prototype with a custom momentum-driven movement system — wallrun, dash, grapple, slide.",
        "tags": [
            "Unity",
            "C#",
            "Netcode",
            "Multiplayer"
        ]
    }
];

export const education: EducationItem[] = [
    {
        "title": "213",
        "institution": "123123",
        "meta": "123123",
        "description": "123213123"
    }
];
