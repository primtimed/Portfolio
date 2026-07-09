<template>
    <section id="skills" class="skills-section">
        <div class="skills-layout">
            <RevealOnView variant="left" class="skills-intro">
                <span class="skills-eyebrow">What I Bring</span>
                <h2 class="skills-heading">Skills</h2>
                <p class="skills-sub">
                    A mix of gameplay engineering and software craft, weighted
                    toward the tools I reach for most.
                </p>
            </RevealOnView>

            <RevealOnView variant="right" class="skills-terminal">
                <div class="skills-terminal-bar">
                    <span class="skills-terminal-dot dot-r" />
                    <span class="skills-terminal-dot dot-y" />
                    <span class="skills-terminal-dot dot-g" />
                    <span class="skills-terminal-path">~/brian/skills --list</span>
                </div>

                <div class="skills-terminal-body">
                    <div
                        v-for="category in categories"
                        :key="category.title"
                        class="skill-group"
                    >
                        <h3 class="skill-group-title">
                            <span class="skill-prompt">$</span>
                            {{ category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') }}
                        </h3>
                        <div class="skill-chips">
                            <span
                                v-for="skill in category.skills"
                                :key="skill.name"
                                class="skill-chip"
                                :class="`skill-chip--l${skill.level}`"
                            >
                                {{ skill.name }}
                                <span class="skill-chip-bar" :aria-label="`${skill.name}: ${skill.level} out of 5`">{{ bar(skill.level) }}</span>
                            </span>
                        </div>
                    </div>

                    <div class="skill-cursor-row">
                        <span class="skill-prompt">$</span>
                        <span class="skill-cursor" />
                    </div>
                </div>
            </RevealOnView>
        </div>
    </section>
</template>

<script setup lang="ts">
import RevealOnView from '@/components/ui/RevealOnView.vue';
import { skillCategories } from '@/data/portfolio';

const categories = skillCategories;

function bar(level: number) {
    return '▰'.repeat(level) + '▱'.repeat(5 - level);
}
</script>

<style lang="scss" scoped>
.skills-section {
    --bg: #ffffff;
    --bg-sunken: #f2f2f2;
    --bg-hover: #ececec;
    --border: #e5e5e5;
    --border-strong: #d0d0d0;
    --text: #111111;
    --text-dim: #595959;
    --text-faint: #8c8c8c;

    width: 100%;
    padding: 110px 32px;
    background: var(--bg);
    color: var(--text);
}

.skills-layout {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
    gap: 64px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        gap: 36px;
    }
}

.skills-eyebrow {
    display: block;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
}

.skills-heading {
    margin: 0 0 16px;
    font-family: var(--font-display, inherit);
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 800;
    letter-spacing: -0.01em;
}

.skills-sub {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-dim);
    max-width: 320px;
}

.skills-terminal {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border-strong);
    background: #ffffff;
}

.skills-terminal-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: var(--bg-sunken);
    border-bottom: 1px solid var(--border);
}

.skills-terminal-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &.dot-r {
        background: #ff5f57;
    }
    &.dot-y {
        background: #febc2e;
    }
    &.dot-g {
        background: #28c840;
    }
}

.skills-terminal-path {
    margin-left: 10px;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 12px;
    color: var(--text-faint);
}

.skills-terminal-body {
    padding: 30px 32px 26px;
}

.skill-group {
    margin-bottom: 28px;

    &:last-of-type {
        margin-bottom: 0;
    }
}

.skill-group-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 14px;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--accent);
}

.skill-prompt {
    color: var(--text-faint);
}

.skill-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-left: 22px;
}

.skill-chip {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 9px 14px 9px 16px;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    color: var(--text-dim);
    font-size: 14px;
    font-weight: 500;
    transition:
        border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
        border-color: var(--accent);
        color: var(--text);
        background: var(--bg-hover);
        transform: translateY(-1px);
    }

    &--l5,
    &--l4 {
        border-color: var(--accent);
        color: var(--text);
        font-weight: 700;
        background: rgba(255, 122, 41, 0.08);
    }

    &--l1 {
        color: var(--text-faint);
        border-style: dashed;
    }
}

.skill-chip-bar {
    flex: 0 0 auto;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--accent);
}

.skill-cursor-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 22px;
    font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
}

.skill-cursor {
    width: 8px;
    height: 15px;
    background: var(--accent);
    animation: skill-cursor-blink 1s steps(1) infinite;
}

@keyframes skill-cursor-blink {
    0%,
    49% {
        opacity: 1;
    }
    50%,
    100% {
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .skill-cursor {
        animation: none;
    }
}
</style>
