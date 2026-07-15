import type { Hobby } from '@/types/hobby';

export const hobbies: Hobby[] = [
    {
        "slug": "gaming",
        "title": "Gaming",
        "tagline": "First play it. Then understand. Then rebuild.",
        "heroImage": "https://picsum.photos/seed/hobby-homelab-hero/1800/1000",
        "gallery": [],
        "description": [
            "I enjoy gaming because it allows me to **relax, have fun with friends, and explore new worlds**. It is a way to clear my mind while also challenging myself to improve my skills.",
            "I started gaming on the **PlayStation 4 with Star Wars Battlefront**. Before that, I played games like **GTA 5, Call of Duty: Black Ops 2, Farming Simulator, The Sims 2000, and Brothers in Arms** with friends and family. Over time, I became more interested in **competitive shooter games** like **Apex Legends, Rainbow Six Siege, Overwatch, and older Call of Duty games**.",
            "Gaming is not only about playing; I am also interested in **how games are made and how they work behind the scenes**. Learning how developers create systems, fix bugs, and build games is one of the reasons I started my study.",
            "I started on **PlayStation 4**, but after discovering games like **Rust**, I switched to **PC gaming** with a **mouse and keyboard**. For me, gaming combines **fun, technology, creativity, and learning**, which makes it a hobby I really enjoy."
        ],
        "stats": [
            {
                "label": "Since",
                "value": "2013"
            },
            {
                "label": "Console VS pc",
                "value": "PC"
            },
            {
                "label": "Genre",
                "value": "FPS shooters"
            }
        ]
    },
    {
        "slug": "homelab-project",
        "title": "Home-lab projects",
        "tagline": "Making my own problems so I can solve them.",
        "heroImage": "https://picsum.photos/seed/hobby-homelab-hero/1800/1000",
        "description": [
            "A rack of secondhand servers in the closet that host everything from media to personal projects. What started as a way to avoid subscription fees turned into an ongoing excuse to tinker with infrastructure outside of work.",
            "Runs on a small cluster with containerized services, automated backups, and probably more monitoring dashboards than are strictly necessary."
        ],
        "stats": [
            {
                "label": "Running since",
                "value": "2025"
            },
            {
                "label": "Setup",
                "value": "3-node cluster"
            },
            {
                "label": "Uptime goal",
                "value": "99.9%"
            }
        ],
        "gallery": [
            {
                "type": "image",
                "image": "https://picsum.photos/seed/hobby-lab-1/900/1100",
                "caption": "Placeholder caption"
            },
            {
                "type": "image",
                "image": "https://picsum.photos/seed/hobby-lab-2/900/1100",
                "caption": "Placeholder caption"
            },
            {
                "type": "image",
                "image": "https://picsum.photos/seed/hobby-lab-3/900/1100",
                "caption": "Placeholder caption"
            }
        ]
    },
    {
        "slug": "archery",
        "title": "Archery",
        "tagline": "First, I aim. Then, I adjust. Then, I hit.",
        "heroImage": "https://picsum.photos/seed/hobby-homelab-hero/1800/1000",
        "description": [],
        "gallery": [],
        "stats": [
            {
                "label": "Shooting since",
                "value": "2019"
            },
            {
                "label": "Type",
                "value": "Compount"
            }
        ]
    }
];
