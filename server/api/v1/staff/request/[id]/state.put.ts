import { RepairRequestStatus, RepairWorkItemStatus } from '@prisma/client';
import { z } from 'zod';

import { createApiError } from '~~/server/utils/apiResponses';
import { createNotification } from '~~/server/utils/backend/notificationCenter';

const requestStateSchema = z.object({
    status: z.enum([
        RepairRequestStatus.CANCELLED,
        RepairRequestStatus.REJECTED,
        RepairRequestStatus.COMPLETED,
    ]),
}).strict();

export default defineEventHandler(async event => {
    const requestId = event.context.params?.id;

    if (!requestId) {
        throw createApiError('Request id missing', 400);
    }

    const body = requestStateSchema.parse(await readBody(event));

    const request = await prisma.repairRequest.findUnique({
        where: { id: requestId },
        include: {
            customer: {
                select: {
                    id: true,
                },
            },
            workItems: {
                select: {
                    id: true,
                    status: true,
                },
            },
        },
    });

    if (!request) {
        throw createApiError('Request not found', 404);
    }

    const hasWorkItems = request.workItems.length > 0;
    const allWorkItemsDone = hasWorkItems && request.workItems.every(item => item.status === RepairWorkItemStatus.DONE);

    if (!allWorkItemsDone) {
        throw createApiError('All work items must be done before changing request state', 400);
    }

    const updatedRequest = await prisma.repairRequest.update({
        where: { id: requestId },
        data: {
            status: body.status,
            closedAt: body.status === RepairRequestStatus.COMPLETED ? new Date() : request.closedAt,
            rejectedReason: body.status === RepairRequestStatus.REJECTED ? (request.rejectedReason ?? 'Rejected by staff') : request.rejectedReason,
        },
    });

    await createNotification({
        userId: request.customer.id,
        requestId,
        subject: 'Request status changed',
        body: `Your request status is now ${ body.status }`,
    });

    return {
        message: 'Request state updated',
        data: updatedRequest,
    };
});
