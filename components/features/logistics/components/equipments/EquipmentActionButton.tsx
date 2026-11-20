"use client";

import { createActionButton } from "@/components/ui/actions/createActionButton";
import { useEquipmentActionsContext } from "../../context/equipmentActions.context";
import { getEquipmentActionsConfig } from "../../config/equipmentActions.config";

export const EquipmentActionButton = createActionButton(
    useEquipmentActionsContext,
    getEquipmentActionsConfig
)