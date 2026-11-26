"use client";

import { useEffect } from "react";
import { Notification } from "../types/store.types"
import { Label, Description, Button } from "@heroui/react";
import { Column, Row } from "@/components/ui/layout/flex";
import { formatRelativeDate } from "@/utils/date..util";
import { useNotificationStore } from "../store/index.store";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { notificationColorMap, notificationIconMap } from "../map/index.map";
import { LuX } from "react-icons/lu";

export const ToastItem = ({
    notification
}: {
    notification: Notification
}) => {
    const remove = useNotificationStore(state => state.remove);

    const Icon = notificationIconMap[notification.type];
    const iconColor = notificationColorMap[notification.type]

    useEffect(() => {
        if (!notification.duration) return;

        const timer = setTimeout(() => {
            remove(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
    }, [notification.id, notification.duration, remove]);

    return (
        <Row CenterBetween className="w-full gap-4 p-4 shadow-sm bg-white cursor-pointer rounded-lg z-[1000]">
            <Row CenterStart className="gap-4">
                <Icon size={20} className={`${iconColor} mt-1`} />
                <Column Start className="w-full">
                    <Label>{notification.title}</Label>
                    <Description>{notification.message}</Description>
                    <Description>{formatRelativeDate(notification.createdAt)}</Description>
                </Column>
            </Row>

            <LuX size={18} onClick={() => remove(notification.id)} className="text-danger cursor-pointer"/>
        </Row>
    )
}
