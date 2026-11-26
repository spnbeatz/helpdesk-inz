import { TicketsPageFiltersType } from "@/components/features/tickets/types/filters.types";
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
import { TicketAssignDataType, TicketCloseDataType, TicketFormDataType } from "@/components/features/tickets/types/form.types";
import { CommentView } from "@/data/comments/type";
import { commentsViewList } from "@/data/comments/mock";
import { sortResults } from "../utils";
import { useTicketDataStore } from "@/store/data/tickets.store";

export class TicketsService implements ITicketsService {

    private endpoint: string = "/tickets";

    constructor(
        private readonly api: ApiClient
    ) { }

    async getTicket(id?: string): Promise<TicketListItemType | undefined> {
        return getTicket_old(id)
    }

    async getTicketList(filter: TicketsPageFiltersType): Promise<PaginatedResponse<TicketListItemType>> {
        return getTicketList_old(filter)
    }

    async createTicket(data: TicketFormDataType): Promise<{ message: string }> {
        return createTicket_old(data);
    }

    async updateTicket(data: TicketFormDataType, files: File[]): Promise<{}> {
        return updateTicket_old(data, files);
    }

    async deleteTicket(ticketId?: string): Promise<string> {
        const deleteTicket = useTicketDataStore.getState().delete;
        const result = ticketId ? deleteTicket(ticketId) : "Cant delete ticket"
        return result;
    }

    async closeTicket(data: TicketCloseDataType): Promise<string> {

        const updateTicket = useTicketDataStore.getState().update;

        const dateNow = Date.now();
        const createdDate = new Date(data.created_at);

        const diff = (dateNow - createdDate.getTime()) / (1000 * 60);
        console.log("TicketsService: closed ticket - resulution time: ", diff);

        const result = updateTicket(data.id, {
            id: data.id,
            resolution_minutes: diff,
            resolved_at: new Date().toISOString(),
            status: "resolved",
        })

        return result;
    }

    async assignTechnician(data: TicketAssignDataType): Promise<string> {
        const updateTicket = useTicketDataStore.getState().update;
        const result = updateTicket(data.id, {
            id: data.id,
            status: data.status || "in_progress",
            technician_id: data.technician_id
        })
        console.log("Tickets service: assign technician - ", data.technician_id);
        return result;
    }

    async getCommentsList(ticketId: string): Promise<CommentView[]> {
        const comments = commentsViewList.filter((comment) => comment.content_id === ticketId && comment.content_type === "ticket");
        const sortedComments = sortResults(comments, "created_at", "desc");

        return sortedComments;
    }
}