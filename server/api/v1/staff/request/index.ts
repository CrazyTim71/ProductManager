import { RepairRequestWithRelations } from '~~/types/req';
import { crud } from '../../../../utils/backend/crud';
import { RepairStatus } from '@prisma/client';

export default crud(prisma.repairRequest, {
    resourceName: 'Request',
    list: {
        run: async () => prisma.repairRequest.findMany({
            where: {
                statusHistory: {
                    none: {
                        status: RepairStatus.ARCHIVED,
                    },
                },
            },
            orderBy: { queuePosition: 'asc' },
            include: RepairRequestWithRelations,
        }),
    },
});
