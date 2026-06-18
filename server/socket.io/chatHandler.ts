import type { Socket, Server } from 'socket.io';

import {
    canAccessChatRequest,
    createChatMessage,
    createMessageNotifications,
    ensureChannelParticipants,
    ensureMessageChannel,
    getChatRequestAccessRecord,
    getChatRoomName,
    getUnreadNotificationCount,
    getUserRoomName,
    loadRecentChatMessages,
    markNotificationsAsReadForRoom,
} from '~~/server/utils/backend/chat';
import type {
    ChatJoinPayload,
    ChatSendPayload,
    ClientToServerEvents,
    ServerToClientEvents,
    SocketData,
} from '~~/types/socket';

const MAX_MESSAGE_LENGTH = 2000;

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type AppServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function registerChatSocketHandlers(io: AppServer, socket: AppSocket) {
    socket.on('notification:sync', async () => {
        await emitNotificationBadge(socket);
    });

    socket.on('chat:join', async (payload, ack) => {
        const requestId = normalizeRequestId(payload);

        if (!requestId) {
            ack({
                ok: false,
                error: 'Invalid room',
            });
            return;
        }

        const user = socket.data.user;
        if (!user) {
            ack({
                ok: false,
                error: 'Unauthorized',
            });
            return;
        }

        const request = await getChatRequestAccessRecord(requestId);
        if (!request || !canAccessChatRequest(user, request)) {
            ack({
                ok: false,
                error: 'Forbidden',
            });
            return;
        }

        const channel = await ensureMessageChannel(requestId, user.userId);
        await ensureChannelParticipants(channel.id, request, user.userId);

        const room = getChatRoomName(requestId);
        await socket.join(room);
        socket.data.joinedRequestIds.add(requestId);

        await markNotificationsAsReadForRoom(user.userId, requestId);
        await emitNotificationBadge(socket);

        const messages = await loadRecentChatMessages(channel.id, requestId);

        ack({
            ok: true,
            requestId,
            channelId: channel.id,
            messages,
        });
    });

    socket.on('chat:leave', payload => {
        const requestId = normalizeRequestId(payload);
        if (!requestId) {
            return;
        }

        const room = getChatRoomName(requestId);
        void socket.leave(room);
        socket.data.joinedRequestIds.delete(requestId);
    });

    socket.on('chat:send', async (payload, ack) => {
        const requestId = normalizeRequestId(payload);
        const content = payload.content.trim();

        if (!requestId) {
            ack({
                ok: false,
                error: 'Invalid room',
            });
            return;
        }

        if (!content || content.length > MAX_MESSAGE_LENGTH) {
            ack({
                ok: false,
                error: 'Message length invalid',
            });
            return;
        }

        const user = socket.data.user;
        if (!user) {
            ack({
                ok: false,
                error: 'Unauthorized',
            });
            return;
        }

        const request = await getChatRequestAccessRecord(requestId);
        if (!request || !canAccessChatRequest(user, request)) {
            ack({
                ok: false,
                error: 'Forbidden',
            });
            return;
        }

        const room = getChatRoomName(requestId);
        if (!socket.rooms.has(room)) {
            ack({
                ok: false,
                error: 'Join room first',
            });
            return;
        }

        const channel = await ensureMessageChannel(requestId, user.userId);
        await ensureChannelParticipants(channel.id, request, user.userId);

        const message = await createChatMessage(channel.id, requestId, user.userId, content);
        io.to(room).emit('chat:message', {
            requestId,
            message,
        });

        const activeInRoomUserIds = await getUserIdsInRoom(io, room);
        const createdNotifications = await createMessageNotifications(
            requestId,
            channel.id,
            user.userId,
            content,
            activeInRoomUserIds,
        );

        await Promise.all(Array.from(new Set(createdNotifications.map(item => item.userId))).map(async userId => {
            await emitNotificationBadgeForUser(io, userId);
        }));

        ack({
            ok: true,
        });
    });
}

async function emitNotificationBadge(socket: AppSocket) {
    const userId = socket.data.user?.userId;
    if (!userId) {
        socket.emit('notification:badge', { unreadCount: 0 });
        return;
    }

    const unreadCount = await getUnreadNotificationCount(userId);
    socket.emit('notification:badge', { unreadCount });
}

async function emitNotificationBadgeForUser(io: AppServer, userId: string) {
    const unreadCount = await getUnreadNotificationCount(userId);
    io.to(getUserRoomName(userId)).emit('notification:badge', { unreadCount });
}

async function getUserIdsInRoom(io: AppServer, room: string) {
    const sockets = await io.in(room).fetchSockets();
    const userIds = sockets
        .map(item => item.data.user?.userId)
        .filter((userId): userId is string => !!userId);

    return new Set(userIds);
}

function normalizeRequestId(payload: ChatJoinPayload | ChatSendPayload) {
    return payload.requestId.trim();
}
