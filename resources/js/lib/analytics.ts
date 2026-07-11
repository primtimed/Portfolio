import { router } from '@inertiajs/vue3';

let currentViewId: string | null = null;
let viewStartedAt = 0;

function closeCurrentView(): void {
    if (!currentViewId) {
        return;
    }

    const durationMs = Math.round(performance.now() - viewStartedAt);
    const payload = new Blob([JSON.stringify({ durationMs })], {
        type: 'application/json',
    });
    navigator.sendBeacon(`/analytics/view/${currentViewId}/duration`, payload);

    currentViewId = null;
}

function openView(page: string): void {
    viewStartedAt = performance.now();

    fetch('/analytics/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ page, referrer: document.referrer || null }),
    })
        .then((response) => response.json())
        .then((data: { id: string }) => {
            currentViewId = data.id;
        })
        .catch(() => {});
}

/**
 * "project" and "hobbies/Hobby" are single shared components rendered for every
 * project/hobby (only the "slug" prop differs), so the raw component name alone
 * can't tell them apart in the analytics breakdown. Fold the slug in so each
 * project/hobby gets its own row instead of all sharing one.
 */
function pageKey(component: string, props: Record<string, unknown>): string {
    const slug = typeof props.slug === 'string' ? props.slug : null;

    if (slug && component === 'project') {
        return `project/${slug}`;
    }

    if (slug && component === 'hobbies/Hobby') {
        return `hobby/${slug}`;
    }

    return component;
}

/**
 * Logs a resume PDF export/download, so the admin analytics dashboard can show
 * how many visitors actually download the resume rather than just view the page.
 */
export function recordResumeDownload(): void {
    if (typeof window === 'undefined') {
        return;
    }

    fetch('/analytics/resume-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ referrer: document.referrer || null }),
    }).catch(() => {});
}

/**
 * Logs a page view (and how long it lasted) for every public page visit, so the
 * admin analytics dashboard has real traffic data. Admin pages are excluded since
 * they're the site owner, not a visitor.
 */
export function trackPageViews(): void {
    if (typeof window === 'undefined') {
        return;
    }

    router.on('navigate', (event) => {
        closeCurrentView();

        const { component, props } = event.detail.page;

        if (component.startsWith('admin/')) {
            return;
        }

        openView(pageKey(component, props));
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            closeCurrentView();
        }
    });
}
