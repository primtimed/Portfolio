<template>
    <component
        :is="href ? Link : 'button'"
        :href="href"
        :type="href ? undefined : (type ?? 'button')"
        :disabled="disabled"
        class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-bold tracking-wide uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        :class="variantClass"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary' | 'danger';
        type?: 'button' | 'submit';
        href?: string;
        disabled?: boolean;
    }>(),
    { variant: 'primary' },
);

const variantClass = computed(() => ({
    'bg-(--accent) text-(--accent-ink) hover:bg-[#c85f2b]':
        props.variant === 'primary',
    'border border-(--border-strong) text-(--text-dim) hover:border-(--accent) hover:text-(--accent)':
        props.variant === 'secondary',
    'border border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50':
        props.variant === 'danger',
}));
</script>
