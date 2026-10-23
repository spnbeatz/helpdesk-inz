import { Tab } from "@/components/ui/controls/tabs/Tabs";
import { RoleType } from "@/data/users";
import { Column, Row } from "@/components/ui/layout/flex";
import { Label } from "@heroui/react";
import { Grid } from "@/components/ui/layout/Grid";
import { LuKeyRound } from "react-icons/lu";
import { PermissionsList } from "./PermissionsList";
import { RoutesPermissionsList } from "./RoutesPermissionsList";
import { Panel } from "@/components/ui/surfaces/Panel";

export const RoleTab = ({ role }: { role: RoleType, buttonClick?: () => void }) => {
    return (
        <Tab id={role.id}>
            <Column Start className="w-full gap-4">
                <Column StartCenter className="gap-4 p-6 bg-white/70 rounded-lg shadow-sm w-full">
                    <Label className="text-2xl text-black/70">{role.name}</Label>
                    <Label className="text-md font-normal">{role.description}</Label>
                </Column>
                <Grid cols={2} gap={4}>
                    <Panel Icon={LuKeyRound} label="Action Permissions">
                        <PermissionsList roleId={role.id} />
                    </Panel>
                    <Panel Icon={LuKeyRound} label="Routes Permissions">
                        <RoutesPermissionsList roleId={role.id} />
                    </Panel>
                </Grid>
            </Column>
        </Tab>
    )
}
