
import { ticketsTableColumns } from "../config/ticketsTableColumns.config"
import { useTicketsPageStore, useTicketsSettingsTableConfig } from "@/store/pages/tickets.store"
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover"

export const TicketsSettingsPopover = createSettingsPopover(
    useTicketsPageStore,
    useTicketsSettingsTableConfig,
    ticketsTableColumns
)