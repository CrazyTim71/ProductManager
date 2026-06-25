<template>
    <common-box class="savings-tile">
        <h3>Ersparnis durch Reparatur</h3>
        <div class="savings-tile-grid">
            <div class="savings-tile-item">
                <span class="savings-tile-label">Neukaufwert</span>
                <strong>{{ formatCurrency(summary.newPurchaseValue) }}</strong>
            </div>
            <div class="savings-tile-item">
                <span class="savings-tile-label">Reparaturwert</span>
                <strong>{{ formatCurrency(summary.repairValue) }}</strong>
            </div>
            <div class="savings-tile-item">
                <span class="savings-tile-label">Arbeitskosten</span>
                <strong>{{ formatCurrency(summary.laborCost) }}</strong>
            </div>
            <div class="savings-tile-item">
                <span class="savings-tile-label">Teilekosten</span>
                <strong>{{ formatCurrency(summary.partsCost) }}</strong>
            </div>
        </div>
        <div
            class="savings-tile-total"
            :class="summary.savedValue >= 0 ? 'savings-tile-total--positive' : 'savings-tile-total--negative'"
        >
            Ersparnis: {{ formatCurrency(summary.savedValue) }}
        </div>
    </common-box>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import { formatCurrency } from '~~/app/utils/repairSavings';
import type { RepairSavingsSummary } from '~~/types/config';

defineProps({
    summary: {
        type: Object as PropType<RepairSavingsSummary>,
        required: true,
    },
});
</script>

<style scoped lang="scss">
.savings-tile {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
    }

    &-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 12px;
        border: 1px solid $lightgray125;
        border-radius: 12px;

        background: rgb(255 255 255 / 3%);
    }

    &-label {
        font-size: 12px;
        color: $typographyPrimary;
    }

    &-total {
        width: fit-content;
        padding: 8px 10px;
        border-radius: 10px;
        font-weight: 700;

        &--positive {
            color: $success500;
            background: rgb(53 199 90 / 20%);
        }

        &--negative {
            color: $error500;
            background: rgb(226 70 79 / 20%);
        }
    }
}
</style>
