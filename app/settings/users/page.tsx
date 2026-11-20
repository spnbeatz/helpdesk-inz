"use client"

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Search } from "@/components/ui/controls/inputs/Search";
import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { LuUserPlus } from "react-icons/lu";
import { UsersListSettingsPopover } from "@/components/features/settings/users/components/UsersListSettingsPopover";
import { useSettingsUserPageStore } from "@/store/pages/settings/users.store";
import { UsersFilterButton } from "@/components/features/settings/users/components/UsersFilterButton";
import { UsersList } from "@/components/features/settings/users/components/UsersList";

export default function UsersSettingsPage() {

    const setFilters = useSettingsUserPageStore(state => state.setFilters);

    return (
        <Column Start className="w-full h-full gap-4">
            <Row CenterBetween className="w-full">
                <Title title="Users" />
                <Row Center className="gap-2">
                    <Search onSearch={(v) => setFilters({ searchValue: v })} />
                    <UsersFilterButton />
                    <UsersListSettingsPopover />
                    <IconButton Icon={LuUserPlus} className="bg-indigo-400/80 text-white" iconColor="white">Create user</IconButton>
                </Row>
            </Row>
            <UsersList/>
        </Column>
    )
}