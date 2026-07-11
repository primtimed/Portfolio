<template>
    <nav
        class="nav"
        :class="{ scrolled, 'menu-open': mobileMenuOpen }"
        :style="{ '--nav-progress': scrollProgress }"
    >
        <a href="/" class="nav-logo">
            <span class="nav-wordmark">
                <strong>{{ firstName }}</strong>
                <span>{{ lastName }}</span>
            </span>
        </a>
        <button
            type="button"
            class="nav-toggle"
            :aria-expanded="mobileMenuOpen"
            aria-label="Toggle navigation menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
        >
            <span class="nav-toggle-bar" />
            <span class="nav-toggle-bar" />
            <span class="nav-toggle-bar" />
        </button>
        <div class="nav-menu" :class="{ open: mobileMenuOpen }">
            <div class="nav-links">
                <template v-for="link in links" :key="link.label">
                    <div v-if="link.dropdown" class="nav-dropdown">
                        <button
                            type="button"
                            class="nav-link nav-dropdown-toggle"
                            @click="toggleDropdown(link.label)"
                        >
                            {{ link.label }}
                            <svg
                                class="nav-chevron"
                                :class="{ open: openDropdown === link.label }"
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                            >
                                <path
                                    d="M1 1L5 5L9 1"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                        <div v-if="openDropdown === link.label" class="nav-dropdown-menu">
                            <a
                                v-for="item in link.dropdown"
                                :key="item.label"
                                :href="item.href"
                                class="nav-dropdown-item"
                                @click="closeMenu"
                                >{{ item.label }}</a
                            >
                        </div>
                    </div>
                    <a
                        v-else
                        :href="link.href"
                        rel="noopener noreferrer"
                        class="nav-link"
                        :class="{ active: (onHome && activeId === link.id) || currentPath === link.href }"
                        @click="closeMenu"
                    >
                        {{ link.label }}
                    </a>
                </template>
            </div>
            <a href="/resume" target="_blank" class="nav-cta" @click="closeMenu">My Resume</a>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { hobbies } from '@/data/hobbies';
import { projects, projectSlug } from '@/data/projects';

const props = defineProps<{ name: string; onHome?: boolean }>();

const currentPath = computed(() => usePage().url.split('?')[0]);

const firstName = computed(() => props.name.split(' ')[0]?.toLowerCase() ?? '');
const lastName = computed(() =>
    props.name.split(' ').slice(1).join(' ').toLowerCase(),
);

const links = [
    { label: 'Home', href: '/', id: 'top' },
    {
        label: 'Projects',
        dropdown: projects.map((project) => ({
            label: project.title,
            href: `/project/${projectSlug(project.title)}`,
        })),
    },
    {
        label: 'Hobbies',
        dropdown: hobbies.map((hobby) => ({
            label: hobby.title,
            href: `/hobbies/${hobby.slug}`,
        })),
    },
];

const activeId = ref('top');
const openDropdown = ref<string | null>(null);
const scrollProgress = ref(0);
const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const FADE_DISTANCE = 320;
const SHRINK_THRESHOLD = 20;
let observer: IntersectionObserver | null = null;
let ticking = false;

function toggleDropdown(label: string) {
    openDropdown.value = openDropdown.value === label ? null : label;
}

function closeMenu() {
    mobileMenuOpen.value = false;
    openDropdown.value = null;
}

function updateScrollProgress() {
    scrollProgress.value = Math.min(window.scrollY / FADE_DISTANCE, 1);
    scrolled.value = window.scrollY > SHRINK_THRESHOLD;
    ticking = false;
}

function onScroll() {
    if (ticking) {
        return;
    }

    ticking = true;
    requestAnimationFrame(updateScrollProgress);
}

onMounted(() => {
    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!props.onHome) {
        return;
    }

    const sections = links
        .filter((l) => l.id)
        .map((l) => document.getElementById(l.id as string))
        .filter((el): el is HTMLElement => el !== null);

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeId.value = entry.target.id;
                }
            });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((el) => observer?.observe(el));
});

onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener('scroll', onScroll);
});
</script>

<style lang="scss" scoped>
.nav {
    --nav-progress: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 0 clamp(1.25rem, 8vw, 20rem);
    height: 80px;
    background: rgba(0, 0, 0, calc(var(--nav-progress) * 0.72));
    border-bottom: 1px solid rgba(35, 47, 58, var(--nav-progress));
    backdrop-filter: blur(calc(var(--nav-progress) * 14px));
    -webkit-backdrop-filter: blur(calc(var(--nav-progress) * 14px));
    transition:
        height 0.3s ease,
        background 0.15s ease-out,
        border-color 0.15s ease-out,
        backdrop-filter 0.15s ease-out;

    &.scrolled {
        height: 56px;
    }
}

.nav-logo {
    text-decoration: none;
}

.nav-wordmark {
    font-size: 1.8rem;
    color: var(--accent);

    strong {
        font-weight: 700;
        color: var(--color-white);
    }

    span {
        color: var(--text-dim);
        font-weight: 400;
    }
}

.nav-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
}

.nav-toggle-bar {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-white);
    border-radius: 1px;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.menu-open .nav-toggle-bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
}

.menu-open .nav-toggle-bar:nth-child(2) {
    opacity: 0;
}

.menu-open .nav-toggle-bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
}

.nav-menu {
    display: contents;
}

.nav-links {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
}

.nav-link {
    color: var(--color-white);
    text-decoration: none;
    font-size: 0.95rem;
    padding: 0.35rem 0;
    border-bottom: 2px solid transparent;
    background: none;
    border-top: none;
    margin-left: 1rem;
    margin-right: 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    &:hover,
    &.active {
        color: var(--accent);
        border-bottom-color: var(--accent);
    }
}

.nav-dropdown {
    position: relative;
}

.nav-dropdown-toggle {
    font-family: inherit;
}

.nav-chevron {
    transition: transform 0.15s ease;

    &.open {
        transform: rotate(180deg);
    }
}

.nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.4rem;
    min-width: 160px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    z-index: 10;
}

.nav-dropdown-item {
    display: block;
    padding: 0.5rem 0.75rem;
    color: var(--text-dim);
    text-decoration: none;
    font-size: 0.9rem;
    border-radius: 6px;

    &:hover {
        background: var(--bg-hover);
        color: var(--text);
    }
}

.nav-cta {
    color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 6px;
    padding: 0.5rem 1.1rem;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-decoration: none;
    background: rgba(255, 122, 41, 0.08);
    white-space: nowrap;

    &:hover {
        background: var(--accent);
        color: var(--accent-ink);
    }
}

@media (max-width: 860px) {
    .nav {
        padding: 0 1.25rem;
        gap: 1rem;
    }

    .nav-toggle {
        display: flex;
    }

    .nav-menu {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        background: var(--bg-sunken);
        border-bottom: 1px solid var(--border);
        padding: 0.5rem 1.25rem 1.5rem;
        opacity: 0;
        transform: translateY(-8px);
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .nav-menu.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

    .nav-links {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .nav-link {
        width: 100%;
        margin: 0;
        padding: 0.85rem 0;
        border-bottom: 1px solid var(--border);
        justify-content: space-between;
    }

    .nav-dropdown {
        width: 100%;
    }

    .nav-dropdown-toggle {
        width: 100%;
    }

    .nav-dropdown-menu {
        position: static;
        box-shadow: none;
        border: none;
        background: none;
        padding: 0 0 0 1rem;
        min-width: 0;
    }

    .nav-cta {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
    }
}
</style>
