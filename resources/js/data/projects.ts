import type { Project } from '@/types/portfolio';

export function projectSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export const projects: Project[] = [
    {
        "title": "Momentum FPS",
        "tagline": "Multiplayer movement tech — wallrun, dash, grapple, slide.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "role": null,
        "genre": "Multiplayer FPS",
        "engine": "Unity",
        "status": "Prototype",
        "image": "/storage/Image/Profile/Profile.png",
        "backgroundVideoUrl": null,
        "tags": [],
        "highlights": [],
        "url": "#",
        "sourceUrl": null,
        "outcomes": [],
        "processSteps": [],
        "contributionsText": null,
        "media": [
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": null
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": "Wallrun chain."
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": null
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": "Client-side prediction reconciling a hard grapple redirect mid-air, tuned so the correction is invisible below ~120ms of simulated latency."
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": "Slide-to-dash cancel window."
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": null
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": "Debug overlay for the server-authoritative movement tick, showing the reconciliation buffer, input redundancy window, and per-client interpolation delay used to keep every peer's view of the match in sync."
            },
            {
                "type": "image",
                "src": "/storage/Image/Profile/Profile.png",
                "caption": null
            }
        ],
        "contributionsMedia": [
            {
                "type": "video",
                "src": "/videos/background.mp4",
                "caption": null
            }
        ]
    },
    {
        "title": "Card Tactics AI",
        "tagline": "Card strategy game with an AI that adapts mid-match.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Strategy",
        "engine": "Unity",
        "status": "Prototype",
        "image": "https://picsum.photos/seed/card-tactics-ai/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    },
    {
        "title": "Streaming Hub UI",
        "tagline": "TV-first, remote-navigable streaming hub interface.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Interactive UI",
        "engine": "Web",
        "status": "In Development",
        "image": "https://picsum.photos/seed/streaming-hub-ui/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    },
    {
        "title": "Roguelike Deckbuilder",
        "tagline": "Run-based card battler with synergy-driven deck building.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Roguelike",
        "engine": "Unity",
        "status": "Prototype",
        "image": "https://picsum.photos/seed/roguelike-deckbuilder/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    },
    {
        "title": "Gravity Shift",
        "tagline": "Puzzle platformer built around flipping gravity mid-jump.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Puzzle Platformer",
        "engine": "Unity",
        "status": "Prototype",
        "image": "https://picsum.photos/seed/gravity-shift/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    },
    {
        "title": "Neon Siege",
        "tagline": "Tower defense with procedurally generated enemy waves.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Tower Defense",
        "engine": "Unity",
        "status": "In Development",
        "image": "https://picsum.photos/seed/neon-siege/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    },
    {
        "title": "Cooperative Escape Room",
        "tagline": "Online co-op puzzle rooms for 2-4 players.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Co-op Puzzle",
        "engine": "Unity",
        "status": "Prototype",
        "image": "https://picsum.photos/seed/coop-escape-room/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    },
    {
        "title": "Architecture Sandbox",
        "tagline": "Playable showcase of state machines and modular systems.",
        "description": "[Placeholder — describe what this project is, why you built it, and what problem it solves.]",
        "genre": "Tech Demo",
        "engine": "Unity",
        "status": "In Development",
        "image": "https://picsum.photos/seed/architecture-sandbox/600/900",
        "tags": [],
        "highlights": [],
        "url": "#"
    }
];
