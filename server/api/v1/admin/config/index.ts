import { appConfigUpdateSchema } from '~~/server/utils/backend/validation';
import { getOrCreateAppConfig } from '~~/server/utils/backend/config';
import { createApiError } from '~~/server/utils/apiResponses';

export default defineEventHandler(async event => {
    if (event.method === 'GET') {
        return getOrCreateAppConfig();
    }

    if (event.method === 'PUT') {
        const body = appConfigUpdateSchema.parse(await readBody(event));

        const existing = await getOrCreateAppConfig();

        return prisma.appConfig.update({
            where: { id: existing.id },
            data: {
                hourlyRate: body.hourlyRate,
            },
        });
    }

    throw createApiError('Method not allowed', 405);
});
