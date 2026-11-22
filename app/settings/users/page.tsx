"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { UsersListSettingsPopover } from "@/components/features/settings/users/components/UsersListSettingsPopover";
import { useSettingsUserPageStore } from "@/store/pages/settings/users.store";
import { UsersFilterButton } from "@/components/features/settings/users/components/UsersFilterButton";
import { UsersList } from "@/components/features/settings/users/components/UsersList";
import { TableView } from "@/components/composed/table/TableView";
import { usersSettingsTableId } from "@/components/features/settings/users/config/userTableColumns";
import { useCallback } from "react";
import { UserAddButton } from "@/components/features/settings/users/components/UserAddButton";

export default function UsersSettingsPage() {

    const setFilters = useSettingsUserPageStore(state => state.setFilters);

    const onSearch = useCallback((value: string) => {
        setFilters({searchValue: value})
    },[setFilters])

    return (
        <Column Start className="w-full h-full gap-4">
            <Title title="Users" />
            <TableView 
                tableId={usersSettingsTableId}
                onSearch={onSearch}
                filterButton={<UsersFilterButton/>}
                settingsButton={<UsersListSettingsPopover/>}
                table={<UsersList/>}
                createButton={<UserAddButton />}
            />
        </Column>
    )
}