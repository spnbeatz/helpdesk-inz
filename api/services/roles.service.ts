import { rolesList, permissionsList, rolePermissionsList, PermissionType } from "@/data/users";

type PermissionAction = "view" | "create" | "edit" | "delete";

type PermissionGroup = {
    resource: string;
    permissions: Partial<Record<PermissionAction, PermissionType>>;
};

export const getRolesList = () => {
    return rolesList;
}

export const actions: PermissionAction[] = [
    "view",
    "create",
    "edit",
    "delete"
];

export type PermissionGroupType = {
    resource: string;
    permissions: PermissionType[];
};

export const permissionGroups = (): PermissionGroupType[] => {
    const permissions = permissionsList;
    const grouped = permissions.reduce<Record<string, PermissionType[]>>(
        (acc, permission) => {
            const resource = permission.name.split(".")[0];

            if (!acc[resource]) {
                acc[resource] = [];
            }

            acc[resource].push(permission);

            return acc;
        },
        {}
    );

    return Object.entries(grouped).map(([resource, permissions]) => ({
        resource:
            resource.charAt(0).toUpperCase() + resource.slice(1),
        permissions
    }));
};

/* export const permissionGroups: PermissionGroup[] = Object.values(
    permissionsList.reduce<Record<string, PermissionGroup>>(
        (acc, permission) => {
            const [resource, action] = permission.name.split(".") as [
                string,
                PermissionAction
            ];

            if (!acc[resource]) {
                acc[resource] = {
                    resource,
                    permissions: {}
                };
            }

            if (actions.includes(action)) {
                acc[resource].permissions[action] = permission;
            }

            return acc;
        },
        {}
    )
); */

export const getRolePermissionsList = () => {
    return rolePermissionsList;
}