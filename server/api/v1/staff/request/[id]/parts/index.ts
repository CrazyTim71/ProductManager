import { PartOrderWithRelations } from '~~/types/req';
import { createApiError } from '~~/server/utils/apiResponses';
import { getRouterParam } from 'h3';

export default defineEventHandler(async event => {
    const requestId = getRouterParam(event, 'id');

    if (!requestId) {
        throw createApiError('Request id missing', 400);
    }

    const request = await prisma.repairRequest.findUnique({
        where: { id: requestId },
        select: { id: true },
    });

    if (!request) {
        throw createApiError('Request not found', 404);
    }

    return prisma.partOrder.findMany({
        where: {
            requestId,
        },
        include: PartOrderWithRelations,
        orderBy: [
            { createdAt: 'desc' },
        ],
    });
});
