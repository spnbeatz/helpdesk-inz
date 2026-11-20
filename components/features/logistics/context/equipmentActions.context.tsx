"use client";

import { createActionsContext } from "@/components/ui/actions/createActionsContext";
import { useEquipmentActions } from "../hooks/useEquipmentActions";
import { useEquipmentActionsHandlers } from "../hooks/useEquipmentActionsHandlers";
import type { EquipmentListItemType } from "@/api/services/logistics.service";

export const {
    Provider: EquipmentActionsProvider,
    useActionsContext: useEquipmentActionsContext
} = createActionsContext<
    EquipmentListItemType,
    ReturnType<typeof useEquipmentActions>,
    ReturnType<typeof useEquipmentActionsHandlers>
>(
    useEquipmentActions,
    useEquipmentActionsHandlers
)