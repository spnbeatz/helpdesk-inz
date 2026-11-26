import {
    LuBell,
    LuCircleCheck,
    LuCircleAlert,
    LuCircleX,
    LuInfo,
} from "react-icons/lu";
import type { IconType } from "react-icons";

export type NotificationType =
    | "success"
    | "error"
    | "warning"
    | "info";

export const notificationIconMap: Record<NotificationType, IconType> = {
    success: LuCircleCheck,
    error: LuCircleX,
    warning: LuCircleAlert,
    info: LuInfo,
};

export const notificationColorMap: Record<NotificationType, string> = {
    success: "text-success",
    error: "text-danger",
    warning: "text-warning",
    info: "text-primary",
};