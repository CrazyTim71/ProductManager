import { createApiError } from '~~/server/utils/apiResponses';
import { emitNotificationBadgeForUser } from '~~/server/utils/backend/notificationCenter';
import { NotificationStatus } from '@prisma/client';

export default defineEventHandler(async event => {
    const userId = event.context.user?.userId;

    if (!userId) {
        throw createApiError('Unauthorized', 401);
    }

    if (event.method === 'GET') {
        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: [
                {
                    status: 'asc',
                },
                {
                    createdAt: 'desc',
                },
            ],
            take: 30,
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

        return notifications.map(item => ({
            ...item,
            createdAt: item.createdAt.toISOString(),
            status: item.status,
        }));
    }

    if (event.method === 'DELETE') {
        const deleted = await prisma.notification.deleteMany({
            where: {
                userId,
                status: {
                    not: 'PENDING',
                },
            },
        });

        await emitNotificationBadgeForUser(userId);

        return {
            message: 'Read notifications deleted',
            count: deleted.count,
        };
    }

    if (event.method === 'PUT') {
        const updated = await prisma.notification.updateMany({
            where: {
                userId,
                status: NotificationStatus.PENDING,
            },
            data: {
                status: NotificationStatus.SENT,
                sentAt: new Date(),
            },
        });

        await emitNotificationBadgeForUser(userId);

        return {
            message: 'Notifications marked as read',
            count: updated.count,
        };
    }

    throw createApiError('Method not allowed', 405);
});
