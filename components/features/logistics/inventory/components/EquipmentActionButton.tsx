"use client";

import { createActionButton } from "@/components/ui/actions/createActionButton";
import { useEquipmentActionsContext } from "../context/actions.context";
import { getEquipmentActionsConfig } from "../config/actions.config";

export const EquipmentActionButton = createActionButton(
    useEquipmentActionsContext,
    getEquipmentActionsConfig
)