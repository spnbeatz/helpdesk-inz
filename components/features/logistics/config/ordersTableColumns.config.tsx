import { TableUserEmail } from "@/components/composed/table/TableUserEmail";
import { TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { OrderListViewType } from "@/data/orders/types";
import { truncateText } from "@/utils/string.util";
import { OrderStatusChip } from "../components/orders/OrderStatusChip";
import { Description } from "@heroui/react";
import { formatRelativeDate } from "@/utils/date..util";

export const ordersTableColumns: TableColumn<OrderListViewType>[] = [
    { id: "id", name: "ID" },
    { id: "createdBy", name:"Created By", customValue:(item) => <TableUserEmail name={item.createdBy?.name || ""} avatarUrl={item.createdBy?.avatarUrl || ""}/>},
    { id: "reason", name: "Reason", customValue:(item) => truncateText(item.reason, 30)},
    { id: "status", name: "Status", customValue:(item) => <OrderStatusChip status={item.status}/>},
    { id: "reviewedBy", name: "Reviewed by", 
        customValue:(item)=> 
            item.reviewedBy ? (
                <TableUserEmail name={item.createdBy?.name || ""} avatarUrl={item.createdBy?.avatarUrl || ""}/>
            ) : <Description>No review</Description>
    },
    { id: "item_count", name: "Items count"},
    { id: "created_at", name: "Created at", customValue: (item) => formatRelativeDate(item.created_at)},
] 

export const ordersDefaultColumns: (keyof OrderListViewType)[] = [
    "id",
    "createdBy",
    "reason",
    "status",
    "reviewedBy",
    "item_count",
    "created_at"
]