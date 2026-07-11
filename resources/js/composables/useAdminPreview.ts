import type { Ref } from 'vue';
import { onBeforeUnmount, onMounted, reactive, watch } from 'vue';

const PREVIEW_SOURCE = 'portfolio-admin-preview';

interface PreviewMessage {
    source: typeof PREVIEW_SOURCE;
    scope?: string;
    type?: 'ready' | 'scroll-to';
    data?: Record<string, unknown>;
    target?: string;
}

/**
 * True only for the public page loaded inside an admin editor's preview iframe
 * (same-origin, `?admin_preview=1`, and actually embedded — never for real visitors).
 */
export function isAdminPreviewFrame(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.self !== window.top && new URLSearchParams(window.location.search).has('admin_preview');
}

/**
 * Child side: used by the public page rendered inside the preview iframe. Returns a
 * reactive partial-override object that the admin editor keeps in sync via postMessage,
 * so the page can render `override.field ?? baseData.field` and update as the admin types.
 */
export function useAdminPreviewOverrides<T extends object>(scope: string): Partial<T> {
    const overrides = reactive({}) as Partial<T>;

    if (!isAdminPreviewFrame()) {
        return overrides;
    }

    function handleMessage(event: MessageEvent) {
        if (event.origin !== window.location.origin) {
            return;
        }

        const message = event.data as PreviewMessage | undefined;

        if (!message || message.source !== PREVIEW_SOURCE || message.scope !== scope || !message.data) {
            return;
        }

        Object.assign(overrides, message.data);
    }

    onMounted(() => {
        window.addEventListener('message', handleMessage);
        window.parent.postMessage({ source: PREVIEW_SOURCE, scope, type: 'ready' } satisfies PreviewMessage, window.location.origin);
    });

    onBeforeUnmount(() => window.removeEventListener('message', handleMessage));

    return overrides;
}

/**
 * Child side: used by the public page rendered inside the preview iframe. Scrolls the
 * page to whichever section the admin is currently editing, so the preview follows
 * along instead of requiring the admin to hunt for the right spot themselves.
 */
export function useAdminPreviewScrollTarget(): void {
    if (!isAdminPreviewFrame()) {
        return;
    }

    function handleMessage(event: MessageEvent) {
        if (event.origin !== window.location.origin) {
            return;
        }

        const message = event.data as PreviewMessage | undefined;

        if (message?.source !== PREVIEW_SOURCE || message.type !== 'scroll-to' || !message.target) {
            return;
        }

        document.querySelector(message.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    onMounted(() => window.addEventListener('message', handleMessage));
    onBeforeUnmount(() => window.removeEventListener('message', handleMessage));
}

/**
 * Parent side: used by admin editor forms. Pushes the current draft into the given
 * preview iframe whenever it changes, re-sending once the child page announces it's
 * mounted and ready (avoids the race where the iframe hasn't booted its Vue app yet).
 */
export function useAdminPreviewPublisher(scope: string, frame: Ref<HTMLIFrameElement | null | undefined>, getData: () => Record<string, unknown>): void {
    let childReady = false;

    function send() {
        const target = frame.value?.contentWindow;

        if (!target) {
            return;
        }

        // Draft data comes from a reactive Inertia form; postMessage's structured
        // clone can't handle Vue's reactive proxies, so round-trip through JSON first.
        const data = JSON.parse(JSON.stringify(getData())) as Record<string, unknown>;

        target.postMessage({ source: PREVIEW_SOURCE, scope, data } satisfies PreviewMessage, window.location.origin);
    }

    function handleMessage(event: MessageEvent) {
        if (event.origin !== window.location.origin) {
            return;
        }

        const message = event.data as PreviewMessage | undefined;

        if (message?.source === PREVIEW_SOURCE && message.scope === scope && message.type === 'ready') {
            childReady = true;
            send();
        }
    }

    onMounted(() => {
        window.addEventListener('message', handleMessage);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('message', handleMessage);
    });

    watch(getData, () => {
        if (childReady) {
            send();
        }
    }, { deep: true });
}

/**
 * Parent side: used by admin editor forms. Watches for focus entering a field inside a
 * `[data-preview-target]` section and tells the preview iframe to scroll there, so the
 * admin can see what they're editing without hunting for it in the preview themselves.
 */
export function useAdminPreviewScrollSync(frame: Ref<HTMLIFrameElement | null | undefined>): void {
    function handleFocusIn(event: FocusEvent) {
        const origin = event.target instanceof HTMLElement ? event.target : null;
        const section = origin?.closest<HTMLElement>('[data-preview-target]');
        const selector = section?.dataset.previewTarget;
        const target = frame.value?.contentWindow;

        if (!selector || !target) {
            return;
        }

        target.postMessage({ source: PREVIEW_SOURCE, type: 'scroll-to', target: selector } satisfies PreviewMessage, window.location.origin);
    }

    onMounted(() => document.addEventListener('focusin', handleFocusIn));
    onBeforeUnmount(() => document.removeEventListener('focusin', handleFocusIn));
}
