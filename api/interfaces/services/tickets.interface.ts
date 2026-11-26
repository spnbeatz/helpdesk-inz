import { TicketListItemType } from "@/api/services/tickets.service";
import { TicketsPageFiltersType } from "@/components/features/tickets/types/filters.types";
import { PaginatedResponse } from "@/api/types";
import { TicketAssignDataType, TicketCloseDataType, TicketFormDataType } from "@/components/features/tickets/types/form.types";
import { CommentView } from "@/data/comments/type";

export interface ITicketsService {
    getTicket(id?: string): Promise<TicketListItemType | undefined>,

    getTicketList(
        filter: TicketsPageFiltersType
    ): Promise<PaginatedResponse<TicketListItemType>>,

    createTicket(
        data: TicketFormDataType
    ): Promise<{ message: string }>,

    updateTicket(
        data: TicketFormDataType,
        files: File[]
    ): Promise<{}>,

    deleteTicket(
        ticketId?: string
    ): Promise<string>

    assignTechnician(
        data: TicketAssignDataType
    ): Promise<string>

    closeTicket(
        data: TicketCloseDataType
    ): Promise<string>

    getCommentsList(
        ticketId: string
    ): Promise<CommentView[]>
}