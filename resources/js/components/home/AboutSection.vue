<template>
    <section id="about" class="about-section">
        <div class="about-layout">
            <div class="about-content">
                <RevealOnView variant="left" class="about-stats">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="about-stat"
                    >
                        <span class="about-stat-icon">
                            <svg
                                v-if="stat.icon === 'device'"
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <rect
                                    x="7"
                                    y="2"
                                    width="10"
                                    height="20"
                                    rx="2"
                                />
                                <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
                            </svg>
                            <svg
                                v-else-if="stat.icon === 'controller'"
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path d="M6 9h2m-1-1v2m7-1h.01M17 10h.01" />
                                <path
                                    d="M7.5 6h9A4.5 4.5 0 0 1 21 10.5v4a3 3 0 0 1-5.4 1.8L14 14h-4l-1.6 2.3A3 3 0 0 1 3 14.5v-4A4.5 4.5 0 0 1 7.5 6Z"
                                />
                            </svg>
                            <svg
                                v-else-if="stat.icon === 'package'"
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" />
                                <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
                                <path d="M12 12v9" />
                            </svg>
                            <svg
                                v-else
                                viewBox="0 0 24 24"
                                width="26"
                                height="26"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
                                <path
                                    d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4"
                                />
                                <path d="M12 13v3m-3 4h6m-3-4v4" />
                            </svg>
                        </span>
                        <div class="about-stat-value">{{ stat.value }}</div>
                        <div class="about-stat-label">{{ stat.label }}</div>
                    </div>
                </RevealOnView>

                <RevealOnView variant="right" class="about-main">
                    <div class="about-eyebrow">{{ profile.aboutEyebrow }}</div>
                    <h2 class="about-heading">{{ profile.aboutHeading }}</h2>
                    <div class="about-body">
                        <p
                            v-for="(para, i) in profile.aboutParagraphs"
                            :key="i"
                            v-html="renderBold(para)"
                        ></p>
                    </div>

                    <div class="about-brandmark">
                        <span class="about-brandmark-text"
                            ><strong>{{ firstName }}</strong
                            ><span>{{ lastName }}</span></span
                        >
                    </div>

                    <p class="about-cta-prompt">{{ profile.aboutCtaPrompt }}</p>
                    <a :href="`mailto:${profile.email}`" class="about-cta-btn">
                        <svg
                            viewBox="0 0 24 24"
                            width="15"
                            height="15"
                            fill="currentColor"
                        >
                            <path
                                d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.5 6.8-5.5H5.2ZM19 7.4l-6.53 5.28a1.5 1.5 0 0 1-1.88 0L4 7.4V18h15V7.4Z"
                            />
                        </svg>
                        {{ profile.aboutCtaLabel }}
                    </a>
                </RevealOnView>
            </div>

            <div class="about-media">
                <svg
                    class="about-media-illustration"
                    viewBox="0 0 120 120"
                    fill="none"
                >
                    <circle
                        cx="60"
                        cy="60"
                        r="58"
                        stroke="currentColor"
                        stroke-width="1.5"
                        opacity="0.3"
                    />
                    <circle
                        cx="60"
                        cy="46"
                        r="20"
                        stroke="currentColor"
                        stroke-width="1.5"
                    />
                    <path
                        d="M22 104c4-24 18-36 38-36s34 12 38 36"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
                <span class="about-media-caption">add your photo here</span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RevealOnView from '@/components/ui/RevealOnView.vue';
import { aboutStats, profile } from '@/data/portfolio';

const stats = aboutStats;

const firstName = computed(
    () => profile.name.split(' ')[0]?.toLowerCase() ?? '',
);
const lastName = computed(() =>
    profile.name.split(' ').slice(1).join(' ').toLowerCase(),
);

function renderBold(text: string) {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
</script>

<style lang="scss" scoped>
.about-section {
    --bg: #ffffff;
    --bg-sunken: #f2f2f2;
    --bg-hover: #ececec;
    --border: #e5e5e5;
    --border-strong: #d0d0d0;
    --text: #111111;
    --text-dim: #595959;
    --text-faint: #8c8c8c;

    width: 100%;
    min-height: 100vh;
    display: flex;
    background: var(--bg);
    color: var(--text);
}

.about-layout {
    flex: 1 1 auto;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(200px, 750px);
    align-items: stretch;
}

.about-content {
    display: flex;
    gap: 40px;
    align-items: stretch;
    align-self: center;
    margin-left: 15rem;
    margin-right: 5rem;
}

.about-stats {
    flex: 0 0 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-right: 40px;
    border-right: 1px solid var(--border);
}

.about-stat {
    text-align: center;
}

.about-stat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-faint);
    margin-bottom: 10px;
}

.about-stat-value {
    font-family: var(--font-display, inherit);
    font-size: 28px;
    font-weight: 800;
    color: var(--accent);
}

.about-stat-label {
    margin-top: 4px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-faint);
    line-height: 1.4;
}

.about-main {
    flex: 1 1 auto;
    min-width: 0;
    text-align: center;
}

.about-eyebrow {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 14px;
}

.about-heading {
    margin: 0 auto 24px;
    max-width: 720px;
    font-family: var(--font-display, inherit);
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    line-height: 1.2;
}

.about-body {
    font-size: 16px;
    line-height: 1.75;
    color: var(--text-dim);

    p {
        margin: 0 0 18px;
    }

    :deep(strong) {
        color: var(--text);
        font-weight: 700;
    }
}

.about-brandmark {
    margin: 20px 0 24px;
}

.about-brandmark-text {
    font-family: var(--font-display, inherit);
    font-size: 1.4rem;
    text-transform: lowercase;

    strong {
        font-weight: 800;
        color: var(--accent);
    }

    span {
        font-weight: 400;
        color: var(--text);
    }
}

.about-cta-prompt {
    margin: 0 0 16px;
    font-size: 15px;
    color: var(--text-dim);
}

.about-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 26px;
    border-radius: 10px;
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition:
        border-color 0.15s,
        background 0.15s;

    &:hover {
        border-color: var(--accent);
        background: var(--bg-hover);
    }
}

.about-media {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 480px;
    overflow: hidden;
    border-left: 1px solid var(--border);
    background-color: var(--bg-sunken);
    background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 26px 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    @media (max-width: 860px) {
        min-height: 320px;
        border-left: none;
        border-top: 1px solid var(--border);
    }
}

.about-media-illustration {
    width: 96px;
    height: 96px;
    color: var(--text-faint);
}

.about-media-caption {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    color: var(--text-faint);
}
</style>
