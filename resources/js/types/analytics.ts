export interface PageView {
    id: string;
    page: string;
    country: string | null;
    referrer: string | null;
    viewedAt: string;
    durationMs: number | null;
}

export interface ResumeDownload {
    id: string;
    country: string | null;
    referrer: string | null;
    downloadedAt: string;
}
