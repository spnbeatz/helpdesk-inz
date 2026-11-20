import { ticketsList, TicketType } from "@/data/exampleTicketsList";
import { categoryList } from "@/data/categoryList";
import { priorityList } from "@/data/priorityList";
import { TicketsPageFiltersType } from "@/store/pages/tickets.store";
import { TicketFormDataType } from "@/components/features/tickets/modals/TicketFormModal";
import { usersList } from "@/data/users";
import { PaginatedResponse } from "../types";
import { createPaginatedData, searchResults, sortResults } from "../utils";

type UserMiniType = {
    id: string,
    email: string,
    avatarUrl: string,
    name: string
}

export type TicketListItemType = TicketType & {
    priority: string | undefined;
    category: string | undefined;
    customer: UserMiniType
};



export const getTicket = (id?: string): TicketListItemType | undefined => {
    const ticket = ticketsList.find(ticket => ticket.id === id);

    if (!ticket) return undefined;

    const user = usersList.find(
        user => user.id === ticket.customer_id
    );

    if (!user) return undefined;

    return {
        ...ticket,
        priority: priorityList.find(
            priority => priority.id === ticket.priorityId
        )?.name,
        category: categoryList.find(
            category => category.id === ticket.categoryId
        )?.name,
        customer: {
            id: user.id,
            email: user.email,
            avatarUrl: user.avatarUrl ?? "",
            name: `${user.firstName} ${user.lastName}`
        }
    };
};


export const getTicketList = (
    filter: TicketsPageFiltersType = {}
): PaginatedResponse<TicketListItemType> => {
    const {
        sortBy = "created_at",
        sortDir = "desc",
        status = "all",
        userId,
        searchValue,
        priorityId,
        categoryId,
        technicianId,
        createdBefore,
        createdAfter,
        limit,
        page,
        itemsPerPage
    } = filter;

    let result = [...ticketsList];

    // Status
    if (status !== "all") {
        result = result.filter(
            ticket => ticket.status === status
        );
    }

    // Priority
    if (priorityId && priorityId.length > 0) {
        result = result.filter(
            ticket => priorityId.includes(ticket.priorityId)
        );
    }

    // Category
    if (categoryId && categoryId.length > 0) {
        result = result.filter(
            ticket => categoryId.includes(ticket.categoryId)
        );
    }

    // Created after
    if (createdAfter) {
        const after = new Date(createdAfter);

        result = result.filter(
            ticket => new Date(ticket.created_at) >= after
        );
    }

    // Created before
    if (createdBefore) {
        const before = new Date(createdBefore);

        result = result.filter(
            ticket => new Date(ticket.created_at) <= before
        );
    }

    // Technician
    if (technicianId !== undefined) {
        result = result.filter(
            ticket => ticket.technician_id === technicianId
        );
    }

    // Customer
    if (userId) {
        result = result.filter(
            ticket => ticket.customer_id === userId
        );
    }

    result = searchResults<TicketType>(
        result,
        searchValue,
        ["title", "description"]
    )

    result = sortResults<TicketType>(
        result,
        sortBy, sortDir
    )

    // Limit
    if (limit !== undefined && Number.isFinite(limit)) {
        result = result.slice(
            0,
            Math.max(0, Math.floor(limit))
        );
    }

    // Map
    const mapped = result.map(ticket => {
        const user = usersList.find(
            user => user.id === ticket.customer_id
        );

        if (!user) {
            throw new Error(
                `Customer not found for ticket ${ticket.id}`
            );
        }

        return {
            ...ticket,

            priority: priorityList.find(
                priority => priority.id === ticket.priorityId
            )?.name,

            category: categoryList.find(
                category => category.id === ticket.categoryId
            )?.name,

            customer: {
                id: user.id,
                email: user.email,
                avatarUrl: user.avatarUrl ?? "",
                name: `${user.firstName} ${user.lastName}`
            }
        };
    });

    const data = createPaginatedData<TicketListItemType>(
        mapped,
        { page, itemsPerPage }
    )

    return data;
};


export const createTicket = async (
    formData: TicketFormDataType,
    files: File[]
) => {
    const body = new FormData();

    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("categoryId", formData.categoryId);
    body.append("priorityId", formData.priorityId);

    files.forEach(file => {
        body.append("files", file);
    });

    console.log("create ticket", body);

    return {}

    /*     return fetch("/api/tickets", {
            method: "POST",
            body
        }); */
};

export const updateTicket = async (
    formData: TicketFormDataType,
    files: File[]
) => {
    const body = new FormData();

    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("categoryId", formData.categoryId);
    body.append("priorityId", formData.priorityId);

    files.forEach(file => {
        body.append("files", file);
    });

    console.log("update ticket", body)

    return {}

    /*     return fetch(`/api/tickets/${formData.id}`, {
            method: "PUT",
            body
        }); */
};