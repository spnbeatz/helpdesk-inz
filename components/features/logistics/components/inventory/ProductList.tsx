"use client"

import { useMemo, useState } from "react";
import { Equipment } from "@/data/equipments";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { Selection } from "@heroui/react";
import { useInventoryPageStore, useInventoryTableConfig } from "@/store/pages/inventory.store";
import { useModalStore } from "@/store/modals";
import { inventoryTableColumns, mapInventoryTableItems } from "../../config/inventoryTableColumns";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";

export type InventoryItem = Equipment & {
    quantity?: number;
};

export type InventoryColumn = {
    id: keyof InventoryItem;
    name: string;
};

export const ProductList = () => {

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
    const { filters, setFilters } = useInventoryPageStore();
    const { openModal } = useModalStore();

    // znalezc problem z wydajnoscia!

    const { visibleColumns } = useInventoryTableConfig();

    const columns = useMemo(() =>
        inventoryTableColumns.filter((col) =>
            visibleColumns.includes(col.id)
        )
        , [visibleColumns]);

    const { data: productsResponse } = useEquipmentList(filters);

    const productList = useMemo(() => {
        const items = mapInventoryTableItems(productsResponse?.items);
        return items;
    }, [productsResponse]);


    const handleOpenItemModal = (productId: string) => {
        openModal("inventoryItem", { productId });
        setSelectedKeys(new Set());

    }

    return (
        <PaginatedTable 
            data={productList}
            totalItems={productsResponse?.totalItems}
            filters={filters}
            setFilters={setFilters}
            selectable
            onRowClick={(item) => handleOpenItemModal(item.id)}
            columns={columns}
        />
    )
}