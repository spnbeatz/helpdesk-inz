import { ticketsList, TicketType } from "@/data/exampleTicketsList";
import { categoryList } from "@/data/categoryList";
import { priorityList } from "@/data/priorityList";
import { TicketsPageFiltersType } from "@/store/pages/tickets.store";
import { TicketFormDataType } from "@/components/modals/tickets/TicketFormModal";


export type TicketListItemType = TicketType & {
    priority: string | undefined;
    category: string | undefined;
};

export const getTicket = (id?: string): TicketType | undefined => {
    return ticketsList.find((ticket) => ticket.id === id) || undefined;
};

export const getTicketList = (
    filter: TicketsPageFiltersType = {}
): TicketListItemType[] => {
    console.log(filter);

    const {
        sortBy = "created_at",
        sortDir = "desc",
        status = "all",
        userId,
        searchValue,
        priorityId,
        categoryId
    } = filter;

    let result = [...ticketsList];

    // Status
    if (status !== "all") {
        result = result.filter(
            (ticket) => ticket.status === status
        );
    }

    // Priority
    if (priorityId) {
        result = result.filter(
            (ticket) => ticket.priorityId === priorityId
        );
    }

    //Category
    if (categoryId) {
        result = result.filter(
            (ticket) => ticket.categoryId === categoryId
        );
    }

    // User / customer
    if (userId) {
        result = result.filter(
            (ticket) => ticket.customer_id === userId
        );
    }

    // Search
    if (searchValue?.trim()) {
        const search = searchValue.trim().toLowerCase();

        result = result.filter((ticket) =>
            ticket.id.toLowerCase().includes(search) ||
            ticket.title.toLowerCase().includes(search) ||
            ticket.description.toLowerCase().includes(search)
        );
    }

    // Sort
    result.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (valueA === valueB) return 0;

        const comparison = String(valueA).localeCompare(
            String(valueB),
            undefined,
            {
                numeric: true,
                sensitivity: "base",
            }
        );

        return sortDir === "asc"
            ? comparison
            : -comparison;
    });

    return result.map((ticket) => ({
        ...ticket,
        priority: priorityList.find(
            (priority) => priority.id === ticket.priorityId
        )?.name,
        category: categoryList.find(
            (category) => category.id === ticket.categoryId
        )?.name
    }));
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