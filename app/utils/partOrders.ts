import { PartOrderStatus } from '@prisma/client';

export const partOrderTransitions: Record<PartOrderStatus, PartOrderStatus[]> = {
    [PartOrderStatus.DRAFT]: [PartOrderStatus.ORDERED, PartOrderStatus.ALREADY_IN_STOCK, PartOrderStatus.CANCELLED],
    [PartOrderStatus.ORDERED]: [PartOrderStatus.SHIPPED, PartOrderStatus.CANCELLED],
    [PartOrderStatus.SHIPPED]: [PartOrderStatus.RECEIVED, PartOrderStatus.CANCELLED],
    [PartOrderStatus.RECEIVED]: [PartOrderStatus.INSTALLED, PartOrderStatus.CANCELLED],
    [PartOrderStatus.ALREADY_IN_STOCK]: [PartOrderStatus.INSTALLED, PartOrderStatus.CANCELLED],
    [PartOrderStatus.INSTALLED]: [],
    [PartOrderStatus.CANCELLED]: [],
};
