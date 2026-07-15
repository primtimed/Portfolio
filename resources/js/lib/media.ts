const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v', '.ogv'];

function pathOf(url: string | null | undefined): string {
    return url?.split(/[?#]/)[0].toLowerCase() ?? '';
}

export function isImageUrl(url: string | null | undefined): boolean {
    const path = pathOf(url);

    return IMAGE_EXTENSIONS.some((ext) => path.endsWith(ext));
}

export function isVideoFileUrl(url: string | null | undefined): boolean {
    const path = pathOf(url);

    return VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext));
}
