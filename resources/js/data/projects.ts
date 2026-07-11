import type { Project } from '@/types/portfolio';

export function projectSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export const projects: Project[] = [
    {
        "title": "123",
        "tagline": "123",
        "description": "123",
        "role": "123",
        "genre": "123",
        "engine": "123",
        "status": "Prototype",
        "image": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
        "backgroundVideoUrl": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
        "tags": [],
        "highlights": [],
        "url": null,
        "sourceUrl": null,
        "processSteps": [],
        "media": [
            {
                "type": "image",
                "src": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
                "caption": "123"
            },
            {
                "type": "image",
                "src": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
                "caption": null
            },
            {
                "type": "image",
                "src": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
                "caption": null
            },
            {
                "type": "image",
                "src": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
                "caption": null
            },
            {
                "type": "image",
                "src": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
                "caption": null
            },
            {
                "type": "image",
                "src": "https://cdn.discordapp.com/attachments/1284942705453039646/1521641545827352607/file_00000000eb0071f4a8edb88e75140392_1.png?ex=6a54131f&is=6a52c19f&hm=10b23d24ea47c258b15161233c0d12f8dacef3e1e34d9b0aa1a08b02067f398c&",
                "caption": null
            }
        ],
        "outcomes": [
            {
                "label": null,
                "value": null
            }
        ]
    }
];
