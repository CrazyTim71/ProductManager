<template>
    <div
        v-if="status"
        class="status"
        :style="{
            '--status-color': styleColor,
        }"
    >
        {{ labelMap.get(status) ?? status }}
    </div>
</template>

<script lang="ts" setup>
import { RepairRequestStatus, RepairStatus } from '@prisma/client';
import type { PropType } from 'vue';

type StatusValue = RepairRequestStatus | RepairStatus;

const props = defineProps({
    status: {
        type: String as PropType<StatusValue>,
    },
});

const labelMap: Map<StatusValue, string> = new Map([
    [RepairRequestStatus.ACCEPTED, 'Angenommen'],
    [RepairRequestStatus.CANCELLED, 'Abgebrochen'],
    [RepairRequestStatus.COMPLETED, 'Abgeschlossen'],
    [RepairRequestStatus.REJECTED, 'Abgelehnt'],
    [RepairRequestStatus.WAITING_FOR_RESPONSE, 'Wartet auf Antwort'],
    [RepairRequestStatus.WAITING_FOR_REVIEW, 'Wartet auf Prüfung'],
    [RepairStatus.ON_THE_WAY_TO_SHOP, 'Unterwegs'],
    [RepairStatus.RECEIVED, 'Empfangen'],
    [RepairStatus.IN_DIAGNOSIS, 'Diagnose'],
    [RepairStatus.WAITING_FOR_PARTS, 'Wartet auf Teile'],
    [RepairStatus.IN_REPAIR, 'In Reparatur'],
    [RepairStatus.IN_QA, 'Qualitätsprüfung'],
    [RepairStatus.IN_OUTGOING, 'Im Ausgang'],
    [RepairStatus.ON_THE_WAY_TO_CUSTOMER, 'Unterwegs'],
    [RepairStatus.DELIVERED, 'Zugestellt'],
    [RepairStatus.ARCHIVED, 'Archiviert'],
]);

const colorMap: Map<StatusValue, string> = new Map([
    [RepairRequestStatus.ACCEPTED, colorsList.primary600],
    [RepairRequestStatus.CANCELLED, colorsList.error600],
    [RepairRequestStatus.COMPLETED, colorsList.success600],
    [RepairRequestStatus.REJECTED, colorsList.error600],
    [RepairRequestStatus.WAITING_FOR_RESPONSE, colorsList.warning600],
    [RepairRequestStatus.WAITING_FOR_REVIEW, colorsList.warning600],
    [RepairStatus.ON_THE_WAY_TO_SHOP, colorsList.warning600],
    [RepairStatus.RECEIVED, colorsList.primary500],
    [RepairStatus.IN_DIAGNOSIS, colorsList.warning600],
    [RepairStatus.WAITING_FOR_PARTS, colorsList.warning600],
    [RepairStatus.IN_REPAIR, colorsList.primary600],
    [RepairStatus.IN_QA, colorsList.warning600],
    [RepairStatus.IN_OUTGOING, colorsList.primary600],
    [RepairStatus.ON_THE_WAY_TO_CUSTOMER, colorsList.primary500],
    [RepairStatus.DELIVERED, colorsList.success600],
    [RepairStatus.ARCHIVED, colorsList.lightgray300],
]);

const styleColor = computed(() => {
    if (!props.status) {
        return colorsList.lightgray300;
    }

    return colorMap.get(props.status) ?? colorsList.lightgray300;
});
</script>

<style lang="scss" scoped>
.status {
    width: fit-content;
    min-width: 16px;
    min-height: 16px;
    padding: 8px;
    border-radius: 8px;

    background: var(--status-color);
}
</style>
