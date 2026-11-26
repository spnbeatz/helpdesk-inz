import { Button, Popover, Badge } from "@heroui/react";
import { LuBell, LuCheckCheck } from "react-icons/lu";
import { useNotificationsHistory } from "../queries/query";
import { Column, Row } from "@/components/ui/layout/flex";
import { useNotificationStore } from "../store/index.store";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationItem } from "./NotificationItem";


export const Notifications = () => {

    const queryClient = useQueryClient();

    const { data: history } = useNotificationsHistory();
    const markAllAsRead = useNotificationStore(state => state.markAllAsRead);

    const handleMarkAllAread = () => {
        markAllAsRead();
        queryClient.invalidateQueries({
            queryKey: ["notifications"]
        })
    }

    return (
        <Popover>
            <Badge.Anchor>
                <Button variant="ghost" className={"bg-white shadow-sm rounded-lg shrink-0 w-10 h-10"}><LuBell /></Button>
                {history && history.unreadCount > 0 && <Badge color="danger" size="sm">
                    {history.unreadCount}
                </Badge>}
            </Badge.Anchor>

            <Popover.Content className={"min-w-[400px] rounded-lg bg-white-80"} placement="bottom">
                <Popover.Dialog>
                    <Popover.Heading className="flex pl-2 flex-row items-center justify-between w-full gap-2">
                        <Row Center className="gap-2">
                            <Badge.Anchor>
                                <LuBell size={18}/>
                                {history && history.unreadCount > 0 && <Badge color="danger" size="sm">
                                    {history.unreadCount}
                                </Badge>}
                            </Badge.Anchor>
                            Notifications
                        </Row>
                        <Button variant="ghost" className={"rounded-lg"} onClick={handleMarkAllAread}>
                            <Row Center className="gap-2">
                                <LuCheckCheck /> Mark all read
                            </Row>
                        </Button>
                    </Popover.Heading>
                    <Column Start className="gap-2 mt-4">
                        {history && history.items.map((item) => {
                            return (
                                <NotificationItem notification={item} />
                            )
                        })}
                    </Column>

                    {history && history?.items.length < 1 || !history && <p className="w-full text-center p-4 text-muted">No notifications yet</p>}
                </Popover.Dialog>
            </Popover.Content>
        </Popover>
    )
}

