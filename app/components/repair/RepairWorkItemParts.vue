<template>
    <div class="work-item-parts">
        <div class="work-item-parts-header">
            <h4>Parts</h4>
            <ui-button
                v-if="editable"
                size="S"
                @click="emit('add')"
            >Add part</ui-button>
        </div>

        <div
            v-if="parts.length === 0"
            class="work-item-parts-empty"
        >No parts assigned</div>

        <div
            v-for="part in parts"
            :key="part.id"
            class="work-item-parts-item"
        >
            <div class="work-item-parts-copy">
                <strong>{{ part.orderedName }}</strong>
                <span>Qty {{ part.quantity }}</span>
                <span>{{ part.status }}</span>
            </div>
            <div
                v-if="editable"
                class="work-item-parts-actions"
            >
                <ui-button
                    v-for="status in nextStatuses(part.status)"
                    :key="status"
                    size="S"
                    @click="emit('transition', part.id, status)"
                >{{ status }}</ui-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PartOrderStatus } from '@prisma/client';
import type { PropType } from 'vue';

import { partOrderTransitions } from '~~/app/utils/partOrders';
import type { PartOrderWithRelationsType } from '~~/types/req';

defineProps({
    parts: {
        type: Array as PropType<PartOrderWithRelationsType[]>,
        default: () => [],
    },
    editable: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits({
    add() {
        return true;
    },
    transition(partId: string, status: PartOrderStatus) {
        return Boolean(partId) && Boolean(status);
    },
});

function nextStatuses(status: PartOrderStatus) {
    return partOrderTransitions[status] ?? [];
}
</script>

<style scoped lang="scss">
.work-item-parts {
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding-top: 8px;
    border-top: 1px solid $lightgray125;

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h4 {
            margin: 0;
            font-size: 13px;
        }
    }

    &-empty {
        font-size: 12px;
        color: $typographyPrimary;
        opacity: 0.75;
    }

    &-item {
        display: flex;
        flex-direction: column;
        gap: 8px;

        padding: 10px;
        border: 1px solid $lightgray125;
        border-radius: 10px;

        background: rgb(255 255 255 / 2%);
    }

    &-copy {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        span {
            font-size: 12px;
            color: $typographyPrimary;
        }
    }

    &-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
}
</style>
