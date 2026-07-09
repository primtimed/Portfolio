import type { AboutStat, ExperienceItem, FeaturedGame, FeaturedProject, Project, SkillCategory } from '@/types/portfolio';

export const profile = {
    name: 'Brian Olthof',
    tagline: 'Software & Game engineering',
    intro: 'Building scalable gameplay systems, software tools, and interactive applications.',
    accent: '#FF7A29',
    email: 'hello@example.com',
    github: '#',
    linkedin: '#',
    backgroundVideoUrl: '/videos/background.mp4',
    aboutEyebrow: 'Software engineer specialized in gameplay systems',
    aboutHeading: 'My name is Brian Olthof, game developer.',
    aboutParagraphs: [
        'Specialized in **gameplay** and **systems**. Since 2020, I have been building interactive projects and tools in both **Unity** and **.NET**, some of them shared as prototypes on **itch.io** or as internal **Windows** tools, sharpening my skills as a **Software Engineer**.',
        'Currently focused on **personal projects** as a **Solo Developer**, shipping gameplay systems, AI-assisted tools, and interactive software while leveling up my **system design** and **networking** skills.',
    ],
    aboutCtaPrompt: 'Are you interested in my work?',
    aboutCtaLabel: 'Contact me!',
};

export const aboutStats: AboutStat[] = [
    { icon: 'device', value: '4+', label: 'Finished Projects' },
    { icon: 'controller', value: '2', label: 'Game Prototypes' },
    { icon: 'package', value: '3', label: 'Unity Packages' },
    { icon: 'trophy', value: '1', label: 'Personal Milestone' },
];

export const focusTags = [
    'Gameplay systems',
    'AI tools',
    'Multiplayer systems',
    'Software architecture',
];

export const skillCategories: SkillCategory[] = [
    {
        title: 'Gameplay & Engines',
        icon: 'gamepad',
        skills: [
            { name: 'Unity', level: 5 },
            { name: 'C#', level: 5 },
            { name: 'Gameplay Systems', level: 4 },
            { name: 'Animation & Physics', level: 3 },
        ],
    },
    {
        title: 'Software Engineering',
        icon: 'code',
        skills: [
            { name: '.NET', level: 4 },
            { name: 'TypeScript', level: 4 },
            { name: 'Laravel / PHP', level: 3 },
            { name: 'Vue', level: 3 },
        ],
    },
    {
        title: 'Systems & Networking',
        icon: 'network',
        skills: [
            { name: 'Multiplayer Netcode', level: 4 },
            { name: 'Client-Server Architecture', level: 4 },
            { name: 'System Design', level: 3 },
            { name: 'Databases', level: 3 },
        ],
    },
    {
        title: 'Tools & Workflow',
        icon: 'tools',
        skills: [
            { name: 'Git', level: 5 },
            { name: 'AI-Assisted Tooling', level: 4 },
            { name: 'Windows Tooling', level: 4 },
            { name: 'CI/CD', level: 2 },
        ],
    },
];

export const featuredGamesItchUrl = '#';

export const featuredGames: FeaturedGame[] = [
    {
        title: 'Momentum FPS',
        tagline: 'Multiplayer movement tech — wallrun, dash, grapple, slide.',
        genre: 'Multiplayer FPS',
        engine: 'Unity',
        status: 'Prototype',
        image: 'https://picsum.photos/seed/momentum-fps/600/900',
        url: '#',
    },
    {
        title: 'Card Tactics AI',
        tagline: 'Card strategy game with an AI that adapts mid-match.',
        genre: 'Strategy',
        engine: 'Unity',
        status: 'Prototype',
        image: 'https://picsum.photos/seed/card-tactics-ai/600/900',
        url: '#',
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/600/900',
        url: '#',
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/600/900',
        url: '#',
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/600/900',
        url: '#',
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/600/900',
        url: '#',
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/600/900',
        url: '#',
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/600/900',
        url: '#',
    },
    {
        title: 'Architecture Sandbox',
        tagline: 'Playable showcase of state machines and modular systems.',
        genre: 'Tech Demo',
        engine: 'Unity',
        status: 'In Development',
        image: 'https://picsum.photos/seed/architecture-sandbox/600/900',
        url: '#',
    },
];

export const featuredProject: FeaturedProject = {
    title: 'Momentum FPS',
    tagline: 'Multiplayer movement tech — wallrun, dash, grapple, slide.',
    description:
        'A multiplayer FPS prototype built around a custom momentum-driven movement system. Focused on server-authoritative networking, client-side prediction, and tuning movement feel so it stays responsive under real-world latency.',
    image: 'https://picsum.photos/seed/momentum-fps-spotlight/1200/800',
    status: 'Prototype',
    tags: ['Unity', 'C#', 'Netcode', 'Multiplayer'],
    highlights: [
        'Server-authoritative movement with client-side prediction and reconciliation',
        'Wallrun, dash, grapple, and slide chained into a single momentum system',
        'Custom network tick loop tuned for low-latency multiplayer feel',
    ],
    url: '#',
    sourceUrl: '#',
};

export const featuredProjectStats: AboutStat[] = [
    { icon: 'device', value: 'Unity', label: 'Engine' },
    { icon: 'controller', value: 'Multiplayer', label: 'Genre' },
    { icon: 'trophy', value: 'Prototype', label: 'Status' },
];

export const projects: Project[] = [
    {
        title: 'Momentum FPS',
        tagline: 'Multiplayer movement tech — wallrun, dash, grapple, slide.',
        description:
            'A multiplayer FPS prototype built around a custom momentum-driven movement system. Focused on server-authoritative networking, client-side prediction, and tuning movement feel so it stays responsive under real-world latency.',
        genre: 'Multiplayer FPS',
        engine: 'Unity',
        status: 'Prototype',
        image: 'https://picsum.photos/seed/momentum-fps/800/1000',
        tags: ['Unity', 'C#', 'Netcode', 'Multiplayer'],
        highlights: [
            'Server-authoritative movement with client-side prediction and reconciliation',
            'Wallrun, dash, grapple, and slide chained into a single momentum system',
            'Custom network tick loop tuned for low-latency multiplayer feel',
        ],
        url: '#',
        sourceUrl: '#',
        media: [
            { type: 'image', src: 'https://picsum.photos/seed/momentum-fps/800/1000', caption: 'Momentum FPS — cover art' },
            {
                type: 'video',
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                caption: 'Gameplay clip (sample video)',
            },
            { type: 'image', src: 'https://picsum.photos/seed/momentum-fps-wallrun/1200/800', caption: 'Wallrun chained into a dash' },
            { type: 'image', src: 'https://picsum.photos/seed/momentum-fps-netcode/1200/800', caption: 'Client-side prediction debug view' },
            { type: 'image', src: 'https://picsum.photos/seed/momentum-fps-grapple/1200/800', caption: 'Grapple + slide combo' },
            { type: 'image', src: 'https://picsum.photos/seed/momentum-fps-map/1200/800', caption: 'Map greybox pass' },
            { type: 'image', src: 'https://picsum.photos/seed/momentum-fps-hud/1200/800', caption: 'HUD and movement readout' },
        ],
    },
    {
        title: 'Card Tactics AI',
        tagline: 'Card strategy game with an AI that adapts mid-match.',
        description:
            'A card-based strategy prototype where the opposing AI profiles the player\'s deck and playstyle as the match unfolds, adjusting its own strategy instead of following a fixed script.',
        genre: 'Strategy',
        engine: 'Unity',
        status: 'Prototype',
        image: 'https://picsum.photos/seed/card-tactics-ai/800/1000',
        tags: ['Unity', 'C#', 'AI', 'Card Game'],
        highlights: [
            'Adaptive AI that profiles player behavior mid-match',
            'Deck and turn system built around modular card effects',
            'Difficulty scales dynamically instead of static tiers',
        ],
        url: '#',
        sourceUrl: '#',
        media: [
            { type: 'image', src: 'https://picsum.photos/seed/card-tactics-ai/800/1000', caption: 'Card Tactics AI — cover art' },
            { type: 'image', src: 'https://picsum.photos/seed/card-tactics-board/1200/800', caption: 'Match board mid-turn' },
            { type: 'image', src: 'https://picsum.photos/seed/card-tactics-ai-profile/1200/800', caption: 'AI playstyle profiling view' },
            { type: 'image', src: 'https://picsum.photos/seed/card-tactics-deck/1200/800', caption: 'Deck builder screen' },
            { type: 'image', src: 'https://picsum.photos/seed/card-tactics-effects/1200/800', caption: 'Modular card effect stack' },
        ],
    },
    {
        title: 'Streaming Hub UI',
        tagline: 'TV-first, remote-navigable streaming hub interface.',
        description:
            'A web-based streaming hub UI designed to be fully navigable from a TV remote or gamepad — large focus states, predictable spatial navigation, and no reliance on a mouse or touch input.',
        genre: 'Interactive UI',
        engine: 'Web',
        status: 'In Development',
        image: 'https://picsum.photos/seed/streaming-hub-ui/800/1000',
        tags: ['Vue', 'TypeScript', 'TV UI'],
        highlights: [
            'Full remote/gamepad spatial navigation, no mouse required',
            'Focus-driven UI with large, TV-safe interaction targets',
            'Row-based content browsing modeled on console dashboards',
        ],
        url: '#',
        sourceUrl: '#',
        media: [
            { type: 'image', src: 'https://picsum.photos/seed/streaming-hub-ui/800/1000', caption: 'Streaming Hub UI — cover art' },
            { type: 'image', src: 'https://picsum.photos/seed/streaming-hub-rows/1200/800', caption: 'Row-based content browsing' },
            { type: 'image', src: 'https://picsum.photos/seed/streaming-hub-focus/1200/800', caption: 'TV-safe focus states' },
            { type: 'image', src: 'https://picsum.photos/seed/streaming-hub-remote/1200/800', caption: 'Remote navigation overlay' },
            { type: 'image', src: 'https://picsum.photos/seed/streaming-hub-detail/1200/800', caption: 'Title detail panel' },
        ],
    },
    {
        title: 'Architecture Sandbox',
        tagline: 'Playable showcase of state machines and modular systems.',
        description:
            'A tech-demo sandbox built to showcase clean, scalable Unity architecture — modular state machines, component-based systems, and patterns meant to be dropped into other projects.',
        genre: 'Tech Demo',
        engine: 'Unity',
        status: 'In Development',
        image: 'https://picsum.photos/seed/architecture-sandbox/800/1000',
        tags: ['Unity', 'C#', 'Architecture'],
        highlights: [
            'Modular state machines shared across multiple gameplay systems',
            'Component-based architecture built for reuse across projects',
            'Playable scenes demonstrating each pattern in isolation',
        ],
        url: '#',
        sourceUrl: '#',
        media: [
            { type: 'image', src: 'https://picsum.photos/seed/architecture-sandbox/800/1000', caption: 'Architecture Sandbox — cover art' },
            { type: 'image', src: 'https://picsum.photos/seed/architecture-sandbox-fsm/1200/800', caption: 'State machine visualizer' },
            { type: 'image', src: 'https://picsum.photos/seed/architecture-sandbox-demo/1200/800', caption: 'Playable pattern demo scene' },
            { type: 'image', src: 'https://picsum.photos/seed/architecture-sandbox-components/1200/800', caption: 'Component composition view' },
            { type: 'image', src: 'https://picsum.photos/seed/architecture-sandbox-scenes/1200/800', caption: 'Scene selection menu' },
        ],
    },
];

export const portfolioCta = {
    eyebrow: profile.tagline,
    heading: 'Check out my portfolio',
    lines: [
        'Are you interested in knowing more about my profile and experience?',
        'Take a look at my portfolio!',
    ],
    buttonLabel: 'Portfolio',
    buttonUrl: '/portfolio',
};

export const experience: ExperienceItem[] = [
    {
        title: 'Multiplayer FPS — Movement Systems',
        meta: 'Personal Project',
        description:
            'Built a multiplayer FPS prototype with a custom momentum-driven movement system — wallrun, dash, grapple, slide.',
        tags: ['Unity', 'C#', 'Netcode', 'Multiplayer'],
    },
    {
        title: 'AI Windows Tool',
        meta: 'Personal Project',
        description:
            'Developed an AI-assisted Windows tool system in C# with safe, auditable, undoable actions.',
        tags: ['C#', 'AI-Assisted Tooling', 'Windows Tooling'],
    },
    {
        title: 'Card Strategy Game — Adaptive AI',
        meta: 'Personal Project',
        description:
            'Designed a card-based strategy game with adaptive AI logic that profiles player behavior mid-match.',
        tags: ['Unity', 'C#', 'AI', 'Card Game'],
    },
    {
        title: 'Streaming Hub UI',
        meta: 'Personal Project',
        description:
            'Created a web-based, remote-navigable streaming hub UI system built for TV-first browsing.',
        tags: ['Vue', 'TypeScript', 'TV UI'],
    },
    {
        title: 'Unity Architecture Patterns',
        meta: 'Ongoing',
        description:
            'Implemented scalable Unity architecture patterns — state machines, modular, component-based systems.',
        tags: ['Unity', 'C#', 'Architecture'],
    },
];
