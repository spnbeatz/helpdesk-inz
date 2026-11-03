import { TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { InventoryItem } from "../components/products/ProductList";
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { EquipmentListItemType } from "@/api/services/logistics.service";
import { EquipmentStatus, EquipmentType } from "@/data/equipments";
import { Row } from "@/components/ui/layout/flex";
import { Avatar, Description } from "@heroui/react";
import { UserMinType } from "@/data/users";

export type InventoryTableItemType = {
    id: string,
    assetTag: string,
    serialNumber: string,
    name: string,
    type: EquipmentType,
    model: string,
    manufacturer: string,
    assignedTo: string | null,
    assignedUser: UserMinType | null,
    status: EquipmentStatus,
    purchaseDate: string,
    warrantyUntil: string | null,
    location?: string
}

export const inventoryTableColumns = (): TableColumn<InventoryTableItemType>[] => {

    return [
        { id: "id", name: "ID" },
        { id: "assetTag", name: "Asset Tag" },
        { id: "serialNumber", name: "Serial"},
        { id: "name", name: "Name" },
        { id: "type", name: "Type" },
        { id: "model", name: "Model" },
        { id: "manufacturer", name: "Manufacturer" },
        {
            id: "assignedTo", name: "Assigned To", customValue: (item) => {
                console.log(item.assignedTo, "assigned to");
                if(!item.assignedUser) return <Description>No assignment</Description>
                return (
                    <Row CenterStart className="gap-2 group">
                        <Avatar className="w-[22px] h-[22px] rounded-lg">
                            <Avatar.Image src={item.assignedUser?.avatarUrl || undefined} />
                            <Avatar.Fallback className="text-black/50">{item.assignedUser?.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                        </Avatar>
                        {item.assignedUser?.name}
                    </Row>
                )
            }
        },
        { id: "location", name: "Location"},
        { id: "status", name: "Status" },
        { id: "purchaseDate", name: "Purchase Date"},
        { id: "warrantyUntil", name: "Warranty Until"}

    ];
}

export const mapInventoryTableItems = (items: EquipmentListItemType[] | undefined): InventoryTableItemType[] => {
    if (!items) return [];
    return items.map((item) => {
        console.log(item.assignedTo)
        return {
            id: item.id,
            assetTag: item.assetTag,
            serialNumber: item.serialNumber,
            name: item.product.name,
            type: item.product.type,
            model: item.product.model,
            manufacturer: item.product.manufacturer,
            assignedTo: item.assignedTo,
            assignedUser: item.assignedUser,
            status: item.status,
            purchaseDate: item.purchaseDate,
            warrantyUntil: item.warrantyUntil,
            location: item.location?.name

        }
    })
}