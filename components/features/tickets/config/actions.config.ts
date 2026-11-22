import {
    LuPencil,
    LuTrash2,
    LuCircleX,
    LuUserRoundCheck,
    LuUserRoundPlus,
    LuPlugZap
} from "react-icons/lu";

import type { ActionConfig } from "@/components/ui/actions/ActionButton";
import type { useTicketActions } from "../hooks/useTicketActions";

export type TicketAction =
    | "edit"
    | "delete"
    | "close"
    | "assignSelf"
    | "assignTechnician"
    | "remoteConnect";

export const getTicketActionsConfig = (
    permissions: ReturnType<typeof useTicketActions>
): Record<TicketAction, ActionConfig> => ({
    edit: {
        allowed: permissions.canEdit,
        Icon: LuPencil,
        label: "Edit"
    },
    delete: {
        allowed: permissions.canDelete,
        Icon: LuTrash2,
        label: "Delete"
    },
    close: {
        allowed: permissions.canClose,
        Icon: LuCircleX,
        label: "Close ticket"
    },
    assignSelf: {
        allowed: permissions.canAssignToMe,
        Icon: LuUserRoundCheck,
        label: "Assign to me"
    },
    assignTechnician: {
        allowed: permissions.canAssignTechnician,
        Icon: LuUserRoundPlus,
        label: permissions.isAssigned
            ? "Reassign"
            : "Assign technician"
    },
    remoteConnect: {
        allowed: permissions.canRemoteConnect,
        Icon: LuPlugZap,
        label: "Remote connect"
    }
});