<template>
    <select
        v-model="model"
        class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) outline-none focus:border-(--accent)"
    >
        <option v-for="opt in normalizedOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
        </option>
    </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type SelectOption = string | { label: string; value: string };

const props = defineProps<{ options: SelectOption[] }>();

const model = defineModel<string>();

const normalizedOptions = computed(() =>
    props.options.map((opt) => (typeof opt === 'string' ? { label: opt, value: opt } : opt)),
);
</script>
