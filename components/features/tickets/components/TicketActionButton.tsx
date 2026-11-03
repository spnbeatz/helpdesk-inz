"use client";

import { createActionButton } from "@/components/ui/actions/createActionButton";
import { useTicketActionsContext } from "../context/ticketActions.context";
import { getTicketActionsConfig } from "../config/ticketActions.config";

export const TicketActionButton = createActionButton(
    useTicketActionsContext,
    getTicketActionsConfig
);