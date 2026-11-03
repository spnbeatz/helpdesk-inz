"use client";

import { createActionsContext } from "@/components/ui/actions/createActionsContext";
import { useOrderActions } from "../hooks/useOrderActions";
import { useOrderActionHandlers } from "../hooks/useOrderActionsHandlers";
import type { OrderListItemType } from "@/data/orders_old";

export const {
    Provider: OrderActionsProvider,
    useActionsContext: useOrderActionsContext
} = createActionsContext<
    OrderListItemType,
    ReturnType<typeof useOrderActions>,
    ReturnType<typeof useOrderActionHandlers>
>(
    useOrderActions,
    useOrderActionHandlers
);