"use client"

import { useAccess } from "@/providers/access.provider"
import { useAuth } from "@/providers/auth.provider"
import { OrderListItemType } from "@/data/orders_old"

export const useOrderActions = (order: OrderListItemType) => {
    const { hasRole, hasPermission } = useAccess();
    const { user } = useAuth();

    const isAdmin = hasRole("Administrator");
    const isManager = hasRole("Manager");
    const isOwner = !!user && order.created_by_id === user.id;
    const isReviewer = !!user && order.reviewed_by_id === user.id;

    const canAccept =
        !!user &&
        hasPermission("orders.accept") &&
        (isAdmin || isManager) &&
        order.status === "pending"
    
    const canDecline =
        !!user &&
        hasPermission("orders.decline") &&
        (isAdmin || isManager)
        order.status === "pending"

    const canRealize =
        !!user &&
        hasPermission("orders.realize") &&
        isOwner &&
        order.status === "accepted"

    const canComplete =
        !!user &&
        hasPermission("orders.complete") &&
        isOwner &&
        order.status === "in_progress"

    return {
        canAccept,
        canComplete,
        canDecline,
        canRealize
    }
}