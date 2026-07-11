<template>
    <div class="space-y-3">
        <div
            v-for="(item, i) in modelValue"
            :key="i"
            class="relative rounded-xl border border-(--border) bg-(--bg-sunken) p-4 pt-9"
        >
            <button
                type="button"
                class="absolute top-3 right-3 text-[11px] font-semibold tracking-wide text-(--text-faint) uppercase hover:text-red-400"
                @click="$emit('remove', i)"
            >
                Remove
            </button>
            <slot :item="item" :index="i" />
        </div>
        <button
            type="button"
            class="w-full rounded-lg border border-dashed border-(--border-strong) py-2 text-xs font-semibold tracking-wide text-(--text-faint) uppercase hover:border-(--accent) hover:text-(--accent)"
            @click="$emit('add')"
        >
            + Add {{ label }}
        </button>
    </div>
</template>

<script setup lang="ts" generic="T">
defineProps<{ modelValue: T[]; label: string }>();
defineEmits<{ add: []; remove: [index: number] }>();
defineSlots<{ default(props: { item: T; index: number }): unknown }>();
</script>
