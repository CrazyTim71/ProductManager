<template>
    <div
        class="work-item-card"
        :style="cardStyle"
    >
        <div class="work-item-card-header">
            <div class="work-item-card-copy">
                <div class="work-item-card-order">Order {{ item.orderIndex }}</div>
                <div class="work-item-card-title"><Icon
                    v-if="item.workItemType.icon"
                    :name="item.workItemType.icon"
                />{{ item.title }}</div>
            </div>
            <repair-work-item-status-badge :status="item.status"/>
        </div>

        <div
            v-if="item.description"
            class="work-item-card-description"
        >
            {{ item.description }}
        </div>

        <div class="work-item-card-meta">
            <span>Assigned: {{ assignedStaffLabel }}</span>
            <span v-if="item.laborMinutes !== null">{{ item.laborMinutes }} min</span>
            <span v-if="item.completedAt">Completed</span>
            <span v-if="item.workItemType.isDefault">Default</span>
        </div>

        <repair-work-item-parts
            :editable="editable"
            :parts="itemParts"
            @add="emit('addPart')"
            @transition="(partId, status) => emit('changePartStatus', partId, status)"
        />

        <div
            v-if="editable"
            class="work-item-card-actions"
        >
            <ui-button @click="emit('edit')">Edit</ui-button>
            <ui-button
                @click="emit('toggleInProgress')"
            >
                {{ item.status === 'IN_PROGRESS' ? 'Set Pending' : 'Set In Progress' }}
            </ui-button>
            <ui-button
                @click="emit('toggleDone')"
            >
                {{ item.status === 'DONE' ? 'Reopen' : 'Complete' }}
            </ui-button>
            <ui-button
                primary-color="error600"
                @click="emit('delete')"
            >
                Delete
            </ui-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PartOrderStatus } from '@prisma/client';
import type { PropType } from 'vue';
import type { PartOrderWithRelationsType, RepairWorkItemWithRelationsType } from '~~/types/req';

import RepairWorkItemParts from './RepairWorkItemParts.vue';

const props = defineProps({
    item: {
        type: Object as PropType<RepairWorkItemWithRelationsType>,
        required: true,
    },
    editable: {
        type: Boolean,
        default: false,
    },
    partOrders: {
        type: Array as PropType<PartOrderWithRelationsType[]>,
        default: () => [],
    },
});

const emit = defineEmits({
    delete() {
        return true;
    },
    edit() {
        return true;
    },
    toggleInProgress() {
        return true;
    },
    toggleDone() {
        return true;
    },
    addPart() {
        return true;
    },
    changePartStatus(partId: string, status: PartOrderStatus) {
        return Boolean(partId) && Boolean(status);
    },
});

const cardStyle = computed(() => ({
    '--accent-color': props.item.workItemType.color ?? 'rgb(148 163 184 / 0.9)',
}));

const assignedStaffLabel = computed(() => props.item.assignedStaff?.displayName ?? props.item.assignedStaff?.username ?? 'Unassigned');
const itemParts = computed(() => props.partOrders.filter(partOrder => partOrder.workItemId === props.item.id));
</script>

<style scoped lang="scss">
.work-item-card {
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 16px;
    border: 1px solid $lightgray150;
    border-left: 4px solid var(--accent-color);
    border-radius: 16px;

    background: linear-gradient(180deg, rgb(255 255 255 / 3%), rgb(255 255 255 / 1%));

    &-header {
        display: flex;
        gap: 12px;
        align-items: start;
        justify-content: space-between;
    }

    &-copy {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &-order {
        width: fit-content;
        padding: 4px 8px;
        border: 1px solid $lightgray150;
        border-radius: 999px;

        font-size: 11px;
        font-weight: 700;
        color: $typographyPrimary;
        text-transform: uppercase;
        letter-spacing: 0.08em;

        background: rgb(255 255 255 / 4%);
    }

    &-title {
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: center;

        font-size: 16px;
        font-weight: 700;
    }

    &-meta {
        font-size: 12px;
        color: $typographyPrimary;
    }

    &-description {
        line-height: 1.4;
        color: $typographyPrimary;
    }

    &-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    &-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
}
</style>
