<template>
    <Head>
        <title>Resume — {{ profile.name }}</title>
        <meta name="description" :content="`${profile.name}'s resume — experience, skills, and background.`" />
    </Head>

    <div :style="{ '--accent': profile.accent }" class="rs-root">
        <div class="rs-frame">
            <button type="button" class="rs-download-btn" :disabled="isExporting" @click="downloadPdf">
                {{ isExporting ? 'Preparing…' : 'Download PDF' }}
            </button>

            <div ref="pageEl" class="rs-page">
                <div class="rs-main">
                    <header class="rs-header">
                        <h1 class="rs-name"><strong>{{ firstName }}</strong> <span class="rs-name-accent">{{ lastName }}</span></h1>
                        <p class="rs-role">{{ profile.tagline }}</p>

                        <div class="rs-contact-list">
                            <a :href="`mailto:${profile.email}`" class="rs-contact-link">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                                    <path
                                        d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.5 6.8-5.5H5.2ZM19 7.4l-6.53 5.28a1.5 1.5 0 0 1-1.88 0L4 7.4V18h15V7.4Z"
                                    />
                                </svg>
                                {{ profile.email }}
                            </a>
                            <a :href="profile.github" target="_blank" rel="noopener" class="rs-contact-link">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                                    <path
                                        d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z"
                                    />
                                </svg>
                                {{ profile.name }}
                            </a>
                            <a :href="profile.linkedin" target="_blank" rel="noopener" class="rs-contact-link">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                                    <path
                                        d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3.38V21H3.5V8.75ZM9.75 8.75h3.24v1.68h.05c.45-.83 1.55-1.7 3.19-1.7 3.41 0 4.04 2.19 4.04 5.03V21h-3.38v-5.75c0-1.37-.02-3.14-1.94-3.14-1.95 0-2.25 1.5-2.25 3.05V21H9.75V8.75Z"
                                    />
                                </svg>
                                {{ profile.name }}
                            </a>
                        </div>

                        <span class="rs-header-rule" />
                    </header>

                    <section class="rs-section">
                        <h2 class="rs-heading">Summary</h2>
                        <div class="rs-summary">
                            <p v-for="(para, i) in profile.aboutParagraphs" :key="i" v-html="renderBold(para)"></p>
                        </div>
                    </section>

                    <section class="rs-section">
                        <h2 class="rs-heading">Projects</h2>
                        <div class="rs-proj-list">
                            <div v-for="item in experience" :key="item.title" class="rs-proj-item">
                                <div class="rs-proj-row">
                                    <h3 class="rs-proj-title">{{ item.title }}</h3>
                                    <span class="rs-proj-meta">{{ item.meta }}</span>
                                </div>
                                <p class="rs-proj-desc">{{ item.description }}</p>
                                <p v-if="item.tags?.length" class="rs-proj-tags">Tech: {{ item.tags.join(', ') }}</p>
                            </div>
                        </div>
                    </section>

                    <section class="rs-section">
                        <h2 class="rs-heading">Education</h2>
                        <div v-if="education.length === 0" class="rs-edu-placeholder">Add your education here</div>
                        <div v-else class="rs-proj-list">
                            <div v-for="item in education" :key="item.title" class="rs-proj-item">
                                <div class="rs-proj-row">
                                    <h3 class="rs-proj-title">{{ item.title }}</h3>
                                    <span class="rs-proj-meta">{{ item.meta }}</span>
                                </div>
                                <p v-if="item.institution" class="rs-proj-tags">{{ item.institution }}</p>
                                <p class="rs-proj-desc">{{ item.description }}</p>
                            </div>
                        </div>
                    </section>
                </div>

                <aside class="rs-sidebar">
                    <div class="rs-photo">
                        <img v-if="profile.photoUrl" :src="profile.photoUrl" :alt="profile.name" class="rs-photo-img" />
                        <template v-else>
                            <svg class="rs-photo-icon" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="58" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
                                <circle cx="60" cy="46" r="20" stroke="currentColor" stroke-width="1.5" />
                                <path d="M22 104c4-24 18-36 38-36s34 12 38 36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            <span class="rs-photo-caption">add photo</span>
                        </template>
                    </div>

                    <div class="rs-sidebar-section">
                        <h2 class="rs-sidebar-heading">Skills</h2>
                        <div v-for="category in skillCategories" :key="category.title" class="rs-sidebar-skill-group">
                            <span class="rs-sidebar-skill-cat">{{ category.title }}</span>
                            <div v-for="skill in category.skills" :key="skill.name" class="rs-sidebar-skill-row">
                                <span class="rs-sidebar-skill-name">{{ skill.name }}</span>
                                <span class="rs-dots" :aria-label="`${skill.name}: ${skill.level} out of 5`">
                                    <span v-for="n in 5" :key="n" class="rs-dot" :class="{ 'is-filled': n <= skill.level }" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="rs-sidebar-section">
                        <h2 class="rs-sidebar-heading">Interests</h2>
                        <ul class="rs-interest-list">
                            <li v-for="tag in focusTags" :key="tag">{{ tag }}</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { useAdminPreviewOverrides, useAdminPreviewScrollTarget } from '@/composables/useAdminPreview';
import {
    education as baseEducation,
    experience as baseExperience,
    focusTags as baseFocusTags,
    profile as baseProfile,
    skillCategories as baseSkillCategories,
} from '@/data/portfolio';
import { recordResumeDownload } from '@/lib/analytics';
import type { PortfolioMeta } from '@/types/admin';

const overrides = useAdminPreviewOverrides<Pick<PortfolioMeta, 'profile' | 'experience' | 'focusTags' | 'skillCategories' | 'education'>>('portfolio-meta');
useAdminPreviewScrollTarget();

const profile = computed(() => overrides.profile ?? baseProfile);
const experience = computed(() => overrides.experience ?? baseExperience);
const focusTags = computed(() => overrides.focusTags ?? baseFocusTags);
const skillCategories = computed(() => overrides.skillCategories ?? baseSkillCategories);
const education = computed(() => overrides.education ?? baseEducation);

const firstName = computed(() => profile.value.name.split(' ')[0]);
const lastName = computed(() => profile.value.name.split(' ').slice(1).join(' '));

const pageEl = ref<HTMLElement | null>(null);
const isExporting = ref(false);

function renderBold(text: string) {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

async function downloadPdf() {
    if (!pageEl.value || isExporting.value) return;

    isExporting.value = true;
    try {
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);

        await document.fonts.ready;

        const canvas = await html2canvas(pageEl.value, {
            scale: 2,
            backgroundColor: '#ffffff',
            useCORS: true,
        });

        const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${profile.value.name.replace(/\s+/g, '-')}-Resume.pdf`);
        recordResumeDownload();
    } finally {
        isExporting.value = false;
    }
}
</script>

<style lang="scss" scoped>
.rs-root {
    --bg: #ffffff;
    --bg-sunken: #f7f7f8;
    --border: #e5e5e5;
    --border-strong: #d0d0d0;
    --text: #111111;
    --text-dim: #444444;
    --text-faint: #767676;
    --page-tray: #e6e6e8;
    --sidebar-bg: #141416;
    --sidebar-text: #f2f2f2;
    --sidebar-text-dim: #b0b0b0;
    --sidebar-border: #2c2c2e;

    min-height: 100vh;
    background: var(--page-tray);
    color: var(--text);
    padding: 48px 24px;
}

.rs-frame {
    position: relative;
    width: 210mm;
    max-width: 100%;
    margin: 0 auto;
}

.rs-page {
    display: flex;
    min-height: 297mm;
    background: var(--bg);
    border: 1px solid var(--border-strong);

    @media (max-width: 720px) {
        flex-direction: column;
    }
}

.rs-main {
    flex: 1 1 auto;
    min-width: 0;
    padding: 42px 36px 36px;
}

.rs-sidebar {
    flex: 0 0 240px;
    padding: 56px 26px 40px;
    background: var(--sidebar-bg);
    color: var(--sidebar-text);

    @media (max-width: 720px) {
        flex: 1 1 auto;
    }
}

.rs-download-btn {
    position: absolute;
    top: 56px;
    right: 40px;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--accent);
    background: rgba(255, 122, 41, 0.08);
    color: var(--accent);
    font-family: inherit;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
        background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover:not(:disabled) {
        background: var(--accent);
        color: var(--accent-ink, #1a0e05);
    }

    &:disabled {
        cursor: default;
        opacity: 0.6;
    }

    @media (max-width: 640px) {
        position: static;
        display: inline-flex;
        margin-bottom: 24px;
    }
}

.rs-name {
    margin: 0 0 2px;
    font-family: var(--font-display, inherit);
    font-size: 27px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--text);
}

.rs-name-accent {
    color: var(--accent);
}

.rs-role {
    margin: 0 0 10px;
    font-size: 13.5px;
    color: var(--text-dim);
}

.rs-contact-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0 0 12px;
}

.rs-contact-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--text-faint);
    font-size: 12px;
    text-decoration: none;
    transition: color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        color: var(--accent);
    }
}

.rs-header-rule {
    display: block;
    width: 56px;
    height: 2px;
    background: var(--accent);
}

.rs-section {
    padding-top: 18px;
}

.rs-heading {
    margin: 0 0 10px;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
}

.rs-summary {
    font-size: 12.5px;
    line-height: 1.5;
    color: var(--text-dim);

    p {
        margin: 0 0 7px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    :deep(strong) {
        color: var(--text);
        font-weight: 700;
    }
}

.rs-proj-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.rs-proj-item {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);

    &:last-child {
        padding-bottom: 0;
        border-bottom: none;
    }
}

.rs-proj-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 2px 16px;
}

.rs-proj-title {
    margin: 0;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text);
}

.rs-proj-meta {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 9.5px;
    color: var(--text-faint);
    white-space: nowrap;
}

.rs-proj-desc {
    margin: 2px 0 0;
    font-size: 11px;
    line-height: 1.4;
    color: var(--text-dim);
}

.rs-proj-tags {
    margin: 3px 0 0;
    font-size: 9.5px;
    font-style: italic;
    color: var(--text-faint);
}

.rs-edu-placeholder {
    padding: 12px;
    border-radius: 10px;
    border: 1px dashed var(--border-strong);
    color: var(--text-faint);
    font-size: 12px;
    text-align: center;
}

.rs-photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
}

.rs-photo-icon {
    width: 168px;
    height: 168px;
    padding: 28px;
    border-radius: 50%;
    border: 1px dashed var(--sidebar-border);
    color: var(--sidebar-text-dim);
    box-sizing: border-box;
}

.rs-photo-img {
    width: 168px;
    height: 168px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--sidebar-border);
}

.rs-photo-caption {
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    color: var(--sidebar-text-dim);
}

.rs-sidebar-section + .rs-sidebar-section {
    margin-top: 32px;
    padding-top: 28px;
    border-top: 1px solid var(--sidebar-border);
}

.rs-sidebar-heading {
    margin: 0 0 16px;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
}

.rs-sidebar-skill-group + .rs-sidebar-skill-group {
    margin-top: 18px;
}

.rs-sidebar-skill-cat {
    display: block;
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--sidebar-text-dim);
}

.rs-sidebar-skill-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 3px 0;
    font-size: 12.5px;
    color: var(--sidebar-text);
}

.rs-dots {
    display: inline-flex;
    gap: 3px;
    flex: 0 0 auto;
}

.rs-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sidebar-border);

    &.is-filled {
        background: var(--accent);
    }
}

.rs-interest-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 9px;

    li {
        position: relative;
        padding-left: 14px;
        font-size: 12.5px;
        color: var(--sidebar-text);

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--accent);
        }
    }
}

@media (max-width: 640px) {
    .rs-root {
        padding: 20px 12px;
    }

    .rs-page {
        min-height: 0;
    }

    .rs-main {
        padding: 40px 24px 40px;
    }

    .rs-sidebar {
        padding: 32px 24px 40px;
    }
}

@media print {
    .rs-root {
        background: none;
        padding: 0;
    }

    .rs-download-btn {
        display: none;
    }

    .rs-frame {
        width: auto;
        max-width: none;
    }

    .rs-page {
        min-height: 0;
        border: none;
        flex-direction: row;
    }
}
</style>
