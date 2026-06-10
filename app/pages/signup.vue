<template>
    <common-box>
        <ui-input-text
            v-model="username"
            @keyup.enter="signup"
        >Username</ui-input-text>
        <ui-input-text
            v-model="email"
            @keyup.enter="signup"
        >E-Mail</ui-input-text>
        <ui-input-text
            v-model="password"
            input-type="password"
            @keyup.enter="signup"
        >Password</ui-input-text>
        <ui-input-text
            v-model="passwordre"
            input-type="password"
            @keyup.enter="signup"
        >Repeat Password</ui-input-text>
        <ui-button @click="signup">Signup</ui-button>
    </common-box>
</template>

<script setup lang="ts">
import { useToastManager } from '~/composables/toastManager';
import { ToastMode } from '~~/types/toast';

const router = useRouter();
const { showToast } = useToastManager();

const username = ref<string>();
const password = ref<string>();
const passwordre = ref<string>();
const email = ref<string>();

interface SignupResponse {
    redirect?: string;
    message?: string;
}

async function signup() {
    try {
        const response = await $fetch<SignupResponse>('/api/v1/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                passwordRepeated: passwordre.value,
                email: email.value,
            }),
        });
        if (response.redirect) {
            router.push(response.redirect);
        }
    }
    catch (error: any) {
        let message = error.data?.message || error.data?.statusMessage || error.statusMessage || 'Signup failed';

        if (Array.isArray(error.data?.data)) {
            message = error.data.data.map((i: any) => i.message).join('\n');
        }

        showToast({
            mode: ToastMode.Error,
            message,
            duration: 8000,
        });
    }
}
</script>
