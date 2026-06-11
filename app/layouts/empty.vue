<template>
    <div class="app_content">
        <nuxt-loading-indicator :color="colorsList.primary300"/>
        <slot/>
        <common-toast-container/>
        <view-version/>
    </div>
</template>

<script setup lang="ts">
import { colorsList } from '#imports';
import ViewVersion from '~/components/view/ViewVersion.vue';
import { useStore } from '~/store';

defineSlots<{ default: () => any }>();

const store = useStore();

onMounted(() => {
    void store.fetchMe();
});


useLayout();
</script>

<style lang="scss">
@use "~/scss/layout";
</style>
