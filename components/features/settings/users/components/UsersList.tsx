
import { useAdminSearchUserList } from "@/queries/admin/admin.query";
import { useSettingsUserPageStore, useUsersSettingsTableConfig } from "@/store/pages/settings/users.store";
import { userTableColumns } from "../config/userTableColumns";
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