import { Tab } from "@/components/ui/controls/tabs/Tabs"
import { useParams } from "next/navigation";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { useModalStore } from "@/store/modals";
import { Column, Row } from "@/components/ui/layout/flex";
import { Select } from "@/components/ui/controls/inputs/Select";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuArrowRightLeft, LuTrash } from "react-icons/lu";
import { useMemo, useState } from "react";
import { customerPageInventoryTableColumns, mapInventoryTableItems } from "../../logistics/config/inventoryTableColumns";
import { FilterOption } from "@/components/composed/filters/types";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";
import { useInventoryPageStore } from "@/store/pages/inventory.store";

export const InventoryTab = () => {

    const params = useParams<{ id: string }>();
    const { data: products } = useEquipmentList({ userId: params.id });
    const [page, setPage] = useState<number>();
    const { openModal } = useModalStore();

    const { filters, setFilters } = useInventoryPageStore();

    const inventoryList = useMemo(() => {
        return mapInventoryTableItems(products?.items)
    }, [products]);

    const handleOpenItemModal = (productId: string) => {
        openModal("inventoryItem", { productId });;
    }

    const options: FilterOption[] = [
        { value: "owned", label: "Owned items" },
        { value: "ordered", label: "Ordered items" }
    ]


    return (
        <Tab id="inventory">
            <Column Start className="gap-2 w-full h-full min-h-0 relative">
                <Row CenterBetween className="w-full">
                    <Row Center>
                        <Select options={options} defaultValue="owned" />

                    </Row>
                    <Row Center className="gap-2">
                        <IconButton Icon={LuArrowRightLeft} className="bg-white/40">Change owner</IconButton>
                        <IconButton disabled Icon={LuTrash} className="bg-red-500/60 text-white" iconColor="white">Remove</IconButton>
                    </Row>
                </Row>
                <Column Start className="h-full w-full">
                    <PaginatedTable
                        data={inventoryList}
                        totalItems={products?.totalItems}
                        columns={customerPageInventoryTableColumns}
                        selectable
                        onRowClick={(p) => handleOpenItemModal(p.id)}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </Column>

            </Column>


        </Tab>
    )
}

// musi byc dostep do selected items jakis a nie wewnatrz table komponenu