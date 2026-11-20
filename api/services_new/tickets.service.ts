import { TicketsPageFiltersType } from "@/store/pages/tickets.store";
import { ApiClient } from "../config/client";
import { ITicketsService } from "../interfaces/services/tickets.interface";
import { TicketListItemType } from "../services/tickets.service";

import { 
    getTicket as getTicket_old,
    getTicketList as getTicketList_old,
    createTicket as createTicket_old,
    updateTicket as updateTicket_old
 } from "../services/tickets.service";
import { PaginatedResponse } from "../types";
import { TicketFormDataType } from "@/components/features/tickets/modals/TicketFormModal";

export class TicketsService implements ITicketsService {

    private endpoint: string = "/tickets";

    constructor(
        private readonly api: ApiClient
    ){}

    async getTicket(id?: string): Promise<TicketListItemType | undefined> {
        return getTicket_old(id)
    }

    async getTicketList(filter: TicketsPageFiltersType): Promise<PaginatedResponse<TicketListItemType>> {
        return getTicketList_old(filter)
    }

    async createTicket(data: TicketFormDataType, files: File[]): Promise<{}> {
        return createTicket_old(data, files);
    }

    async updateTicket(data: TicketFormDataType, files: File[]): Promise<{}> {
        return updateTicket_old(data, files);
    }
}