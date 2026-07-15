export interface HobbyGalleryItem {
    type?: 'image' | 'video';
    image: string;
    caption: string;
}

export interface HobbyStat {
    label: string;
    value: string;
}

export interface Hobby {
    slug: string;
    title: string;
    tagline: string;
    heroImage: string;
    description: string[];
    stats: HobbyStat[];
    gallery: HobbyGalleryItem[];
}
