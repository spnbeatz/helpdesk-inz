

export type TicketFormDataType = {
    id?: string,
    title: string,
    description: string,
    categoryId: string,
    files?: File[] | File
}