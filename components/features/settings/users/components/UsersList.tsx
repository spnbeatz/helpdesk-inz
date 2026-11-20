import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination"
import { useAdminSearchUserList } from "@/queries/admin/admin.query";
import { useSettingsUserPageStore, useUsersSettingsTableConfig } from "@/store/pages/settings/users.store";
import { userTableColumns } from "../config/userTableColumns";


export const UsersList = () => {
    const { filters, setFilters } = useSettingsUserPageStore();

    const { data: userData } = useAdminSearchUserList(filters);

    const { visibleColumns } = useUsersSettingsTableConfig();

    const columns = userTableColumns.filter((column) =>
        visibleColumns.includes(column.id)
    );

    return (
        <TableWithPagination
            data={userData?.items || []}
            totalItems={userData?.totalItems || 0}
            columns={columns}
            itemsPerPage={filters.itemsPerPage || 22}
            page={filters.page || 1}
            setPage={(page) => setFilters({ page })}
            selectable
        />
    )
}