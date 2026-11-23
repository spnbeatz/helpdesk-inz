"use client"

import { useAuth } from "@/providers/auth.provider";
import { useInventoryOwnedPageStore } from "../store/page.store"
import { useEffect, useMemo } from "react";
import { useEquipmentList } from "../../inventory/queries/query";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";
import { customerPageInventoryTableColumns, mapInventoryTableItems } from "../../inventory/config/table.config";

export const OwnedEquipmentList = () => {
    const filters = useInventoryOwnedPageStore(state => state.filters);
    const setFilters = useInventoryOwnedPageStore(state => state.setFilters);

    const { data: equipmentData } = useEquipmentList(filters);

        const equipmentList = useMemo(() => {
            const items = mapInventoryTableItems(equipmentData?.items);
            return items;
        }, [equipmentData]);

    return (
        <PaginatedTable 
            data={equipmentList}
            totalItems={equipmentData?.totalItems}
            filters={filters}
            setFilters={setFilters}
            columns={customerPageInventoryTableColumns}
        />
    )
}