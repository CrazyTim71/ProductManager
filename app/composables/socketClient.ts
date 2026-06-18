import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { registerToastManager } from '~/composables/toastManager';
import { useStore } from '~/store';
import type { ClientToServerEvents, ServerToClientEvents } from '~~/types/socket';

let socketClient: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
let socketInitialized = false;

export function useSocketClient() {
    if (!import.meta.client) {
        return null;
    }

    const store = useStore();

    if (!socketClient) {
        socketClient = io({
            path: '/socket.io',
            withCredentials: true,
            transports: [
                'websocket',
                'polling',
            ],
        });
    }

    if (!socketInitialized) {
        socketInitialized = true;

        registerToastManager(socketClient);

        socketClient.on('connect', () => {
            socketClient?.emit('me');
            socketClient?.emit('notification:sync');
        });

        socketClient.on('notification:badge', payload => {
            store.setNotificationUnreadCount(payload.unreadCount);
        });

        socketClient.on('disconnect', () => {
            store.setNotificationUnreadCount(0);
        });
    }

    return socketClient;
}
