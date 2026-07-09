<template>
    <div class="social-rail">
        <a
            :href="github"
            class="social-rail-icon"
            aria-label="GitHub"
            title="GitHub"
        >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path
                    d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z"
                />
            </svg>
        </a>
        <a
            :href="linkedin"
            class="social-rail-icon"
            aria-label="LinkedIn"
            title="LinkedIn"
        >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path
                    d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3.38V21H3.5V8.75ZM9.75 8.75h3.24v1.68h.05c.45-.83 1.55-1.7 3.19-1.7 3.41 0 4.04 2.19 4.04 5.03V21h-3.38v-5.75c0-1.37-.02-3.14-1.94-3.14-1.95 0-2.25 1.5-2.25 3.05V21H9.75V8.75Z"
                />
            </svg>
        </a>
        <a
            :href="`mailto:${email}`"
            class="social-rail-icon"
            aria-label="Email"
            title="Email"
        >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path
                    d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.5 6.8-5.5H5.2ZM19 7.4l-6.53 5.28a1.5 1.5 0 0 1-1.88 0L4 7.4V18h15V7.4Z"
                />
            </svg>
        </a>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    github: string;
    linkedin: string;
    email: string;
}>();
</script>

<style lang="scss" scoped>
.social-rail {
    position: fixed;
    right: 22px;
    bottom: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding-bottom: 18px;

    @media (max-width: 700px) {
        display: none;
    }
}

.social-rail-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--bg-sunken);
    border: 1px solid #ffffff;
    color: #ffffff;
    transition:
        color 0.15s,
        border-color 0.15s,
        transform 0.15s;

    &:hover {
        color: var(--accent);
        border-color: var(--accent);
        transform: translateY(-2px);
    }
}
</style>
