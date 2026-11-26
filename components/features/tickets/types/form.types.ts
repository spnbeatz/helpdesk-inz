import { TicketStatusType } from "@/data/exampleTicketsList"


export type TicketFormDataType = {
    id?: string,
    title?: string,
    description?: string,
    priorityId?: string,
    categoryId?: string,
    files?: File[] | File,
    customer_id?: string
}

export type TicketAssignDataType = {
    id: string,
    technician_id: string,
    status: TicketStatusType
}

export type TicketCloseDataType = {
    id: string,
    created_at: string
}