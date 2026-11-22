
import { useAdminSearchUserList } from "../queries/query";
import { useSettingsUserPageStore } from "../store/page.store";
import { useUsersSettingsTableConfig } from "../store/table.store";
import { userTableColumns } from "../config/table.config";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";

export const UsersList = () => {
    const { filters, setFilters } = useSettingsUserPageStore();

    const { data: userData } = useAdminSearchUserList(filters);

    const { visibleColumns } = useUsersSettingsTableConfig();

    const columns = userTableColumns.filter((column) =>
        visibleColumns.includes(column.id)
    );

    return (
        <PaginatedTable 
            data={userData?.items}
            totalItems={userData?.totalItems}
            columns={columns}
            filters={filters}
            setFilters={setFilters}
            selectable
        />
    )
}