<template>
    <div class="space-y-3">
        <div
            v-for="(item, i) in modelValue"
            :key="i"
            class="relative rounded-xl border border-(--border) bg-(--bg-sunken) p-4 pt-9"
        >
            <div class="absolute top-3 right-3 flex items-center gap-3">
                <div class="flex items-center gap-1">
                    <button
                        type="button"
                        class="text-[11px] font-semibold tracking-wide text-(--text-faint) uppercase hover:text-(--accent) disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-(--text-faint)"
                        :disabled="i === 0"
                        @click="moveUp(i)"
                    >
                        ↑
                    </button>
                    <button
                        type="button"
                        class="text-[11px] font-semibold tracking-wide text-(--text-faint) uppercase hover:text-(--accent) disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-(--text-faint)"
                        :disabled="i === modelValue.length - 1"
                        @click="moveDown(i)"
                    >
                        ↓
                    </button>
                </div>
                <button
                    type="button"
                    class="text-[11px] font-semibold tracking-wide text-(--text-faint) uppercase hover:text-red-400"
                    @click="$emit('remove', i)"
                >
                    Remove
                </button>
            </div>
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
const props = defineProps<{ modelValue: T[]; label: string }>();
defineEmits<{ add: []; remove: [index: number] }>();
defineSlots<{ default(props: { item: T; index: number }): unknown }>();

// modelValue is always the same reactive array the parent form owns (passed via
// :model-value, not v-model), so swapping items in place here updates the form
// directly without needing an extra round-trip event for something this generic.
function moveUp(index: number) {
    if (index === 0) {
        return;
    }

    [props.modelValue[index - 1], props.modelValue[index]] = [props.modelValue[index], props.modelValue[index - 1]];
}

function moveDown(index: number) {
    if (index === props.modelValue.length - 1) {
        return;
    }

    [props.modelValue[index], props.modelValue[index + 1]] = [props.modelValue[index + 1], props.modelValue[index]];
}
</script>
