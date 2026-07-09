import type { Hobby } from '@/types/hobby';

export const hobbies: Hobby[] = [
    {
        slug: 'photography',
        title: 'Photography',
        tagline: 'Chasing light, framing moments.',
        heroImage: 'https://picsum.photos/seed/hobby-photography-hero/1800/1000',
        description: [
            'Picked up a camera as a way to slow down outside of screens and code editors. What started as a way to document trips turned into a habit of paying closer attention to light, framing, and timing.',
            'Mostly shooting street scenes and landscapes on a mirrorless body with a couple of primes, editing everything myself, and treating each shoot as a small side project rather than a chase for the perfect shot.',
        ],
        stats: [
            { label: 'Shooting since', value: '2019' },
            { label: 'Go-to gear', value: 'Mirrorless + 35mm' },
            { label: 'Favorite subject', value: 'Street & landscape' },
        ],
        gallery: [
            { image: 'https://picsum.photos/seed/hobby-photo-1/900/1100', caption: 'Placeholder caption' },
            { image: 'https://picsum.photos/seed/hobby-photo-2/900/1100', caption: 'Placeholder caption' },
            { image: 'https://picsum.photos/seed/hobby-photo-3/900/1100', caption: 'Placeholder caption' },
            { image: 'https://picsum.photos/seed/hobby-photo-4/900/1100', caption: 'Placeholder caption' },
            { image: 'https://picsum.photos/seed/hobby-photo-5/900/1100', caption: 'Placeholder caption' },
            { image: 'https://picsum.photos/seed/hobby-photo-6/900/1100', caption: 'Placeholder caption' },
        ],
    },
];
