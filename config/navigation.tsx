import { IconType } from "react-icons";
import { GoHome } from "react-icons/go";
import { LuBadgeAlert, LuBadgeCheck, LuBookMarked, LuBookText, LuFileChartColumn, LuFileCog, LuLayoutDashboard, LuPersonStanding, LuSettings, LuSettings2, LuTicket, LuTicketMinus, LuTickets, LuTicketX, LuUserRoundCog, LuUsers } from "react-icons/lu";

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
        href: null,
        icon: LuTicket,
        key: "tickets",
        children: [
            {
                name: "All Tickets",
                href: "/tickets",
                icon: LuTickets,
                roles: ["admin"],
            },
            {
                name: "My Tickets",
                href: "/tickets/me",
                icon: LuTicket,
                roles: ["all"]
            },
            {
                name: "Unassigned",
                href: "/tickets/unassigned",
                icon: LuTicketMinus,
                roles: ["admin", "technician"]
            },
            {
                name: "Closed",
                href: "/tickets/closed",
                icon: LuTicketX,
                roles: ["admin", "technician"]
            }
        ],
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
                href: "/settings/categories",
                icon: LuBookMarked,
                roles: ["admin"]
            },
            {
                name: "Priorities",
                href: "/settings/priorities",
                icon: LuBadgeAlert,
                roles: ["admin"]
            },
            {
                name: "Statuses",
                href: "/settings/statuses",
                icon: LuBadgeCheck,
                roles: ["admin"]
            }
        ]
    }
]