import { TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { InventoryItem } from "../components/ProductList";
import { useInventoryPageStore } from "@/store/pages/inventory.store";

export const inventoryTableColumns = (): TableColumn<InventoryItem>[] => {
    const { filters } = useInventoryPageStore();

    return [
        { id: "id", name: "ID" },
        { id: "assetTag", name: "Asset Tag" },
        { id: "name", name: "Name" },
        { id: "type", name: "Type" },
        { id: "model", name: "Model" },
        { id: "serialNumber", name: "Serial Number" },
        { id: "status", name: "Status" },

        ...(filters.userId === null
            ? []
            : [{ id: "assignedTo" as keyof InventoryItem, name: "User ID" }]),

        ...(filters.isInventory
            ? [{ id: "quantity" as keyof InventoryItem, name: "Quantity" }]
            : []),
    ];
}