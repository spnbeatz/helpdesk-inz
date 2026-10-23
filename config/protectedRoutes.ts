export type RouteAccessType = {
    path: string;
    roles: string[];
};

export const protectedRoutes: RouteAccessType[] = [
    {
        path: "/reports",
        roles: ["Administrator", "Technician"]
    },
    {
        path: "/settings/users",
        roles: ["Administrator"]
    },
    {
        path: "/settings/roles",
        roles: ["Administrator"]
    },
    {
        path: "/settings/tickets",
        roles: ["Administrator"]
    },
    {
        path: "/tickets",
        roles: ["Administrator", "Technician"]
    },
];