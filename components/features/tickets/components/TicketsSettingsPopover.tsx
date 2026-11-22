
import { ticketsTableColumns } from "../config/table.config"
import { useTicketsPageStore } from "../store/page.store";
import { useTicketsSettingsTableConfig } from "../store/table.store";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover"

export const TicketsSettingsPopover = createSettingsPopover(
    useTicketsPageStore,
    useTicketsSettingsTableConfig,
    ticketsTableColumns
)