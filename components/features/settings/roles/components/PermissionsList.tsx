import { permissionGroups } from "@/api/services/roles.service"
import { Grid } from "@/components/ui/layout/Grid"
import { Label } from "@heroui/react"
import { Row, Column } from "@/components/ui/layout/flex"
import { PermissionCheckbox } from "./PermissionCheckbox"

export const PermissionsList = ({ roleId }: { roleId: string }) => {

    return (

        <Grid cols={2} gap={8} className="w-1/2">
            {permissionGroups().map((group) => {
                return (
                    <Column key={"permissiongroup" + group.resource} Start className="gap-2 rounded-lg">
                        <Label className="text-black/70">{group.resource}</Label>
                        <Row Start className="gap-3 flex-wrap">
                            {group.permissions.map((permission) => {
                                return <PermissionCheckbox key={"actionpermission" + permission.id} permission={permission} roleId={roleId} />
                            })}
                        </Row>
                    </Column>
                )
            })}
        </Grid>
    )
}