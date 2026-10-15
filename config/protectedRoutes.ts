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

    // nie ma tego w navigation, ale nadal chronisz
    {
        path: "/users",
        roles: ["Administrator"]
    },
    {
        path: "/users/[id]",
        roles: ["Administrator", "Technician"]
    },
    {
        path: "/tickets",
        roles: ["Administrator", "Technician"]
    },
    {
        path: "/tickets/[id]/edit",
        roles: ["Administrator", "Technician"]
    }
];