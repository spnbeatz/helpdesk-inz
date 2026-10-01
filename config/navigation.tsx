import { IconType } from "react-icons";
import { GoHome } from "react-icons/go";
import { LuBadgeAlert, LuBadgeCheck, LuBookMarked, LuBookText, LuFileChartColumn, LuFileCog, LuLayoutDashboard, LuPersonStanding, LuSettings, LuSettings2, LuTicket, LuTicketMinus, LuTickets, LuTicketX, LuUserRoundCog, LuUsers, LuPackage, LuShoppingCart, LuStore, LuTruck, LuMonitor, LuCornerDownLeft } from "react-icons/lu";

export type NavigationRoutesType = {
    name: string,
    href: string | null,
    icon: IconType,
    children?: NavigationRoutesType[] | null | undefined,
    roles: string[],
    key?: string
}

export const navigationRoutes: NavigationRoutesType[] = [
    {
        name: "Dashboard",
        href: "/",
        icon: LuLayoutDashboard,
        children: null,
        key: "",
        roles: ["all"],
    },
    {
        name: "Tickets",
        href: "/tickets",
        icon: LuTicket,
        key: "tickets",
        roles: ["all"],
    },
    {
        name: "Customers & Technicians",
        href: "/customers",
        icon: LuUsers,
        key: "customers",
        roles: ["admin"]
    },
    {
        name: "Logistics",
        href: null,
        icon: LuPackage,
        key: "logistics",
        roles: ["admin", "technician"],
        children: [
            {
                name: "Orders",
                href: "/logistics/orders",
                icon: LuShoppingCart,
                roles: ["admin", "technician"]
            },
            {
                name: "Inventory",
                href: "/logistics/inventory",
                icon: LuStore,
                roles: ["admin", "technician"]
            }
        ]
    },
    {
        name: "Reports",
        href: "/reports",
        icon: LuFileChartColumn,
        key: "reports",
        roles: ["admin", "technician"]
    },
    {
        name: "Knowledge Base",
        href: "/knowbase",
        icon: LuBookText,
        key: "knowbase",
        roles: ["all"]
    },
    {
        name: "Settings",
        href: null,
        icon: LuSettings,
        roles: ["all"],
        key: "settings",
        children: [
            {
                name: "General",
                href: "/settings/general",
                icon: LuSettings2,
                roles: ['all']
            },
            {
                name: "Users",
                href: "/settings/users",
                icon: LuUserRoundCog,
                roles: ['admin']
            },
            {
                name: "Roles & Permissions",
                href: "/settings/roles",
                icon: LuPersonStanding,
                roles: ["admin"]
            },
            {
                name: "Ticket Settings",
                href: "/settings/tickets",
                icon: LuFileCog,
                roles: ["admin"]
            },
            {
                name: "Categories",
                href: "/settings/tickets/#categories",
                icon: LuBookMarked,
                roles: ["admin"]
            },
            {
                name: "Priorities",
                href: "/settings/tickets/#priorities",
                icon: LuBadgeAlert,
                roles: ["admin"]
            },
            {
                name: "Statuses",
                href: "/settings/tickets/#statuses",
                icon: LuBadgeCheck,
                roles: ["admin"]
            }
        ]
    }
]