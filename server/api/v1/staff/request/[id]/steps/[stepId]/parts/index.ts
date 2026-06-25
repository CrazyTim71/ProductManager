import { PartOrderStatus } from '@prisma/client';

import { partOrderCreateSchema } from '~~/server/utils/backend/validation';
import { PartOrderWithRelations } from '~~/types/req';
import { createApiError } from '~~/server/utils/apiResponses';
import { getRouterParam } from 'h3';

export default defineEventHandler(async event => {
    const requestId = getRouterParam(event, 'id');
    const stepId = getRouterParam(event, 'stepId');

    if (!requestId || !stepId) {
        throw createApiError('Request id or step id missing', 400);
    }

    const step = await prisma.repairWorkItem.findUnique({
        where: { id: stepId },
        select: {
            id: true,
            requestId: true,
            deviceId: true,
        },
    });

    if (!step || step.requestId !== requestId) {
        throw createApiError('Work item not found', 404);
    }

    if (event.method === 'GET') {
        return prisma.partOrder.findMany({
            where: {
                requestId,
                workItemId: stepId,
            },
            include: PartOrderWithRelations,
            orderBy: [
                { createdAt: 'desc' },
            ],
        });
    }

    if (event.method === 'POST') {
        const body = partOrderCreateSchema.parse(await readBody(event));

        const catalogPart = await prisma.partCatalog.findUnique({
            where: {
                id: body.catalogPartId,
            },
        });

        if (!catalogPart) {
            throw createApiError('Catalog part not found', 404);
        }

        const createdById = event.context.user?.userId ?? null;
        const estimatedCost = body.estimatedCost ?? (catalogPart.unitCost ? Number(catalogPart.unitCost) * body.quantity : null);

        const partOrder = await prisma.partOrder.create({
            data: {
                requestId,
                deviceId: step.deviceId,
                workItemId: stepId,
                catalogPartId: catalogPart.id,
                createdById,
                quantity: body.quantity,
                status: PartOrderStatus.DRAFT,
                orderedName: catalogPart.name,
                supplierName: body.supplierName,
                estimatedCost,
                note: body.note,
            },
            include: PartOrderWithRelations,
        });

        return {
            message: 'Part added to step',
            data: partOrder,
        };
    }

    throw createApiError('Method not allowed', 405);
});
