import { RepairRequestStatus, RepairStatus } from '@prisma/client';

import { createApiError } from '~~/server/utils/apiResponses';
import { isRequestArchived, setRepairStatus } from '~~/server/utils/backend/repairStatus';

export default defineEventHandler(async event => {
    const requestId = event.context.params?.id;
    const userId = event.context.user?.userId ?? null;

    if (!requestId) {
        throw createApiError('Request id missing', 400);
    }

    const request = await prisma.repairRequest.findUnique({
        where: { id: requestId },
        select: {
            id: true,
            status: true,
        },
    });

    if (!request) {
        throw createApiError('Request not found', 404);
    }

    if (request.status !== RepairRequestStatus.COMPLETED) {
        throw createApiError('Only completed requests can be archived', 400);
    }

    if (await isRequestArchived(requestId)) {
        return {
            message: 'Request already archived',
        };
    }

    await setRepairStatus(requestId, RepairStatus.ARCHIVED, userId, 'Archived by staff');

    return {
        message: 'Request archived',
    };
});
