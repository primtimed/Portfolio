<template>
    <nav
        class="nav"
        :class="{ scrolled }"
        :style="{ '--nav-progress': scrollProgress }"
    >
        <a href="/" class="nav-logo">
            <span class="nav-wordmark">
                <strong>{{ firstName }}</strong>
                <span>{{ lastName }}</span>
            </span>
        </a>
        <div class="nav-links">
            <template v-for="link in links" :key="link.label">
                <div v-if="link.dropdown" class="nav-dropdown">
                    <button
                        type="button"
                        class="nav-link nav-dropdown-toggle"
                        @click="toggleDropdown"
                    >
                        {{ link.label }}
                        <svg
                            class="nav-chevron"
                            :class="{ open: dropdownOpen }"
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
                    <div v-if="dropdownOpen" class="nav-dropdown-menu">
                        <a
                            v-for="item in link.dropdown"
                            :key="item.label"
                            :href="item.href"
                            class="nav-dropdown-item"
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
                >
                    {{ link.label }}
                </a>
            </template>
        </div>
        <a href="/resume" target="_blank" class="nav-cta">My Resume</a>
    </nav>
</template>

<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{ name: string; onHome?: boolean }>();

const currentPath = computed(() => usePage().url.split('?')[0]);

const firstName = computed(() => props.name.split(' ')[0]?.toLowerCase() ?? '');
const lastName = computed(() =>
    props.name.split(' ').slice(1).join(' ').toLowerCase(),
);

const links = [
    { label: 'Home', href: '/', id: 'top' },
    { label: 'Projects', href: '/portfolio', id: 'projects' },
    {
        label: 'Hobbies',
        dropdown: [
            { label: 'Photography', href: '/hobbies/photography' },
        ],
    },
];

const activeId = ref('top');
const dropdownOpen = ref(false);
const scrollProgress = ref(0);
const scrolled = ref(false);
const FADE_DISTANCE = 320;
const SHRINK_THRESHOLD = 20;
let observer: IntersectionObserver | null = null;
let ticking = false;

function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value;
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
    padding: 0 20rem;
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
</style>
