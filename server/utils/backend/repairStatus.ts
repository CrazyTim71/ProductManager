import { RepairRequestStatus, RepairStatus, RepairWorkItemStatus } from '@prisma/client';

import { createApiError } from '~~/server/utils/apiResponses';
import { prisma } from '~~/server/utils/prisma';

export async function setRepairStatus(requestId: string, status: RepairStatus, createdById?: string | null, note?: string) {
    const request = await prisma.repairRequest.findUnique({
        where: { id: requestId },
        include: {
            device: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!request) {
        throw createApiError('Request not found', 404);
    }

    const latest = await prisma.repairStatusHistory.findFirst({
        where: { requestId },
        orderBy: {
            startedAt: 'desc',
        },
    });

    if (latest?.status === status) {
        return latest;
    }

    if (latest && !latest.endedAt) {
        const endTime = new Date();
        const durationMinutes = Math.max(0, Math.round((endTime.getTime() - latest.startedAt.getTime()) / 60000));

        await prisma.repairStatusHistory.update({
            where: { id: latest.id },
            data: {
                endedAt: endTime,
                durationMinutes,
            },
        });
    }

    return prisma.repairStatusHistory.create({
        data: {
            requestId,
            deviceId: request.device?.id ?? null,
            status,
            note: note ?? null,
            createdById: createdById ?? null,
        },
    });
}

export async function getLatestRepairStatus(requestId: string) {
    return prisma.repairStatusHistory.findFirst({
        where: { requestId },
        orderBy: {
            startedAt: 'desc',
        },
    });
}

export async function isRequestArchived(requestId: string) {
    const archivedCount = await prisma.repairStatusHistory.count({
        where: {
            requestId,
            status: RepairStatus.ARCHIVED,
        },
    });

    return archivedCount > 0;
}

export async function syncRepairStatusFromDefaultSteps(requestId: string, createdById?: string | null) {
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

    if (request.status !== RepairRequestStatus.ACCEPTED && request.status !== RepairRequestStatus.COMPLETED) {
        return null;
    }

    const workItems = await prisma.repairWorkItem.findMany({
        where: {
            requestId,
        },
        include: {
            workItemType: {
                select: {
                    isDefault: true,
                    sortOrder: true,
                },
            },
        },
    });

    const defaultItems = workItems.filter(item => item.workItemType.isDefault);

    if (defaultItems.length === 0) {
        return null;
    }

    const inProgressItems = workItems.filter(item => item.status === RepairWorkItemStatus.IN_PROGRESS);

    const hasRepairInProgress = inProgressItems.some(item => item.orderIndex >= 30 && item.orderIndex < 90);
    if (hasRepairInProgress) {
        return setRepairStatus(requestId, RepairStatus.IN_REPAIR, createdById ?? null);
    }

    const hasDiagnosisInProgress = inProgressItems.some(item => item.orderIndex >= 10 && item.orderIndex < 30);
    if (hasDiagnosisInProgress) {
        return setRepairStatus(requestId, RepairStatus.IN_DIAGNOSIS, createdById ?? null);
    }

    const firstDefaultStep = [...defaultItems].sort((left, right) => {
        if (left.workItemType.sortOrder !== right.workItemType.sortOrder) {
            return left.workItemType.sortOrder - right.workItemType.sortOrder;
        }

        return left.orderIndex - right.orderIndex;
    })[0];

    if (!firstDefaultStep || firstDefaultStep.status !== RepairWorkItemStatus.DONE) {
        return null;
    }

    const completedDefaults = defaultItems.filter(item => item.status === RepairWorkItemStatus.DONE);

    if (completedDefaults.length === 0) {
        return null;
    }

    const allDefaultsCompleted = completedDefaults.length === defaultItems.length;

    if (allDefaultsCompleted) {
        return setRepairStatus(requestId, RepairStatus.IN_OUTGOING, createdById ?? null);
    }

    const highestCompletedOrder = completedDefaults.reduce((maxOrder, item) => {
        return Math.max(maxOrder, item.orderIndex);
    }, 0);

    if (highestCompletedOrder < 10) {
        return setRepairStatus(requestId, RepairStatus.RECEIVED, createdById ?? null);
    }

    if (highestCompletedOrder < 30) {
        return setRepairStatus(requestId, RepairStatus.IN_DIAGNOSIS, createdById ?? null);
    }

    if (highestCompletedOrder < 90) {
        return setRepairStatus(requestId, RepairStatus.IN_REPAIR, createdById ?? null);
    }

    return setRepairStatus(requestId, RepairStatus.IN_QA, createdById ?? null);
}
