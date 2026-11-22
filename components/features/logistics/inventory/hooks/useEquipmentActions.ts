"use client"

import { EquipmentListItemType } from "@/api/services/logistics.service";
import { useAccess } from "@/providers/access.provider";
import { useAuth } from "@/providers/auth.provider";

export const useEquipmentActions = (eq: EquipmentListItemType) => {
    const { hasRole } = useAccess();
    const { user } = useAuth();

    const isTechnician = hasRole("Technician");
    const isAdmin = hasRole("Administrator");
    const isSameLocation = 
        eq.location_id === user?.location_id && 
        eq.location?.parent_id === user?.location_id

    const canReassign = 
        !!user && 
        isTechnician &&
        !!eq.assignedTo
        ;

    const canAssign =
        !!user && 
        isTechnician &&
        !eq.assignedTo
        ;

    const canUnassign =
        !!user && 
        isTechnician &&
        !!eq.assignedTo
        ;

    const canOrder = 
        !!user &&
        isTechnician &&
        isAdmin &&
        !eq.assignedTo &&
        isSameLocation

    return {
        canReassign, canAssign, canUnassign, canOrder
    }
}