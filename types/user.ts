export interface WebUser {
    id: string;
    username: string;
    avatarUrl?: string;
    isAdmin: boolean;
    isStaff: boolean;
    loggedIn: boolean;
}

export interface WebNotification {
    id: string;
    status: 'PENDING' | 'SENT' | 'FAILED';
    subject: string;
    body: string;
    requestId: string | null;
    messageChannelId: string | null;
    createdAt: string;
}
