<template>
    <div
        v-if="req.length > 0 && req"
        class="req-list"
    >
        <div
            v-for="r in req"
            :key="r.id"
            class="req"
        >
            <h2>{{ r.subject }}</h2>
            <ui-status :status="resolveDisplayStatus(r)"/>
            <div class="req-details">
                {{ r.deviceName }} / {{ r.deviceModel }} / {{ r.deviceBrand }}
            </div>
            <ui-labeled-text :value="r.suspectedIssue">Suspected issue</ui-labeled-text>
            <ui-button :href="`/staff/request/${ r.id }`">Details</ui-button>
        </div>
    </div>
    <common-box v-else>
        <h2>Keine historischen Anfragen</h2>
    </common-box>
</template>

<script lang="ts" setup>
import { RepairRequestStatus } from '@prisma/client';

import type { RepairRequestWithRelationsType } from '~~/types/req';

const { data: req } = useFetch<RepairRequestWithRelationsType[]>('/api/v1/staff/request/history');

function resolveDisplayStatus(request: RepairRequestWithRelationsType) {
    if (request.status === RepairRequestStatus.ACCEPTED || request.status === RepairRequestStatus.COMPLETED) {
        return request.statusHistory?.[0]?.status ?? request.status;
    }

    return request.status;
}
</script>

<style lang="scss" scoped>
.req {
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px;
    border-radius: 8px;

    background: $darkgray900;

    &-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
    }
}
</style>
