import {
    LuCheck,
    LuCheckCheck,
    LuClock,
    LuX
} from "react-icons/lu";

import type { ActionConfig } from "@/components/ui/actions/ActionButton";
import type { useOrderActions } from "../hooks/useOrderActions";

export type OrderAction =
    | "accept"
    | "decline"
    | "realize"
    | "complete";

export const getOrderActionsConfig = (
    permissions: ReturnType<typeof useOrderActions>
): Record<OrderAction, ActionConfig> => ({
    accept: {
        allowed: permissions.canAccept,
        Icon: LuCheck,
        label: "Accept"
    },
    decline: {
        allowed: permissions.canDecline,
        Icon: LuX,
        label: "Decline"
    },
    realize: {
        allowed: permissions.canRealize,
        Icon: LuClock,
        label: "Realize"
    },
    complete: {
        allowed: permissions.canComplete,
        Icon: LuCheckCheck,
        label: "Complete"
    }
});