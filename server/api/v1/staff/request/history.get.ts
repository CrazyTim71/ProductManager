import { RepairRequestStatus, RepairStatus } from '@prisma/client';

import { RepairRequestWithRelations } from '~~/types/req';

export default defineEventHandler(async () => {
    return prisma.repairRequest.findMany({
        where: {
            OR: [
                { status: RepairRequestStatus.CANCELLED },
                { status: RepairRequestStatus.REJECTED },
                { status: RepairRequestStatus.COMPLETED },
                {
                    statusHistory: {
                        some: {
                            status: RepairStatus.ARCHIVED,
                        },
                    },
                },
            ],
        },
        include: RepairRequestWithRelations,
        orderBy: {
            updatedAt: 'desc',
        },
    });
});
