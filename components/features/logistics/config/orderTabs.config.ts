import { TabConfig } from "@/components/ui/controls/TabSwitch";
import { OrdersView, OrderDetailsView } from "../components/types/orderTabs.types";
import { RoleNameType } from "../../users/types/role.types";

export const ordersTabsByRole = {
    Administrator: [
        { id: "all", label: "All Orders" },
        { id: "pending-approval", label: "Pending Approval" },
        { id: "in-progress", label: "In Progress" },
        { id: "completed", label: "Completed" },
        { id: "declined", label: "Declined" },
    ],

    Manager: [
        { id: "all", label: "All Orders" },
        { id: "pending-approval", label: "Pending Approval" },
        { id: "in-progress", label: "In Progress" },
        { id: "completed", label: "Completed" },
    ],

    Technician: [
        { id: "my-orders", label: "My Orders" },
        { id: "to-process", label: "To Process" },
        { id: "in-progress", label: "In Progress" },
        { id: "completed", label: "Completed" },
    ],

    User: [
        { id: "my-requests", label: "My Requests" },
    ],
} satisfies Record<RoleNameType, TabConfig<OrdersView>[]>;

export const orderDetailsTabConfig: Record<RoleNameType,TabConfig<OrderDetailsView>[]> = {
    Administrator: [
        { id: "overview", label: "Overview"},
        { id: "products-sourcing", label: "Products & sourcing"},
        { id: "activity", label: "Activity"},
        { id: "documents", label: "Documents"}
    ],
    Technician: [
        { id: "overview", label: "Overview"},
        { id: "products-sourcing", label: "Products & sourcing"},
        { id: "activity", label: "Activity"},
        { id: "documents", label: "Documents"}
    ],
    Manager: [
        { id: "overview", label: "Overview"},
        { id: "products-sourcing", label: "Products & sourcing"},
        { id: "activity", label: "Activity"},
        { id: "documents", label: "Documents"}
    ],
    User: [
        { id: "overview", label: "Overview"},
        { id: "products", label: "Products"},
    ]
}
