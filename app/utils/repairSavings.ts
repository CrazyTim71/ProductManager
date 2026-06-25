import type { Decimal } from '@prisma/client/runtime/library';

import type { PartOrderWithRelationsType, RepairRequestWithRelationsType } from '~~/types/req';
import type { RepairSavingsSummary } from '~~/types/config';

function toNumber(value: Decimal | number | string | null | undefined) {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const parsed = Number.parseFloat(value);
        return Number.isNaN(parsed) ? 0 : parsed;
    }

    if (value && typeof value === 'object' && 'toString' in value) {
        const parsed = Number.parseFloat(value.toString());
        return Number.isNaN(parsed) ? 0 : parsed;
    }

    return 0;
}

export function calculatePartsCost(partOrders: PartOrderWithRelationsType[]) {
    return partOrders.reduce((sum, partOrder) => {
        if (partOrder.status === 'CANCELLED') {
            return sum;
        }

        const actualCost = toNumber(partOrder.actualCost);
        if (actualCost > 0) {
            return sum + actualCost;
        }

        const estimatedCost = toNumber(partOrder.estimatedCost);
        if (estimatedCost > 0) {
            return sum + estimatedCost;
        }

        const unitCost = toNumber(partOrder.catalogPart?.unitCost);
        return sum + (unitCost * partOrder.quantity);
    }, 0);
}

export function calculateRepairSavings(request: RepairRequestWithRelationsType, hourlyRate: number): RepairSavingsSummary {
    const newPurchaseValue = toNumber(request.device?.device?.purchaseValue);
    const totalLaborMinutes = (request.workItems ?? []).reduce((sum, workItem) => sum + (workItem.laborMinutes ?? 0), 0);
    const laborCost = (totalLaborMinutes / 60) * hourlyRate;
    const partsCost = calculatePartsCost(request.partOrders ?? []);
    const repairValue = laborCost + partsCost;

    return {
        newPurchaseValue,
        laborCost,
        partsCost,
        repairValue,
        savedValue: newPurchaseValue - repairValue,
    };
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
}
