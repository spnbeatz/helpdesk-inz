import { useOrdersList } from "../queries/query";
import { useOrdersPageStore } from "../store/page.store";
import { useOrdersTableConfig } from "../store/table.store";
import { ordersTableColumns } from "../config/table.config";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";

export const OrdersTable = () => {

    const { filters, setFilters } = useOrdersPageStore();

    const { data: ordersData } = useOrdersList(filters);

    const { visibleColumns } = useOrdersTableConfig();

    const columns = ordersTableColumns.filter((column) =>
        visibleColumns.includes(column.id)
    )

    return (
        <PaginatedTable 
            data={ordersData?.items}
            totalItems={ordersData?.totalItems}
            filters={filters}
            setFilters={setFilters}
            columns={columns}
        />

    )
}