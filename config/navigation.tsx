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
        roles: ["Administrator", "Technician", "Manager", "User"],
    },
    {
        name: "Tickets",
        href: "/tickets",
        icon: LuTicket,
        key: "tickets",
        roles: ["Administrator", "Technician"],
    },
    {
        name: "Customers & Technicians",
        href: "/customers",
        icon: LuUsers,
        key: "customers",
        roles: ["Administrator", "Technician", "Manager", "User"]
    },
    {
        name: "Logistics",
        href: null,
        icon: LuPackage,
        key: "logistics",
        roles: ["Administrator", "Technician", "Manager", "User"],
        children: [
            {
                name: "Orders",
                href: "/logistics/orders",
                icon: LuShoppingCart,
                roles: ["Administrator", "Technician", "Manager", "User"]
            },
            {
                name: "Inventory",
                href: "/logistics/inventory",
                icon: LuStore,
                roles: ["Administrator", "Technician", "Manager", "User"]
            }
        ]
    },
    {
        name: "Reports",
        href: "/reports",
        icon: LuFileChartColumn,
        key: "reports",
        roles: ["Administrator", "Technician"]
    },
    {
        name: "Knowledge Base",
        href: "/knowbase",
        icon: LuBookText,
        key: "knowbase",
        roles: ["Administrator", "Technician", "Manager", "User"]
    },
    {
        name: "Settings",
        href: null,
        icon: LuSettings,
        roles: ["Administrator", "Technician", "Manager", "User"],
        key: "settings",
        children: [
            {
                name: "General",
                href: "/settings/general",
                icon: LuSettings2,
                roles: ["Administrator", "Technician", "Manager", "User"]
            },
            {
                name: "Users",
                href: "/settings/users",
                icon: LuUserRoundCog,
                roles: ["Administrator"]
            },
            {
                name: "Roles & Permissions",
                href: "/settings/roles",
                icon: LuPersonStanding,
                roles: ["Administrator"]
            },
            {
                name: "Ticket Settings",
                href: "/settings/tickets",
                icon: LuFileCog,
                roles: ["Administrator"]
            }
        ]
    }
]