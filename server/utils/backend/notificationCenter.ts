import { NotificationStatus } from '@prisma/client';

import { socketServer } from '~~/server/plugins/socket.io.server';
import { getUnreadNotificationCount, getUserRoomName } from '~~/server/utils/backend/chat';
import { prisma } from '~~/server/utils/prisma';

export async function createNotification(input: {
    userId: string;
    requestId?: string | null;
    messageChannelId?: string | null;
    subject: string;
    body: string;
}) {
    const created = await prisma.notification.create({
        data: {
            userId: input.userId,
            requestId: input.requestId ?? null,
            messageChannelId: input.messageChannelId ?? null,
            status: NotificationStatus.PENDING,
            subject: input.subject,
            body: input.body,
        },
    });

    await emitNotificationBadgeForUser(input.userId);

    // TODO: Trigger email notification delivery once mail transport is available.

    return created;
}

export async function emitNotificationBadgeForUser(userId: string) {
    if (!socketServer) {
        return;
    }

    const unreadCount = await getUnreadNotificationCount(userId);
    socketServer.to(getUserRoomName(userId)).emit('notification:badge', {
        unreadCount,
    });
}
