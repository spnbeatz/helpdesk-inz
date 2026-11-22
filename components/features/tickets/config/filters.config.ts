import { TicketListItemType } from "@/api/services/tickets.service";
import { TicketsPageFiltersType, TicketsSortKey } from "../types/filters.types";
import { FilterConfig } from "@/components/composed/filters/types";
import { TicketType } from "@/data/exampleTicketsList";

export const ticketsFiltersConfig: FilterConfig<TicketsPageFiltersType, TicketsSortKey> = {
    sortOptions: [
        { value: "title", label: "Title"},
        { value: "created_at", label: "Created date"},
        { value: "categoryId", label: "Category"}
    ],

    filters: [
        {
            key: "priorityId",
            label: "Priority",
            type: "multi-select",
        },
        {
            key: "categoryId",
            label: "Category",
            type: "multi-select"
        },
        {
            label: "Created between",
            type: 'date-range',
            fromKey: "createdAfter",
            toKey: "createdBefore"
        }
    ]
}