
import { create } from "zustand";
import { Notification, NotificationHistoryItem } from "../types/store.types";
import { useQueryClient } from "@tanstack/react-query";

type NotificationStore = {
    // Tymczasowe powiadomienia (toast)
    notifications: Notification[];

    // Historia powiadomień (symulacja bazy)
    history: NotificationHistoryItem[];

    add: (notification: Omit<Notification, "id" | "createdAt">) => string;
    remove: (id: string) => void;
    clear: () => void;

    addToHistory: (
        notification: Omit<NotificationHistoryItem, "id" | "createdAt" | "isRead" | "readAt">
    ) => string;

    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeFromHistory: (id: string) => void;
    clearHistory: () => void;

    getUnreadCount: () => number;

    success: (message: string, title?: string) => string;
    error: (message: string, title?: string) => string;
    warning: (message: string, title?: string) => string;
    info: (message: string, title?: string) => string;
};

const mockHistory: NotificationHistoryItem[] = [
    {
        id: "NOT-001",
        type: "info",
        title: "New ticket assigned",
        message: "Ticket #TCK-1024 has been assigned to you.",
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        isRead: false,
        readAt: null,
    },
    {
        id: "NOT-002",
        type: "warning",
        title: "Ticket requires attention",
        message: "Ticket #TCK-1018 has been waiting for 3 days.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        isRead: false,
        readAt: null,
    },
    {
        id: "NOT-003",
        type: "success",
        title: "Order completed",
        message: "Order #ORD-0021 has been successfully completed.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        isRead: true,
        readAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
    {
        id: "NOT-004",
        type: "info",
        title: "New comment",
        message: "A new comment was added to ticket #TCK-1009.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        isRead: true,
        readAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    },
];

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],
    history: mockHistory,

    add: (notification) => {
        const id = crypto.randomUUID();
        set(state => ({
            notifications: [
                ...state.notifications,
                {
                    ...notification,
                    id,
                    createdAt: new Date().toISOString(),
                }
            ]
        }));

        useNotificationStore.getState().addToHistory(notification);

        return id;
    },

    remove: (id) => {
        set(state => ({
            notifications: state.notifications.filter(item => item.id !== id)
        }));
    },

    clear: () => set({ notifications: [] }),

    addToHistory: (notification) => {
        const id = crypto.randomUUID();

        set(state => ({
            history: [
                {
                    ...notification,
                    id,
                    createdAt: new Date().toISOString(),
                    isRead: false,
                    readAt: null,
                },
                ...state.history,
            ]
        }));

        return id;
    },

    markAsRead: (id) => {
        set(state => ({
            history: state.history.map(item =>
                item.id === id
                    ? {
                        ...item,
                        isRead: true,
                        readAt: item.readAt ?? new Date().toISOString(),
                    }
                    : item
            )
        }));

    },

    markAllAsRead: () => {
        const now = new Date().toISOString();
        set(state => ({
            history: state.history.map(item =>
                item.isRead
                    ? item
                    : { ...item, isRead: true, readAt: now }
            )
        }));
    },

    removeFromHistory: (id) => {
        set(state => ({
            history: state.history.filter(item => item.id !== id)
        }));
    },

    clearHistory: () => set({ history: [] }),

    getUnreadCount: () =>
        get().history.filter(item => !item.isRead).length,

    success: (message, title) =>
        get().add({ type: "success", message, title, duration: 4000 }),

    error: (message, title) =>
        get().add({ type: "error", message, title, duration: 6000 }),

    warning: (message, title) =>
        get().add({ type: "warning", message, title, duration: 5000 }),

    info: (message, title) =>
        get().add({ type: "info", message, title, duration: 4000 }),
}));
