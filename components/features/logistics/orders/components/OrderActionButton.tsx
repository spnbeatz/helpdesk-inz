"use client";

import { createActionButton } from "@/components/ui/actions/createActionButton";
import { useOrderActionsContext } from "../context/actions.context";
import { getOrderActionsConfig } from "../config/actions.config";

export const OrderActionButton = createActionButton(
    useOrderActionsContext,
    getOrderActionsConfig
);