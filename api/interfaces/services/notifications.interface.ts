import { NotificationResponse } from "@/components/features/notifications/types/store.types";

export interface INotificationsService {
    getHistory(): Promise<NotificationResponse>
}