import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";
import { reportsTableColumns } from "../config/table.config";
import { useReportsList } from "../queries/query";
import { useReportsPageStore } from "../store/page.store"
import { useReportsTableConfig } from "../store/table.store";

export const ReportsTable = () => {

    const filters = useReportsPageStore(state => state.filters);
    const setFilters = useReportsPageStore(state => state.setFilters);

    const { data: reportsData } = useReportsList(filters);

    const { visibleColumns } = useReportsTableConfig();

    const columns = reportsTableColumns.filter((column) => 
        visibleColumns.includes(column.id)
    );

    return (
        <PaginatedTable 
            data={reportsData?.items}
            totalItems={reportsData?.totalItems}
            columns={columns}
            filters={filters}
            setFilters={setFilters}
        />
    )
}