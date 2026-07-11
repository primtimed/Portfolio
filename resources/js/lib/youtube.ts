export function getYoutubeVideoId(url: string): string | null {
    if (!url) return null;

    let parsed: URL;
    try {
        parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://example.com');
    } catch {
        return null;
    }

    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
        return parsed.pathname.slice(1).split('/')[0] || null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
        if (parsed.pathname === '/watch') {
            return parsed.searchParams.get('v');
        }

        const match = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/);
        if (match) return match[1];
    }

    return null;
}

export function isYoutubeUrl(url: string): boolean {
    return getYoutubeVideoId(url) !== null;
}

export function getYoutubeEmbedUrl(
    url: string,
    opts: { autoplay?: boolean; mute?: boolean; loop?: boolean; controls?: boolean } = {},
): string | null {
    const id = getYoutubeVideoId(url);
    if (!id) return null;

    const params = new URLSearchParams({
        autoplay: opts.autoplay ? '1' : '0',
        mute: opts.mute ? '1' : '0',
        controls: opts.controls === false ? '0' : '1',
        playsinline: '1',
        rel: '0',
        modestbranding: '1',
        iv_load_policy: '3',
    });

    if (opts.loop) {
        params.set('loop', '1');
        params.set('playlist', id);
    }

    return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function getYoutubeThumbnailUrl(url: string): string | null {
    const id = getYoutubeVideoId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
