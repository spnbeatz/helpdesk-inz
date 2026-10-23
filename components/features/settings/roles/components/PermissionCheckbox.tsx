import { getRolePermissionsList } from "@/api/services/roles.service";
import { Row } from "@/components/ui/layout/flex";
import { Checkbox } from "@heroui/react";
import { PermissionType } from "@/data/users";

export const PermissionCheckbox = ({ permission, roleId }: { permission: PermissionType, roleId: string }) => {

    const roleHasPermission = (
        roleId: string,
        permissionId: string
    ): boolean => {
        return getRolePermissionsList().some(
            (item) =>
                item.roleId === roleId &&
                item.permissionId === permissionId
        );
    };

    return (
        <Row Center className={`p-1 pr-3 rounded-lg ${roleHasPermission(roleId, permission.id) ? "bg-indigo-400/30" : "bg-indigo-400/10"}`}>
            <Checkbox isSelected={roleHasPermission(roleId, permission.id)} className={"text-xs"}>{permission.description}</Checkbox>
        </Row>
    )
}