import type { Socket, Server } from 'socket.io';

import { parseSocketCookie } from '../utils/auth';
import { registerChatSocketHandlers } from './chatHandler';
import { getUserRoomName } from '~~/server/utils/backend/chat';
import type {
    ClientToServerEvents,
    ServerToClientEvents,
    SocketData,
    SocketSession,
} from '~~/types/socket';

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type AppServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function initSocket(io: AppServer) {
    io.use(checkCookies);

    io.on('connection', socket => {
        socket.data.joinedRequestIds = new Set();

        if (socket.data.user?.userId) {
            socket.join(getUserRoomName(socket.data.user.userId));
        }

        socket.on('me', () => {
            emitMe(socket);
        });

        registerChatSocketHandlers(io, socket);
        emitMe(socket);
    });
}

function emitMe(socket: AppSocket) {
    const loggedIn = !!socket.data.user;
    const data: SocketSession = {
        loggedIn,
        admin: socket.data.user?.role === 'ADMIN',
        username: socket.data.user?.username ?? '',
        userid: socket.data.user?.userId ?? '',
        staff: socket.data.user?.role === 'STAFF',
    };

    socket.emit('me', data);
}

function checkCookies(socket: AppSocket, next: (err?: Error) => void) {
    parseSocketCookie(socket).then(user => {
        if (!user) {
            return next();
        }

        socket.data.user = user;
        next();
    }).catch(() => next());
}
