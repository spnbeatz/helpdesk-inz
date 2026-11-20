import { useOrdersList } from "@/queries/logistics/logistics.query";
import { useOrdersPageStore, useOrdersTableConfig } from "@/store/pages/orders.store"
import { ordersTableColumns } from "../../config/ordersTableColumns.config";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { useCallback } from "react";

export const OrdersTable = () => {

    const { filters, setFilters } = useOrdersPageStore();

    const { data: ordersData } = useOrdersList(filters);

    const { visibleColumns } = useOrdersTableConfig();

    const columns = ordersTableColumns.filter((column) =>
        visibleColumns.includes(column.id)
    )

    const setPage = useCallback((page: number) => {
        setFilters({page})
    },[setFilters])

    return (
        <TableWithPagination 
            data={ordersData?.items || []}
            totalItems={ordersData?.totalItems || 0}
            columns={columns}
            searchValue={filters.searchValue}
            sortBy={filters.sortBy}
            sortDir={filters.sortDir}
            itemsPerPage={filters.itemsPerPage || 22}
            page={filters.page || 1}
            setPage={setPage}
        />
    )
}