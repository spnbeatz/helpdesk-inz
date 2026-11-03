"use client";

import { createActionsContext } from "@/components/ui/actions/createActionsContext";
import { useTicketActions } from "../hooks/useTicketActions";
import { useTicketActionHandlers } from "../hooks/useTicketActionsHandlers";
import type { TicketListItemType } from "@/api/services/tickets.service";

export const {
    Provider: TicketActionsProvider,
    useActionsContext: useTicketActionsContext
} = createActionsContext<
    TicketListItemType,
    ReturnType<typeof useTicketActions>,
    ReturnType<typeof useTicketActionHandlers>
>(
    useTicketActions,
    useTicketActionHandlers
);