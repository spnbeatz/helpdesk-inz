"use client"

import { Tab, Tabs, TabsListType } from "@/components/ui/controls/tabs/Tabs";
import { Row, Column } from "@/components/ui/layout/flex";
import { Card } from "@/components/ui/surfaces/Card";
import { Title } from "@/components/ui/typography/Title";
import { Description, ScrollShadow } from "@heroui/react";
import { useRolesList } from "@/queries/roles/roles.query";
import { RoleType } from "@/data/users";
import { Label } from "@heroui/react";
import { getRolePermissionsList, actions, permissionGroups } from "@/api/services/roles.service";
import { Grid } from "@/components/ui/layout/Grid";
import React from "react";
import { Checkbox } from "@/components/ui/controls/inputs/Checkbox";

export default function RolesSettingsPage() {
    
    const { data: rolesList = [] } = useRolesList();

    return (
        <ScrollShadow className="h-full space-y-2">

            <Card id="roles" className="w-full">
                <Column Start className="w-full gap-4">
                    <Row CenterBetween className="w-full">
                        <Title title="Roles settings" variant="section"
                            description="You can add or edit user roles"
                        />
                    </Row>
                    <Tabs orientation="vertical" tabs={rolesList?.map((item) => {
                        return { label: item.name, id: item.id }
                    }) as TabsListType[]}>
                        {rolesList?.map((role) => (
                            <RoleTab role={role} />
                        ))}
                    </Tabs>
                </Column>

            </Card>
        </ScrollShadow>
    )
}

export const RoleTab = ({ role }: { role: RoleType, buttonClick?: () => void }) => {
    return (
        <Tab id={role.id}>
            <Column Start className="w-full gap-4">
                <Column StartCenter>
                    <Label>Name</Label>
                    <Description>{role.name}</Description>
                </Column>
                <Column StartCenter>
                    <Label>Description</Label>
                    <Description>{role.description}</Description>
                </Column>
                <Column StartCenter className="gap-2">
                    <Label>Permissions</Label>
                    <PermissionsList roleId={role.id} />
                </Column>

            </Column>

        </Tab>
    )
}

export const PermissionsList = ({ roleId }: { roleId: string }) => {
    const hasPermission = (permissionId: string) =>
        getRolePermissionsList().some(
            (item) =>
                item.roleId === roleId &&
                item.permissionId === permissionId
        );
    return (
        <Column Start className="w-auto p-6 gap-4 border-2 rounded-lg border-indigo-400/20 bg-indigo-400/5">
            <Grid cols={5} gap={4}>
                <div />
                {(actions).map((action) => (
                    <div
                        key={action}
                        className="font-normal text-xs text-center capitalize text-black/60"
                    >
                        {action}
                    </div>
                ))}

                {permissionGroups.map((group) => (
                    <React.Fragment key={group.resource}>
                        <div className="capitalize text-xs text-black/70">
                            {group.resource}
                        </div>

                        {actions.map((action) => {
                            const permission = group.permissions[action];

                            return (
                                <div
                                    key={action}
                                    className="flex justify-center"
                                >
                                    <Checkbox
                                        isSelected={
                                            permission
                                                ? hasPermission(permission.id)
                                                : false
                                        }
                                    />
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </Grid>
        </Column>
    )
}