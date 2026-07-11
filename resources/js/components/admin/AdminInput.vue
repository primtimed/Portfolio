<template>
    <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) placeholder-(--text-faint) outline-none focus:border-(--accent)"
    />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ type?: string; placeholder?: string }>(), {
    type: 'text',
});

const model = defineModel<string>();
</script>
