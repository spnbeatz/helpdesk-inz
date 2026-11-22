import type { ActionConfig } from "@/components/ui/actions/ActionButton";

import type { useEquipmentActions } from "../hooks/useEquipmentActions";

import { LuUserPlus, LuUserMinus, LuUserPen, LuShoppingCart } from "react-icons/lu";

export type EquipmentAction =
    | "assign"
    | "reassign"
    | "unassign"
    | "order";

export const getEquipmentActionsConfig = (
    permissions: ReturnType<typeof useEquipmentActions>
): Record<EquipmentAction, ActionConfig> => ({
    assign: {
        allowed: permissions.canAssign,
        Icon: LuUserPlus,
        label: "Assign user"
    },
    reassign: {
        allowed: permissions.canReassign,
        Icon: LuUserPen,
        label: "Reassign user"
    },
    unassign: {
        allowed: permissions.canUnassign,
        Icon: LuUserMinus,
        label: "Unassign"
    },
    order: {
        allowed: permissions.canOrder,
        Icon: LuShoppingCart,
        label: "Order"
    }
})