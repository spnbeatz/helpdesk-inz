import { TicketListItemType } from "@/api/services/tickets.service";
import { TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { TableUserEmail } from "@/components/composed/table/TableUserEmail";
import { truncateText } from "@/utils/string.util";
import { PriorityChip } from "../components/TicketInfoChips";

export const ticketsTableColumns:TableColumn<TicketListItemType>[] = [
    { id: "id", name: "ID" },
    { id: "customer_id", name: "Created By", customValue: (item) => (
        <TableUserEmail 
            name={item.customer.name}
            avatarUrl={item.customer.avatarUrl}
        />
    )},
    { id: "title", name: "Title", customValue: (item) => truncateText(item.title, 30)},
    { id: "description", name: "Description", customValue: (item) => truncateText(item.description, 30)},
    { id: "category", name: "Category"},
    { id: "status", name: "Status"},
    { id: "priority", name: "Priority", customValue: (item) => <PriorityChip priority={item.priority}/>},
    { id: "technician_id", name: "Technician assigned"},
]

export const ticketsDefaultColumns: (keyof TicketListItemType)[] = [
    "id",
    "customer_id",
    "title",
    "category",
    "status",
    "priority",
    "technician_id"
]