import type { Project } from '@/types/portfolio';

export function projectSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export const projects: Project[] = [];
