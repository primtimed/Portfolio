import { createInertiaApp } from '@inertiajs/vue3';
import { trackPageViews } from '@/lib/analytics';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

trackPageViews();

createInertiaApp({
    title: (title) => title || appName,
    progress: {
        color: '#4B5563',
    },
});
