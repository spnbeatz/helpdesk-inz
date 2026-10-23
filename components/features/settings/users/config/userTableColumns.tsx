import { TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { User } from "@/data/users";
import { Avatar } from "@heroui/react";
import { Row } from "@/components/ui/layout/flex";
import { formatRelativeDate } from "@/utils/date..util";

export const userTableColumns: TableColumn<User>[] = [
    { id: "id", name: "ID" },
    {
        id: "email", name: "Email", customValue: (item) => (
            <Row CenterStart className="gap-2 group">
                <Avatar className="w-[22px] h-[22px] rounded-lg">
                    <Avatar.Image src={item.avatarUrl || undefined} />
                    <Avatar.Fallback className="text-black/50">{item.email.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                </Avatar>
                {item.email}
            </Row>
        )
    },
    { id: "firstName", name: "First name" },
    { id: "lastName", name: "Last Name" },
    { id: "location", name: "Location" },
    { id: "position", name: "Position" },
    {
        id: "status", name: "Status",
        customValue: (item) => (
            <p className={`px-2 flex items-center 
                                    justify-center shadow-sm rounded-sm text-xs
                                    ${item.status === "active" ? "bg-green-500/20"
                    : item.status === "inactive" ? "bg-gray-400/20"
                        : "bg-red-500/20"}`}
            >
                {item.status}
            </p>
        )
    },
    { id: "createdAt", name: "Created At", customValue: (item) => formatRelativeDate(item.createdAt) },
    { id: "lastLoginAt", name: "Last login at", customValue: (item) => item.lastLoginAt ? formatRelativeDate(item.lastLoginAt) : "Not logged yet" },
    { id: "roleNames", name: "Roles" },
    { id: "phone", name: "Phone" },
    { id: "department", name: "Department" },
];
