import type { Prisma } from '@prisma/client';

export const RepairRequestWithRelations = {
    assignedStaff: true,
    attachments: true,
    customer: true,
    device: true,
    messageChannel: true,
    notes: { include: { author: true } },
    workItems: { include: { workItemType: true } },
    partOrders: { include: { catalogPart: true } },
} satisfies Prisma.RepairRequestInclude;

export type RepairRequestWithRelations = Prisma.RepairRequestGetPayload<{
    include: typeof RepairRequestWithRelations;
}>;


export const DeviceWithRelations = {
    deviceCategories: {
        include: {
            category: true,
        },
    },
    deviceBrand: true,
} satisfies Prisma.DeviceInclude;

export type DeviceWithRelations = Prisma.DeviceGetPayload<{
    include: typeof DeviceWithRelations;
}>;
