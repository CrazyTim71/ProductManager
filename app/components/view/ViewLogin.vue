<template>
    <template v-if="store.ready">
        <ui-button
            v-if="!store.me?.loggedIn"
            to="/login"
        ><div class="login-btn">
            Login
        </div></ui-button>

        <div
            v-else
            class="login-actions"
        >
            <view-notifications/>

            <ui-button
                icon-width="45px"
                to="/profile"
                type="secondary"
            >
                {{ store.me?.username }}
            </ui-button>
        </div>
    </template>
    <template v-else>
        <common-loader small/>
    </template>
</template>

<script setup lang="ts">
import CommonLoader from '~/components/ui/Loader.vue';
import { useStore } from '~/store';

const store = useStore();
</script>

<style scoped lang="scss">
.login-actions {
    position: relative;
    display: flex;
    gap: 12px;
    align-items: center;
}

.login-btn {
    font-size: 16px;
    font-weight: 700;
}
</style>
