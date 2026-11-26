import { NotificationResponse } from "@/components/features/notifications/types/store.types";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { INotificationsService } from "../interfaces/services/notifications.interface";
import { useNotificationStore } from "@/components/features/notifications/store/index.store";
import { sortResults } from "../utils";

export class NotificationsService implements INotificationsService {

    private endpoint: string = "/notifications";

    constructor(
        private readonly api: IApiClient
    ){}

    async getHistory(): Promise<NotificationResponse> {
        let items = useNotificationStore.getState().history;

        items = sortResults(items, "createdAt", "desc");

        items = items.slice(0, 8)

        const unreadCount = useNotificationStore.getState().getUnreadCount();

        return {
            items, unreadCount
        }
    }
}