import type { AboutStat, EducationItem, ExperienceItem, JobItem, RoadmapItem, SkillCategory } from '@/types/portfolio';

export const profile = {
    "name": "Brian Olthof",
    "tagline": "Software & Game engineering",
    "intro": "Building scalable gameplay systems, software tools, and interactive applications.",
    "accent": "#FF7A29",
    "email": "Brianolt@gmail.com",
    "github": "https://github.com/primtimed",
    "linkedin": "https://linkedin.com/in/brian-olthof-63789126a",
    "backgroundVideoUrl": "/videos/background.mp4",
    "photoUrl": "/storage/Image/Profile/Profile.png",
    "aboutEyebrow": "Software engineer specialized in gameplay systems",
    "aboutHeading": "My name is Brian Olthof, game developer.",
    "aboutCtaPrompt": "Are you interested in my work?",
    "aboutCtaLabel": "Contact me!",
    "aboutParagraphs": [
        "**Unity Developer** with **4 years of experience** building gameplay systems and tools in **C#** and **Unity**. Experienced in **object-oriented programming**, **gameplay mechanics**, **debugging**, and **version control**. Also skilled in **PHP (Laravel)**, **TypeScript**, and **Vue 3** through professional web development experience. Currently completing a **Bachelor's degree in Creative Media & Game Technologies** and seeking a **Junior Unity Developer** position where I can contribute to gameplay programming and continue growing as a game engineer."
    ]
};

export const aboutStats: AboutStat[] = [
    {
        "icon": "device",
        "value": "4+",
        "label": "YEARS EXPERIENCE"
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

export const roadmap: RoadmapItem[] = [];

export const focusTags: string[] = [];

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
                "name": "AI",
                "level": 4
            },
            {
                "name": "Input System",
                "level": 3
            },
            {
                "name": "Gameplay Engineering",
                "level": 3
            },
            {
                "name": "Physics",
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
        "title": "Tools",
        "icon": "code",
        "skills": [
            {
                "name": "Git",
                "level": 4
            },
            {
                "name": "JetBrains Rider",
                "level": 4
            },
            {
                "name": "Jira",
                "level": 3
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
                "level": 2
            }
        ]
    }
];

export const featuredGamesItchUrl = "#";

export const featuredProjectSlug = "momentum-fps";

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

export const resumeSummary: string[] = [
    "**Unity Developer** with **4 years of experience** building gameplay systems and tools in **C#** and **Unity**. Experienced in **object-oriented programming**, **gameplay mechanics**, **debugging**, and **version control**. Also skilled in **PHP (Laravel)**, **TypeScript**, and **Vue 3** through professional web development experience. Currently completing a **Bachelor's degree in Creative Media & Game Technologies** and seeking a **Junior Unity Developer** position where I can contribute to gameplay programming and continue growing as a game engineer."
];

export const resumeSkillCategories: SkillCategory[] = [
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
                "name": "AI",
                "level": 4
            },
            {
                "name": "Input System",
                "level": 3
            },
            {
                "name": "Gameplay Engineering",
                "level": 3
            },
            {
                "name": "Physics",
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
                "name": "Laravel",
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
        "title": "Tools",
        "icon": "code",
        "skills": [
            {
                "name": "Git",
                "level": 4
            },
            {
                "name": "JetBrains Rider",
                "level": 4
            },
            {
                "name": "Jira",
                "level": 3
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
                "level": 2
            }
        ]
    }
];

export const resumeInterests: string[] = [
    "Gaming",
    "Archery",
    "Summer terrace",
    "Anime / Series / Esport",
    "Music"
];

export const experience: ExperienceItem[] = [
    {
        "title": "Multiplayer Survival Game",
        "meta": null,
        "description": "- Developed player movement, inventory, crafting, and interaction systems.\n- Implemented multiplayer synchronization using Unity Netcode.\n- Optimized gameplay systems to improve performance and stability.",
        "tags": [
            "Unity",
            "C#",
            "Netcode for GameObjects"
        ]
    }
];

export const education: EducationItem[] = [
    {
        "title": "Creative Development (Game Engineer)",
        "institution": "Deltion Colage",
        "meta": "2022 - 2026",
        "description": "- Studied **Gameplay Programming** using **Unity** and **C#**.\n- Gained experience with **AI**, **Networking**, and **Computer Graphics**.\n- Developed complete game prototypes from concept to playable builds."
    },
    {
        "title": "Pastry chef",
        "institution": "Roc Van Twente",
        "meta": "2018 - 2021",
        "description": "- Learned professional baking and pastry techniques.\n- Worked under strict deadlines while maintaining quality standards.\n- Developed strong teamwork and communication skills."
    }
];

export const jobs: JobItem[] = [
    {
        "title": "Talentrush - Software development intern",
        "company": "Talentrush",
        "meta": "09/2025 - 07/2026",
        "description": "- Developed and maintained web applications using **PHP (Laravel)**, **Vue 3**, and **TypeScript**.\n- Built reusable frontend components and backend API endpoints.\n- Fixed bugs and implemented new features based on client requirements."
    },
    {
        "title": "Domino's - Shift Management",
        "company": "Domino's",
        "meta": "03/2021 – 09/2025",
        "description": "- Led daily operations and coordinated team members during busy shifts.\n- Trained new employees while maintaining high customer service standards.\n- Developed strong **leadership**, **communication**, and **problem-solving** skills in a fast-paced environment."
    }
];
