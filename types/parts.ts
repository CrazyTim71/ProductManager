import type { PartCatalog, PartOrderStatus } from '@prisma/client';

import type { PartOrderWithRelationsType } from './req';

export type PartCatalogEntry = PartCatalog;

export interface PartOrderUpdatePayload {
    quantity?: number;
    supplierName?: string | null;
    estimatedCost?: number | null;
    actualCost?: number | null;
    savedValue?: number | null;
    status?: PartOrderStatus;
    note?: string | null;
    workItemId?: string | null;
}

export interface StepPartCreatePayload {
    catalogPartId: string;
    quantity: number;
    supplierName?: string;
    estimatedCost?: number | null;
    note?: string;
}

export interface PartOrderResponse {
    data: PartOrderWithRelationsType;
    message: string;
}
