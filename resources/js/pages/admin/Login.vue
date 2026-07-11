<template>
    <Head title="Admin login" />

    <div
        class="root flex min-h-screen items-center justify-center bg-(--bg) px-4 text-(--text)"
        style="
            --bg: #f7f3ec;
            --bg-sunken: #ffffff;
            --bg-hover: #efe7d8;
            --border: #e5ddd0;
            --border-strong: #d6c9b0;
            --text: #1c1a17;
            --text-dim: #4a453f;
            --text-faint: #8a8078;
            --accent: #e2733a;
            --accent-ink: #1c1a17;
        "
    >
        <form
            class="w-full max-w-sm space-y-4 rounded-2xl border border-(--border) bg-(--bg-sunken) p-8 shadow-xl shadow-black/5"
            @submit.prevent="submit"
        >
            <div class="mb-6 text-center">
                <div
                    class="text-xl font-extrabold tracking-tight uppercase [font-family:var(--font-display)]"
                >
                    <span class="text-(--accent)">Admin</span> login
                </div>
                <p class="mt-1 text-sm text-(--text-dim)">
                    Enter the admin password to continue.
                </p>
            </div>

            <AdminField label="Password" :error="form.errors.password">
                <AdminInput
                    v-model="form.password"
                    type="password"
                    placeholder="••••••••"
                    autofocus
                />
            </AdminField>

            <AdminButton
                type="submit"
                variant="primary"
                class="w-full"
                :disabled="form.processing"
            >
                {{ form.processing ? 'Checking…' : 'Log in' }}
            </AdminButton>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import AdminButton from '@/components/admin/AdminButton.vue';
import AdminField from '@/components/admin/AdminField.vue';
import AdminInput from '@/components/admin/AdminInput.vue';
import { store } from '@/routes/admin/login';

const form = useForm(store(), { password: '' });

function submit() {
    form.submit();
}
</script>
