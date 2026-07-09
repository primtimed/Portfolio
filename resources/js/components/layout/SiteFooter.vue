<template>
    <footer class="site-footer">
        <div class="footer-top">
            <div class="footer-brand">
                <a href="/" class="footer-logo">
                    <span class="footer-wordmark">
                        <strong>{{ firstName }}</strong>
                        <span>{{ lastName }}</span></span
                    >
                </a>
                <p class="footer-tagline">{{ profile.intro }}</p>

                <div class="footer-socials">
                    <a
                        :href="profile.github"
                        class="footer-social-icon"
                        aria-label="GitHub"
                        title="GitHub"
                    >
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                            <path
                                d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z"
                            />
                        </svg>
                    </a>
                    <a
                        :href="profile.linkedin"
                        class="footer-social-icon"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                    >
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                            <path
                                d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3.38V21H3.5V8.75ZM9.75 8.75h3.24v1.68h.05c.45-.83 1.55-1.7 3.19-1.7 3.41 0 4.04 2.19 4.04 5.03V21h-3.38v-5.75c0-1.37-.02-3.14-1.94-3.14-1.95 0-2.25 1.5-2.25 3.05V21H9.75V8.75Z"
                            />
                        </svg>
                    </a>
                    <a
                        :href="`mailto:${profile.email}`"
                        class="footer-social-icon"
                        aria-label="Email"
                        title="Email"
                    >
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                            <path
                                d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.5 6.8-5.5H5.2ZM19 7.4l-6.53 5.28a1.5 1.5 0 0 1-1.88 0L4 7.4V18h15V7.4Z"
                            />
                        </svg>
                    </a>
                </div>
            </div>

            <nav class="footer-links-col">
                <h3 class="footer-col-title">Explore</h3>
                <a href="/#top">Home</a>
                <a href="/#about">About</a>
                <a href="/#games">Projects</a>
                <a href="/#featured-project">Spotlight</a>
            </nav>

            <nav class="footer-links-col">
                <h3 class="footer-col-title">Connect</h3>
                <a :href="profile.github" target="_blank" rel="noopener">GitHub</a>
                <a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
                <a :href="`mailto:${profile.email}`">Email</a>
                <a href="/portfolio">Portfolio</a>
            </nav>
        </div>

        <div class="footer-bottom">
            <span>© {{ year }} {{ profile.name }}. All rights reserved.</span>
            <span class="footer-credit">Built with Laravel &amp; Vue</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { profile } from '@/data/portfolio';

const year = new Date().getFullYear();

const firstName = computed(() => profile.name.split(' ')[0]?.toLowerCase() ?? '');
const lastName = computed(() => profile.name.split(' ').slice(1).join(' ').toLowerCase());
</script>

<style lang="scss" scoped>
.site-footer {
    position: relative;
    width: 100%;
    background: rgba(0, 0, 0, 0.72);
    border-top: 1px solid rgba(35, 47, 58, 1);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding: 70px 50px 32px;
}

.footer-top {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr);
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 48px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        gap: 36px;
    }
}

.footer-brand {
    max-width: 380px;
}

.footer-logo {
    text-decoration: none;
}

.footer-wordmark {
    font-size: 1.5rem;
    font-family: var(--font-display, inherit);

    strong {
        font-weight: 800;
        color: var(--color-white);
    }

    span {
        font-weight: 400;
        color: var(--text-dim);
    }
}

.footer-tagline {
    margin: 14px 0 20px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-white);
}

.footer-socials {
    display: flex;
    gap: 12px;
}

.footer-social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    color: var(--color-white);
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

.footer-links-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    a {
        color: var(--color-white);
        font-size: 14px;
        text-decoration: none;
        transition: color 0.15s;

        &:hover {
            color: var(--accent);
        }
    }
}

.footer-col-title {
    margin: 0 0 4px;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-faint);
}

.footer-bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-faint);
}
</style>
