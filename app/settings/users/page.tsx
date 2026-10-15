"use client"

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Search } from "@/components/ui/controls/inputs/Search";
import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import { useAdminSearchUserList } from "@/queries/admin/admin.query";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { userTableColumns } from "@/components/features/settings/users/config/userTableColumns";
import { SettingsPopover } from "@/components/features/settings/users/components/SettingsPopover";
import { useSettingsUserPageStore } from "@/store/pages/settings/users.store";

export default function UsersSettingsPage() {

    const [searchValue, setSearchValue] = useState<string>("");
    const { data: userList } = useAdminSearchUserList(searchValue);
    const visibleColumns = useSettingsUserPageStore(
        (state) => state.tableConfig.visibleColumns
    );

    const columns = userTableColumns.filter((column) =>
        visibleColumns.includes(column.id)
    );

    return (
        <Column Start className="w-full gap-4">
            <Row CenterBetween className="w-full">
                <Title title="Users" />
                <Row Center className="gap-2">
                    <Search onSearch={setSearchValue} />
                    <SettingsPopover />
                    <IconButton Icon={LuUserPlus} className="bg-indigo-400/80 text-white" iconColor="white">Create user</IconButton>

                </Row>
            </Row>
            <TableWithPagination
                data={userList || []}
                columns={columns}
                itemsPerPage={15}
                selectable
            />
        </Column>
    )
}