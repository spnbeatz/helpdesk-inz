import { TableColumn } from "@/components/ui/data-display/paginated-table/types";
import { User } from "@/data/users";
import { Avatar } from "@heroui/react";
import { Row } from "@/components/ui/layout/flex";
import { formatRelativeDate } from "@/utils/date..util";
import { TableUserEmail } from "@/components/composed/table/TableUserEmail";

export const usersSettingsTableId = "users.settings.table"

export const userTableColumns: TableColumn<User>[] = [
    { id: "id", name: "ID" },
    { id: "email", name: "Email", customValue: (user) => (
        <TableUserEmail 
            name={user.email}
            avatarUrl={user.avatarUrl}
        />
    )},
    { id: "firstName", name: "First name" },
    { id: "lastName", name: "Last Name" },
    { id: "locationName", name: "Location", customValue: (item) => item.locationName},
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


export const usersDefaultColumns: (keyof User)[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "locationName",
    "position",
    "createdAt",
    "lastLoginAt",
    "roleNames"
];