"use client";

import { createActionButton } from "@/components/ui/actions/createActionButton";
import { useTicketActionsContext } from "../context/actions.context";
import { getTicketActionsConfig } from "../config/actions.config";

export const TicketActionButton = createActionButton(
    useTicketActionsContext,
    getTicketActionsConfig,
    "dropdown"
);