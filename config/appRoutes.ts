export type AppRouteType = {
    key: string,
    name: string,
    path: string
}

export const appRoutes = [
    {
        key: "dashboard",
        name: "Dashboard",
        path: "/"
    },
    {
        key: "tickets",
        name: "Tickets",
        path: "/tickets"
    },
    {
        key: "customers",
        name: "Customers & Technicians",
        path: "/customers"
    },
    {
        key: "customer",
        name: "Customer Profile",
        path: "/customers/[id]"
    },
    {
        key: "logistics.orders",
        name: "Orders",
        path: "/logistics/orders"
    },
    {
        key: "logistics.inventory",
        name: "Inventory",
        path: "/logistics/inventory"
    },
    {
        key: "reports",
        name: "Reports",
        path: "/reports"
    },
    {
        key: "settings.users",
        name: "Users settings",
        path: "/settings/users"
    },
    {
        key: "settings.roles",
        name: "Roles & permissions settings",
        path: "/settings/roles"
    },
    {
        key: "settings.tickets",
        name: "Tickets settings",
        path: "/settings/tickets"
    }
]