import { TableUserEmail } from "@/components/composed/table/TableUserEmail";
import { TableColumn } from "@/components/ui/data-display/paginated-table/types";
import { ReportListItemType } from "@/data/reports/types";
import { formatRelativeDate } from "@/utils/date..util";
import { LuFile } from "react-icons/lu";

export const reportsTableId = "reports.table";

export const reportsTableColumns: TableColumn<ReportListItemType>[] = [
    { id: "id", name: "ID" },
    { id: "name", name: "Name" },
    { id: "type", name: "Type"},
    { id: "status", name: "Status"},
    { id: "created_at", name: "Created at", customValue: (item) => formatRelativeDate(item.created_at)},
    { id: "file_size", name: "Size"},
    { id: "format", name: "Format"},
    { id: "created_by_id", name: "Created by", customValue: (item) => <TableUserEmail name={item.created_by_name || ""} avatarUrl={item.created_by_avatar || ""}/>},
    { id: "file_url", name: "Link", customValue: (item) => <LuFile className="cursor-pointer" onClick={() => window.open(`/reports/${item.id}`, "_blank")}/>}
]

export const reportsDefaultColumns: (keyof ReportListItemType)[] = [
    "id",
    "name",
    "type",
    "status",
    "created_at",
    "file_size",
    "file_url"
]