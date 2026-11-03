"use client";

import { createActionButton } from "@/components/ui/actions/createActionButton";
import { useOrderActionsContext } from "../../context/orderActions.context";
import { getOrderActionsConfig } from "../../config/orderActions.config";

export const OrderActionButton = createActionButton(
    useOrderActionsContext,
    getOrderActionsConfig
);