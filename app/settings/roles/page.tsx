"use client"

import { Tabs, TabsListType } from "@/components/ui/controls/tabs/Tabs";
import { Row, Column } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import {  ScrollShadow } from "@heroui/react";
import { useRolesList } from "@/queries/roles/roles.query";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuShieldPlus } from "react-icons/lu";
import { RoleTab } from "@/components/features/settings/roles/components/RoleTab";

export default function RolesSettingsPage() {

    const { data: rolesList = [] } = useRolesList();

    return (
        <ScrollShadow className="h-full space-y-2">
            <Column Start className="w-full gap-8">
                <Row CenterBetween className="w-full">
                    <Title title="Roles settings" variant="section"
                        description="You can add or edit user roles"
                    />
                    <Row Center>
                        <IconButton Icon={LuShieldPlus} className="bg-indigo-400/70 text-white" iconColor="white">
                            Create new role
                        </IconButton>
                    </Row>
                </Row>
                <Tabs orientation="vertical" tabs={rolesList?.map((item) => {
                    return { label: item.name, id: item.id }
                }) as TabsListType[]}>
                    {rolesList?.map((role) => (
                        <RoleTab key={"roletab" + role.name} role={role} />
                    ))}
                </Tabs>
            </Column>

        </ScrollShadow>
    )
}
