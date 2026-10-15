import { Tab } from "@/components/ui/controls/tabs/Tabs"
import { useParams } from "next/navigation";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { InventoryColumn } from "../../logistics/components/ProductList";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { useModalStore } from "@/store/modals";
import { Section } from "@/components/ui/surfaces/Section";
import { Column, Row } from "@/components/ui/layout/flex";
import { Select, SelectOptionsType } from "@/components/ui/controls/inputs/Select";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuArrowRightLeft, LuTrash } from "react-icons/lu";

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

    const options: SelectOptionsType[] = [
        { id: "owned", textValue: "Owned items"},
        { id: "ordered", textValue: "Ordered items"}
    ]

    return (
        <Tab id="inventory">
            <Column Start className="gap-2 w-full">
                <Row CenterBetween className="w-full">
                    <Row Center>
                        <Select options={options} defaultValue="owned"/>
                        
                    </Row>
                    <Row Center className="gap-2">
                        <IconButton Icon={LuArrowRightLeft} className="bg-white/40">Change owner</IconButton>
                        <IconButton disabled Icon={LuTrash} className="bg-red-500/60 text-white" iconColor="white">Remove</IconButton>
                    </Row>
                </Row>
                <TableWithPagination
                    data={inventoryList ?? []}
                    columns={columns}
                    itemsPerPage={15}
                    sortBy="purchaseDate"
                    selectable
                    sortDir="desc"
                    onRowClick={(p) => handleOpenItemModal(p.id)}
                />
            </Column>


        </Tab>
    )
}

// musi byc dostep do selected items jakis a nie wewnatrz table komponenu