export type NotificationType =
    | "success"
    | "error"
    | "warning"
    | "info";

export type Notification = {
    id: string;
    type: NotificationType;
    title?: string;
    message: string;
    duration?: number;
    createdAt: string;
};

export type NotificationHistoryItem = Omit<Notification, "duration"> & {
    isRead: boolean;
    readAt: string | null;
};

export type NotificationResponse = {
    items: NotificationHistoryItem[],
    unreadCount: number
}