import { getMethod } from 'h3';

import { createApiError } from '~~/server/utils/apiResponses';
import { findRecordOrThrow, getValidatedBody } from '~~/server/utils/backend/routeHelpers';

function getRecordNotFoundMessage(config: any) {
    return config.update?.notFoundMessage ||
        config.delete?.notFoundMessage ||
        config.get?.notFoundMessage ||
        `${ config.resourceName } not found`;
}

export function crud(model: any, config: any) {
    return defineEventHandler(async event => {
        const method = getMethod(event).toUpperCase();
        const { id } = event.context.params || {};

        if (!id) {
            if (method === 'GET') {
                if (!config.list) {
                    throw createApiError(`Method ${ method } is not allowed for ${ config.resourceName }`, 405);
                }

                return config.list.run({
                    event,
                    model,
                });
            }

            if (method === 'POST') {
                if (!config.create) {
                    throw createApiError(`Method ${ method } is not allowed for ${ config.resourceName }`, 405);
                }

                const body = await getValidatedBody(event, config.create.schema);
                await config.create.before?.({
                    event,
                    model,
                    body,
                });

                return config.create.run({
                    event,
                    model,
                    body,
                });
            }

            if (method === 'PUT' || method === 'DELETE') {
                throw createApiError(`${ config.resourceName } ID is required`, 400);
            }

            throw createApiError(`Method ${ method } is not allowed for ${ config.resourceName }`, 405);
        }

        if (method === 'GET') {
            if (!config.get) {
                const record = await model.findUnique({
                    where: { id },
                });

                if (!record) {
                    throw createApiError(`${ config.resourceName } not found`, 404);
                }

                return record;
            }

            const record = await findRecordOrThrow(
                () => model.findUnique({
                    where: { id },
                    include: config.get.include,
                }),
                config.get.notFoundMessage || `${ config.resourceName } not found`,
            );

            return config.get.run({
                event,
                model,
                id,
                record,
            });
        }

        const record = await findRecordOrThrow(
            () => model.findUnique({
                where: { id },
            }),
            getRecordNotFoundMessage(config),
        );

        if (method === 'PUT') {
            if (!config.update) {
                throw createApiError(`Method ${ method } is not allowed for ${ config.resourceName }`, 405);
            }

            const body = await getValidatedBody(event, config.update.schema);
            await config.update.before?.({
                event,
                model,
                id,
                record,
                body,
            });

            return config.update.run({
                event,
                model,
                id,
                record,
                body,
            });
        }

        if (method === 'DELETE') {
            if (!config.delete) {
                throw createApiError(`Method ${ method } is not allowed for ${ config.resourceName }`, 405);
            }

            await config.delete.before?.({
                event,
                model,
                id,
                record,
            });

            return config.delete.run({
                event,
                model,
                id,
                record,
            });
        }

        throw createApiError(`Method ${ method } is not allowed for ${ config.resourceName }`, 405);
    });
}
