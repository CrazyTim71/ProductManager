import { partCatalogCreateSchema } from '~~/server/utils/backend/validation';

export default defineEventHandler(async event => {
    if (event.method === 'GET') {
        return prisma.partCatalog.findMany({
            orderBy: [
                { name: 'asc' },
                { createdAt: 'desc' },
            ],
        });
    }

    if (event.method === 'POST') {
        const body = partCatalogCreateSchema.parse(await readBody(event));

        const createdPart = await prisma.partCatalog.create({
            data: {
                name: body.name,
                manufacturer: body.manufacturer,
                sku: body.sku,
                description: body.description,
                unitCost: body.unitCost,
                retailPrice: body.retailPrice,
            },
        });

        return {
            message: 'Part catalog entry created',
            data: createdPart,
        };
    }

    throw createApiError('Method not allowed', 405);
});
