import { RepairRequestStatus } from '@prisma/client';

import { createApiError } from '~~/server/utils/apiResponses';
import {
    ensureChannelParticipants,
    ensureMessageChannel,
    getChatRequestAccessRecord,
} from '~~/server/utils/backend/chat';

export default defineEventHandler(async event => {
    const requestId = event.context.params?.id;
    const userId = event.context.user?.userId;

    if (!requestId) {
        throw createApiError('Request id missing', 400);
    }

    if (!userId) {
        throw createApiError('Unauthorized', 401);
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

    if (request.status === RepairRequestStatus.WAITING_FOR_REVIEW) {
        await prisma.repairRequest.update({
            where: { id: requestId },
            data: {
                status: RepairRequestStatus.WAITING_FOR_RESPONSE,
            },
        });
    }

    const requestAccess = await getChatRequestAccessRecord(requestId);
    if (!requestAccess) {
        throw createApiError('Request not found', 404);
    }

    const channel = await ensureMessageChannel(requestId, userId);
    await ensureChannelParticipants(channel.id, requestAccess, userId);

    return {
        message: 'Chat prepared',
        redirect: `/chat/room/${ requestId }`,
    };
});
