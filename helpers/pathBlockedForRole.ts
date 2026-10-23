import { findAppRoute } from "./findRoute";
import {
    roleBlockedRoutesList,
    rolesList
} from "@/data/users";

export const hasPathAccess = (
    roleNames: string[],
    pathname: string
): boolean => {
    const route = findAppRoute(pathname);

    if (!route) {
        return true;
    }

    const roleIds = roleNames
        .map((roleName) =>
            rolesList.find((role) => role.name === roleName)?.id
        )
        .filter((id): id is string => id !== undefined);

    if (roleIds.length === 0) {
        return false;
    }

    return roleIds.some((roleId) =>
        !roleBlockedRoutesList.some(
            (blockedRoute) =>
                blockedRoute.roleId === roleId &&
                blockedRoute.routeKey === route.key
        )
    );
};