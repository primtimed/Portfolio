<template>
    <label class="block">
        <span
            class="mb-1.5 block text-[11px] font-semibold tracking-widest text-(--text-faint) uppercase [font-family:var(--font-mono)]"
            >{{ label }}</span
        >
        <slot />
        <span v-if="error" class="mt-1 block text-xs text-red-400">{{
            error
        }}</span>
    </label>
</template>

<script setup lang="ts">
defineProps<{ label: string; error?: string }>();
</script>
