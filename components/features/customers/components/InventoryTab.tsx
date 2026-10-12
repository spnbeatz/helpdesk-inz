import { Tab } from "@/components/ui/controls/tabs/Tabs"
import { useParams } from "next/navigation";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { InventoryColumn } from "../../logistics/components/ProductList";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { useModalStore } from "@/store/modals";

export const InventoryTab = () => {

    const params = useParams<{ id: string }>();
    const { data: inventoryList } = useEquipmentList({ userId: params.id });
    const { openModal } = useModalStore();

    const columns: InventoryColumn[] = [
        { id: "id", name: "ID" },
        { id: "assetTag", name: "Asset Tag" },
        { id: "name", name: "Name" },
        { id: "type", name: "Type" },
        { id: "model", name: "Model" },
        { id: "serialNumber", name: "Serial Number" },
        { id: "status", name: "Status" },
        { id: "manufacturer", name: "Manufacturer" },
        { id: "location", name: "Location" },
        { id: "purchaseDate", name: "Purchase Date" },
        { id: "warrantyUntil", name: "Warranty until" }
    ];

    if (!inventoryList) return null;

    const handleOpenItemModal = (productId: string) => {
        openModal("inventoryItem", { productId });;
    }

    return (
        <Tab id="inventory">
            <TableWithPagination
                data={inventoryList ?? []}
                columns={columns}
                itemsPerPage={15}
                sortBy="purchaseDate"
                sortDir="desc"
                onRowClick={(p) => handleOpenItemModal(p.id)}
            />
        </Tab>
    )
}