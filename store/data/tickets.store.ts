import { TicketListItemType } from "@/api/services/tickets.service"
import { TicketFormDataType } from "@/components/features/tickets/types/form.types";
import { ticketsList, TicketType } from "@/data/exampleTicketsList"
import { create } from "zustand"

export type TicketDataStoreType = {
    data: TicketType[];
    getById: (id: string) => TicketType | undefined;
    add: (ticket: TicketFormDataType) => string;
    update: (id: string, ticket: Partial<TicketType>) => string;
    delete: (id: string) => string;
};

const initialTicketData: TicketType = {
    id: "",
    title: "",
    description: "",
    priorityId: "",
    categoryId: "",
    status: "pending",
    created_at: "",
    updated_at: "",
    resolved_at: null,
    resolution_minutes: null,
    technician_id: null,
    customer_id: "",

}

export const useTicketDataStore = create<TicketDataStoreType>((set, get) => ({
    data: ticketsList,

    getById: (id) => {
        return get().data.find(ticket => ticket.id === id);
    },
    add: (ticket) => {
        const now = new Date().toISOString();

        console.log(ticket, "create Data")

        const newTicket: TicketType = {
            ...initialTicketData,
            id: crypto.randomUUID().slice(0, 8),
            created_at: now,
            updated_at: now,
            title: ticket.title || "",
            description: ticket.description || "",
            priorityId: ticket.priorityId || "",
            categoryId: ticket.categoryId || "",
            customer_id: ticket.customer_id || ""
        };

        console.log(newTicket, "new ticket")

        set(state => ({
            data: [...state.data, newTicket],
        }));

        return "Succesfully created ticket"
    },

    update: (id, ticketData) => {
        set(state => {
            return {
                data: state.data.map(ticket =>
                    ticket.id === id
                        ? {
                            ...ticket,
                            ...ticketData,
                            id: ticket.id,
                            updated_at: new Date().toISOString(),
                        }
                        : ticket
                ),
            };
        });

        return "Successfully updated ticket";
    },
    delete: (id) => {
        set(state => ({
            data: state.data.filter(ticket => ticket.id !== id)
        }));

        return "Successfully deleted ticket";
    }
}));