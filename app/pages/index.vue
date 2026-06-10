<template>
    <common-page title="Welcome to Product Manager!">
        <p v-if="store.me?.loggedIn">Hello, {{ store.me.username }}!</p>
        <ui-button
            to="/signup"
        >Create a Account</ui-button>
    </common-page>
</template>

<script setup lang="ts">
import { useStore } from '~/store';

const store = useStore();
</script>

