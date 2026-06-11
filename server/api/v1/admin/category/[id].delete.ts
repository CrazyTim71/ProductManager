import { getRequiredRouteId } from '~~/server/utils/backend/routeHelpers';

export default defineEventHandler(async event => {
    const id = getRequiredRouteId(event, 'Device category ID is required');

    const category = await prisma.deviceCategory.findUnique({
        where: { id },
    });

    if (!category) {
        throw createApiError('Device category not found', 404);
    }

    await prisma.deviceCategory.delete({
        where: { id },
    });

    return { message: 'Device category deleted' };
});
