import { PartOrderStatus } from '@prisma/client';

import { createApiError } from '~~/server/utils/apiResponses';

const PART_ORDER_TRANSITIONS: Record<PartOrderStatus, PartOrderStatus[]> = {
    [PartOrderStatus.DRAFT]: [
        PartOrderStatus.ORDERED,
        PartOrderStatus.ALREADY_IN_STOCK,
        PartOrderStatus.CANCELLED,
    ],
    [PartOrderStatus.ORDERED]: [
        PartOrderStatus.SHIPPED,
        PartOrderStatus.CANCELLED,
    ],
    [PartOrderStatus.SHIPPED]: [
        PartOrderStatus.RECEIVED,
        PartOrderStatus.CANCELLED,
    ],
    [PartOrderStatus.RECEIVED]: [
        PartOrderStatus.INSTALLED,
        PartOrderStatus.CANCELLED,
    ],
    [PartOrderStatus.ALREADY_IN_STOCK]: [
        PartOrderStatus.INSTALLED,
        PartOrderStatus.CANCELLED,
    ],
    [PartOrderStatus.INSTALLED]: [],
    [PartOrderStatus.CANCELLED]: [],
};

export function getAllowedPartOrderTransitions(status: PartOrderStatus) {
    return PART_ORDER_TRANSITIONS[status];
}

export function assertValidPartOrderTransition(from: PartOrderStatus, to: PartOrderStatus) {
    if (from === to) {
        return;
    }

    if (!PART_ORDER_TRANSITIONS[from].includes(to)) {
        throw createApiError(`Invalid part order transition: ${ from } -> ${ to }`, 400);
    }
}
