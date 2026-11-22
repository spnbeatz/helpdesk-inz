import { TicketListItemType } from "@/api/services/tickets.service";
import { createTableConfig } from "@/hooks/createTableConfig";
import { ticketsDefaultColumns, ticketTableId } from "../config/table.config";

export const useTicketsSettingsTableConfig =
    createTableConfig<TicketListItemType>(
        ticketTableId,
        ticketsDefaultColumns,
        "list"
    )