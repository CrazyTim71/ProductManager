import { NotificationStatus } from '@prisma/client';

import { createApiError } from '~~/server/utils/apiResponses';
import { emitNotificationBadgeForUser } from '~~/server/utils/backend/notificationCenter';

export default defineEventHandler(async event => {
    const notificationId = event.context.params?.id;
    const userId = event.context.user?.userId;

    if (!notificationId) {
        throw createApiError('Notification id missing', 400);
    }

    if (!userId) {
        throw createApiError('Unauthorized', 401);
    }

    if (event.method === 'PUT') {
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId,
            },
        });

        if (!notification || notification.userId !== userId) {
            throw createApiError('Notification not found', 404);
        }

        const updated = await prisma.notification.update({
            where: {
                id: notificationId,
            },
            data: {
                status: NotificationStatus.SENT,
                sentAt: new Date(),
            },
            select: {
                id: true,
                status: true,
                subject: true,
                body: true,
                requestId: true,
                messageChannelId: true,
                createdAt: true,
            },
        });

        await emitNotificationBadgeForUser(userId);

        return {
            ...updated,
            createdAt: updated.createdAt.toISOString(),
        };
    }

    if (event.method === 'DELETE') {
        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId,
            },
            select: {
                id: true,
                userId: true,
            },
        });

        if (!notification || notification.userId !== userId) {
            throw createApiError('Notification not found', 404);
        }

        await prisma.notification.delete({
            where: {
                id: notificationId,
            },
        });

        await emitNotificationBadgeForUser(userId);

        return {
            message: 'Notification deleted',
        };
    }

    throw createApiError('Method not allowed', 405);
});
