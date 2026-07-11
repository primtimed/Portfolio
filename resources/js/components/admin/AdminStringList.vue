<template>
    <div class="space-y-2">
        <div v-for="(_, i) in model" :key="i" class="flex gap-2">
            <input
                v-model="model[i]"
                class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) outline-none focus:border-(--accent)"
            />
            <button
                type="button"
                class="shrink-0 rounded-lg border border-(--border-strong) px-3 text-xs text-(--text-faint) hover:border-red-500 hover:text-red-400"
                @click="model.splice(i, 1)"
            >
                Remove
            </button>
        </div>
        <button
            type="button"
            class="w-full rounded-lg border border-dashed border-(--border-strong) py-2 text-xs font-semibold tracking-wide text-(--text-faint) uppercase hover:border-(--accent) hover:text-(--accent)"
            @click="model.push('')"
        >
            + Add
        </button>
    </div>
</template>

<script setup lang="ts">
const model = defineModel<string[]>({ required: true });
</script>
