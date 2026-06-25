import { partOrderUpdateSchema } from '~~/server/utils/backend/validation';
import { assertValidPartOrderTransition } from '~~/server/utils/backend/partOrders';
import { PartOrderWithRelations } from '~~/types/req';
import { createApiError } from '~~/server/utils/apiResponses';
import { getRouterParam } from 'h3';

export default defineEventHandler(async event => {
    const requestId = getRouterParam(event, 'id');
    const partId = getRouterParam(event, 'partId');

    if (!requestId || !partId) {
        throw createApiError('Request id or part id missing', 400);
    }

    const existing = await prisma.partOrder.findUnique({
        where: { id: partId },
    });

    if (!existing || existing.requestId !== requestId) {
        throw createApiError('Part order not found', 404);
    }

    if (event.method === 'PUT') {
        const body = partOrderUpdateSchema.parse(await readBody(event));

        if (body.status) {
            assertValidPartOrderTransition(existing.status, body.status);
        }

        const updated = await prisma.partOrder.update({
            where: { id: partId },
            data: {
                quantity: body.quantity,
                supplierName: body.supplierName,
                estimatedCost: body.estimatedCost,
                actualCost: body.actualCost,
                savedValue: body.savedValue,
                note: body.note,
                status: body.status,
                workItemId: body.workItemId,
                orderedAt: body.status === 'ORDERED' && existing.status !== 'ORDERED' ? new Date() : undefined,
                receivedAt: body.status === 'RECEIVED' && existing.status !== 'RECEIVED' ? new Date() : undefined,
                installedAt: body.status === 'INSTALLED' && existing.status !== 'INSTALLED' ? new Date() : undefined,
            },
            include: PartOrderWithRelations,
        });

        return {
            message: 'Part order updated',
            data: updated,
        };
    }

    if (event.method === 'DELETE') {
        await prisma.partOrder.delete({
            where: { id: partId },
        });

        return {
            message: 'Part order deleted',
        };
    }

    throw createApiError('Method not allowed', 405);
});
