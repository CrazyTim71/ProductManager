import { partCatalogCreateSchema } from '~~/server/utils/backend/validation';
import { pickDefinedFields } from '~~/server/utils/backend/routeHelpers';

export default defineEventHandler(async event => {
    const id = event.context.params?.id;

    if (!id) {
        throw createApiError('Part catalog id missing', 400);
    }

    if (event.method === 'GET') {
        const part = await prisma.partCatalog.findUnique({
            where: { id },
        });

        if (!part) {
            throw createApiError('Part catalog entry not found', 404);
        }

        return part;
    }

    if (event.method === 'PUT') {
        const body = partCatalogCreateSchema.partial().parse(await readBody(event));

        const updated = await prisma.partCatalog.update({
            where: { id },
            data: pickDefinedFields({
                name: body.name,
                manufacturer: body.manufacturer,
                sku: body.sku,
                description: body.description,
                unitCost: body.unitCost,
                retailPrice: body.retailPrice,
            }),
        });

        return {
            message: 'Part catalog entry updated',
            data: updated,
        };
    }

    if (event.method === 'DELETE') {
        await prisma.partCatalog.delete({
            where: { id },
        });

        return {
            message: 'Part catalog entry deleted',
        };
    }

    throw createApiError('Method not allowed', 405);
});
