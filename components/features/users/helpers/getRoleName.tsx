import { RoleNameType } from "../types/role.types";

export const getRoleName = (
    roleNames: string[] = []
): RoleNameType => {
    const priority: RoleNameType[] = [
        "Administrator",
        "Manager",
        "Technician",
        "User"
    ];

    return priority.find(role => roleNames.includes(role))
        ?? "User";
};