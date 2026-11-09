export type OrdeListView =
    | "all"
    | "pending"
    | "mine"
    | "to-process"
    | "in-progress"
    | "completed"
    | "declined"
    | "my-requests";

export type OrdersTabConfig = {
    id: OrdersView;
    label: string;
};

export type OrdersRole =
    | "Administrator"
    | "Manager"
    | "Technician"
    | "User";

export type OrdersView =
    | "all"
    | "pending-approval"
    | "my-orders"
    | "to-process"
    | "in-progress"
    | "completed"
    | "declined"
    | "my-requests";

export type OrderDetailsView =
    | "overview"
    | "products"
    | "products-sourcing"
    | "activity"
    | "documents"
