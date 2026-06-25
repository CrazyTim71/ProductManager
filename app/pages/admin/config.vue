<template>
    <common-page title="Config">
        <common-box class="config-page">
            <h2>Global values</h2>
            <ui-input-number v-model="hourlyRate">Stundensatz (EUR / h)</ui-input-number>
            <div class="config-page-actions">
                <ui-button @click="save">Save</ui-button>
            </div>
        </common-box>
    </common-page>
</template>

<script setup lang="ts">
interface AdminConfigResponse {
    id: string;
    hourlyRate: number | string;
}

const { data: config, refresh } = useFetch<AdminConfigResponse>('/api/v1/admin/config');
const { showToast } = useToastManager();

const hourlyRate = ref(0);

watch(config, nextConfig => {
    if (!nextConfig) {
        return;
    }

    hourlyRate.value = Number(nextConfig.hourlyRate);
}, {
    immediate: true,
});

async function save() {
    await $fetch('/api/v1/admin/config', {
        method: 'PUT',
        body: {
            hourlyRate: hourlyRate.value,
        },
    });

    await refresh();
    showToast({
        message: 'Config saved',
    });
}
</script>

<style scoped lang="scss">
.config-page {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: min(520px, 100%);

    &-actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
