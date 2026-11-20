"use client"

import { useCallback, useMemo, useState } from "react";
import { Equipment } from "@/data/equipments";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { Selection, Table } from "@heroui/react";
import { InventorySortKey, useInventoryPageStore, useInventoryTableConfig } from "@/store/pages/inventory.store";
import { useModalStore } from "@/store/modals";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { inventoryTableColumns, mapInventoryTableItems } from "../../config/inventoryTableColumns";

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

    const setPage = useCallback((page: number) => {
        setFilters({page})
    }, [setFilters])

    return (
        <TableWithPagination
            data={productList}
            page={filters.page ?? 1}
            totalItems={productsResponse?.totalItems ?? 0}
            setPage={setPage}
            columns={columns}
            itemsPerPage={filters.itemsPerPage ?? 20}
            searchValue={filters.searchValue}
            sortBy={filters.sortBy}
            sortDir={filters.sortDir}
            selectable
            sortKeys={["name", "model", "manufacturer"]}
            setSort={(column) => {
                setFilters({
                    sortBy: column as InventorySortKey,
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