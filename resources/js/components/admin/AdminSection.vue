<template>
    <section
        class="space-y-4 border-t border-(--border) pt-8 first:border-t-0 first:pt-0"
        :data-preview-target="previewTarget"
    >
        <h2
            class="text-lg font-extrabold tracking-tight text-(--text) uppercase [font-family:var(--font-display)]"
        >
            {{ title }}
        </h2>
        <slot />
    </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; previewTarget?: string }>();
</script>
