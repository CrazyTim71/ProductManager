import { createApiError } from '~~/server/utils/apiResponses';
import { syncAutomaticRequestState } from '~~/server/utils/backend/automaticState';
import { createDefaultWorkItemsForRequest } from '~~/server/utils/backend/workItems';
import { getRouterParam } from 'h3';

export default defineEventHandler(async event => {
    const requestId = getRouterParam(event, 'id');

    if (!requestId) {
        throw createApiError('Request id missing', 400);
    }

    const createdWorkItems = await createDefaultWorkItemsForRequest({
        requestId,
        createdById: event.context.user?.userId ?? null,
    });

    await syncAutomaticRequestState({
        requestId,
        actorUserId: event.context.user?.userId ?? null,
    });

    event.node.res.statusCode = 201;
    return createdWorkItems;
});
