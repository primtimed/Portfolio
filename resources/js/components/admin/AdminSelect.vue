<template>
    <select
        v-model="model"
        class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) outline-none focus:border-(--accent)"
    >
        <option v-for="opt in options" :key="opt" :value="opt">
            {{ opt }}
        </option>
    </select>
</template>

<script setup lang="ts">
defineProps<{ options: string[] }>();

const model = defineModel<string>();
</script>
