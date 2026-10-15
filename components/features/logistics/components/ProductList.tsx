import { useState } from "react";
import { Equipment } from "@/data/equipments";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { Selection, Table } from "@heroui/react";
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { useModalStore } from "@/store/modals";
import { Column } from "../../../ui/layout/flex";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { inventoryTableColumns } from "../config/inventoryTableColumns";

export type InventoryItem = Equipment & {
    quantity?: number;
};

export type InventoryColumn = {
    id: keyof InventoryItem;
    name: string;
};

export const ProductList = () => {

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
    const { filters, setFilters, itemsPerPage } = useInventoryPageStore();
    const { openModal } = useModalStore();

    const { data: productList } = useEquipmentList(filters);

    const handleOpenItemModal = (productId: string) => {
        openModal("inventoryItem", { productId });
        setSelectedKeys(new Set());
    }

    return (
        <TableWithPagination
            data={productList ?? []}
            columns={inventoryTableColumns()}
            itemsPerPage={itemsPerPage}
            searchValue={filters.searchValue}
            sortBy={filters.sortBy}
            sortDir={filters.sortDir}
            selectable
            setSort={(column) => {
                setFilters({
                    sortBy: column,
                    sortDir:
                        filters.sortBy === column
                            ? filters.sortDir === "asc"
                                ? "desc"
                                : "asc"
                            : "asc",
                });
            }}
            onRowClick={(product) => {
                handleOpenItemModal(product.id);
            }}
        />

    )
}