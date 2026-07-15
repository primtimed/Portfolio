<template>
    <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
            <button
                type="button"
                class="rounded-lg border border-dashed border-(--border-strong) px-3 py-1.5 text-xs font-semibold tracking-wide text-(--text-faint) uppercase hover:border-(--accent) hover:text-(--accent)"
                @click="openInsert('image')"
            >
                + Image
            </button>
            <button
                type="button"
                class="rounded-lg border border-dashed border-(--border-strong) px-3 py-1.5 text-xs font-semibold tracking-wide text-(--text-faint) uppercase hover:border-(--accent) hover:text-(--accent)"
                @click="openInsert('video')"
            >
                + Video
            </button>
            <span class="self-center text-[11px] text-(--text-faint)"
                >Click in the text where you want it, then insert — it lands right there.</span
            >
        </div>

        <textarea
            ref="textareaEl"
            v-model="model"
            :rows="rows"
            :placeholder="placeholder"
            class="w-full rounded-lg border border-(--border-strong) bg-(--bg-sunken) px-3 py-2 text-sm text-(--text) placeholder-(--text-faint) outline-none focus:border-(--accent)"
            @click="trackCursor"
            @keyup="trackCursor"
            @select="trackCursor"
        />

        <div v-if="insertMode" class="space-y-3 rounded-lg border border-(--border-strong) bg-(--bg-sunken) p-3">
            <AdminField label="URL">
                <AdminInput v-model="insertUrl" :placeholder="insertMode === 'video' ? 'Video URL' : 'Image URL'" />
            </AdminField>
            <AdminField label="Caption (optional)">
                <AdminInput v-model="insertCaption" />
            </AdminField>
            <div class="flex gap-2">
                <AdminButton :disabled="!insertUrl.trim()" @click="confirmInsert">Insert {{ insertMode === 'video' ? 'video' : 'image' }}</AdminButton>
                <AdminButton variant="secondary" @click="cancelInsert">Cancel</AdminButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import AdminButton from '@/components/admin/AdminButton.vue';
import AdminField from '@/components/admin/AdminField.vue';
import AdminInput from '@/components/admin/AdminInput.vue';

withDefaults(defineProps<{ rows?: number; placeholder?: string }>(), {
    rows: 10,
});

const model = defineModel<string>({ required: true });

const textareaEl = ref<HTMLTextAreaElement | null>(null);
const cursorPos = ref<number | null>(null);

function trackCursor() {
    if (textareaEl.value) cursorPos.value = textareaEl.value.selectionStart;
}

const insertMode = ref<'image' | 'video' | null>(null);
const insertUrl = ref('');
const insertCaption = ref('');

function openInsert(mode: 'image' | 'video') {
    trackCursor();
    insertMode.value = mode;
    insertUrl.value = '';
    insertCaption.value = '';
}

function cancelInsert() {
    insertMode.value = null;
}

function confirmInsert() {
    if (!insertUrl.value.trim()) return;

    const snippet =
        insertMode.value === 'video' ? `!video[${insertCaption.value}](${insertUrl.value})` : `![${insertCaption.value}](${insertUrl.value})`;

    const value = model.value ?? '';
    const pos = cursorPos.value ?? value.length;
    const before = value.slice(0, pos);
    const after = value.slice(pos);

    // The renderer needs the directive on its own line, so pad with
    // newlines only where the cursor landed mid-line.
    const leadingBreak = before.length > 0 && !before.endsWith('\n') ? '\n' : '';
    const trailingBreak = after.length > 0 && !after.startsWith('\n') ? '\n' : '';
    const insertion = `${leadingBreak}${snippet}${trailingBreak}`;

    model.value = `${before}${insertion}${after}`;
    insertMode.value = null;

    nextTick(() => {
        const newPos = pos + insertion.length;
        textareaEl.value?.focus();
        textareaEl.value?.setSelectionRange(newPos, newPos);
        cursorPos.value = newPos;
    });
}
</script>
