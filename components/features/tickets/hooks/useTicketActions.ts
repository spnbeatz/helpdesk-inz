"use client"

import { useAccess } from "@/providers/access.provider";
import { useAuth } from "@/providers/auth.provider";
import { TicketListItemType } from "@/api/services/tickets.service";

export const useTicketActions = (ticket: TicketListItemType) => {
    const { hasRole, hasPermission } = useAccess();
    const { user } = useAuth();

    const isAdmin = hasRole("Administrator");
    const isOwner = !!user && ticket.customer_id === user.id;
    const isTechnician = !!user && ticket.technician_id === user.id;

    const isClosed = ticket.status === "closed";
    const isAssigned = ticket.technician_id !== null;

    const canEdit =
        !!user &&
        hasPermission("tickets.edit") &&
        (isAdmin || isTechnician || isOwner);

    const canDelete =
        !!user &&
        hasPermission("tickets.delete") &&
        isAdmin;

    const canClose =
        !!user &&
        !isClosed &&
        hasPermission("tickets.close") &&
        (isAdmin || isTechnician);

    const canAssignToMe =
        !!user &&
        !isClosed &&
        !isAssigned &&
        hasPermission("tickets.assign.self");

    const canAssignOther =
        !!user &&
        !isClosed &&
        !isAssigned &&
        hasPermission("tickets.assign.other");

    const canReassign =
        !!user &&
        !isClosed &&
        isAssigned &&
        hasPermission("tickets.reassign") &&
        (isAdmin || isTechnician);

    const canRemoteConnect =
        !!user &&
        !isClosed &&
        hasPermission("tickets.remote") &&
        ticket.technician_id === user.id;

    return {
        canEdit,
        canDelete,
        canClose,
        canAssignToMe,
        canAssignOther,
        canReassign,
        canAssignTechnician: canAssignOther || canReassign,
        isAssigned,
        canRemoteConnect
    };
};