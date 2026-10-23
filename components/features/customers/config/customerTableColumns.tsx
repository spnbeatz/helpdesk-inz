import { TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { CustomerType } from "@/data/users";
import { Row } from "@/components/ui/layout/flex";
import { Avatar } from "@heroui/react";

export const customerTableColumns: TableColumn<CustomerType>[] = [
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
    { id: "name", name: "Name" },
    { id: "location", name: "Location" },

    { id: "phone", name: "Phone" },
    { id: "department", name: "Department" },
    { id: "position", name: "Position" },
]