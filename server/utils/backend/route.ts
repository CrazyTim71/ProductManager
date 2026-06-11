import type { H3Event } from 'h3';

import { createApiError } from '~~/server/utils/apiResponses';

type RouteEntityHandler<TRecord, TResult> = (context: {
    event: H3Event;
    id: string;
    record: TRecord;
}) => Promise<TResult> | TResult;

type WithExistingRouteEntityOptions<TRecord, TResult> = {
    resourceName: string;
    find: (id: string) => Promise<TRecord | null>;
    notFoundMessage?: string;
    handler: RouteEntityHandler<TRecord, TResult>;
};

export async function withExistingRouteEntity<TRecord, TResult>(
    event: H3Event,
    options: WithExistingRouteEntityOptions<TRecord, TResult>,
) {
    const { id } = event.context.params || {};

    if (!id) {
        throw createApiError(`${ options.resourceName } ID is required`, 400);
    }

    const record = await options.find(id);

    if (!record) {
        throw createApiError(options.notFoundMessage || `${ options.resourceName } not found`, 404);
    }

    return options.handler({
        event,
        id,
        record,
    });
}
