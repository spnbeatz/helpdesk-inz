import { Label, Description } from "@heroui/react";
import { Column, Row } from "@/components/ui/layout/flex";
import { NotificationHistoryItem } from "../types/store.types";
import { formatRelativeDate } from "@/utils/date..util";
import { useNotificationStore } from "../store/index.store";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { notificationColorMap, notificationIconMap } from "../map/index.map";
import { useQueryClient } from "@tanstack/react-query";

export const NotificationItem = ({ notification }: { notification: NotificationHistoryItem }) => {
    const markAsRead = useNotificationStore(state => state.markAsRead);
    const queryClient = useQueryClient();

    const handleMarkAsRead = () => {
        markAsRead(notification.id);
        queryClient.invalidateQueries({
            queryKey: ["notifications"]
        })
    }

    const Icon = notificationIconMap[notification.type];
    const iconColor = notificationColorMap[notification.type]

    return (
        <Row CenterStart className="w-full gap-4 p-2 px-4 items-start hover:bg-indigo-200/50 cursor-pointer rounded-lg" onClick={handleMarkAsRead}>
            <Icon size={20} className={`${iconColor} mt-1`} />
            <Column Start className="w-full">
                <Row CenterBetween className="w-full">
                    <Row Center className="gap-2">
                        <Label className={notification.isRead ? "font-normal cursor-pointer" : "cursor-pointer"}>{notification.title}</Label>

                    </Row>
                    {!notification.isRead && <BasicChip>Unread</BasicChip>}

                </Row>

                <Description>{notification.message}</Description>
                <Description>{formatRelativeDate(notification.createdAt)}</Description>
            </Column>

        </Row>
    )
}