"use client";

import { useNotificationStore } from "../store/index.store";
import { ToastItem } from "./ToastItem";

export const ToastContainer = () => {
    const notifications = useNotificationStore(
        state => state.notifications
    );

    return (
        <div className="
            fixed top-6 left-6 z-[9999]
            flex flex-col gap-3
            w-[300px] max-w-[calc(100vw-2rem)]
        ">
            {notifications.map(notification => (
                <ToastItem
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </div>
    );
};