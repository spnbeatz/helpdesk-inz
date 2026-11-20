import { TicketListItemType } from "@/api/services/tickets.service";
import { TicketsPageFiltersType } from "@/store/pages/tickets.store";
import { PaginatedResponse } from "@/api/types";
import { TicketFormDataType } from "@/components/features/tickets/modals/TicketFormModal";

export interface ITicketsService {
    getTicket(id?: string): Promise<TicketListItemType | undefined>,

    getTicketList(
        filter: TicketsPageFiltersType
    ): Promise<PaginatedResponse<TicketListItemType>>,

    createTicket(
        data: TicketFormDataType,
        files: File[]
    ): Promise<{}>,

    updateTicket(
        data: TicketFormDataType,
        files: File[]
    ): Promise<{}>,
}