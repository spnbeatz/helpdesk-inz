/**
 * Typy modułu Orders – zgodne z katalogiem PRD-*, egzemplarzami EQ-*
 * oraz istniejącym EquipmentAssignmentType w equipments.ts.
 * Daty przesyłane do UI to ciągi ISO 8601.
 */
import type { EquipmentAssignmentType } from "@/data/equipments";
export type { EquipmentAssignmentType } from "@/data/equipments";
export type { LocationType } from "@/data/locations";

export type ID = string;
export type ISODateString = string;

/** Aktualny stan całego zamówienia (w odróżnieniu od realizacji poszczególnych pozycji). */
export type OrderStatus = "pending" | "accepted" | "in_progress" | "completed" | "declined";

/** Podstawowy rekord orders. */
export type OrderType = {
    id: ID;
    ticket_id: ID;
    reason: string;
    status: OrderStatus;
    /** Powód odmowy managera, jeżeli status = declined. */
    feedback: string | null;
    created_by_id: ID;
    reviewed_by_id: ID | null;
    created_at: ISODateString;
    updated_at: ISODateString;
    reviewed_at: ISODateString | null;
    completed_at: ISODateString | null;
};

/** Pozycja zamówienia: item_id to model z products (PRD-*), a nie urządzenie EQ-*. */
export type OrderItemType = {
    id: ID;
    order_id: ID;
    item_id: ID;
    quantity: number;
};

/** Formularz zakładania zamówienia – na backendzie created_by_id powinno pochodzić z sesji. */
export type OrderCreateType = Pick<OrderType, "ticket_id" | "reason" | "created_by_id"> & {
    products: Pick<OrderItemType, "item_id" | "quantity">[];
};

export type OrderStatusChangeInputType = {
    order_id: ID;
    new_status: OrderStatus;
    comment?: string | null;
};

export type OrderReviewInputType = {
    order_id: ID;
    decision: "accepted" | "declined";
    feedback: string | null;
    fulfillment_technician_id?: ID | null;
};

/** Rozdzielenie zamawiającego, docelowego odbiorcy i wykonawcy. */
export type OrderWithAssignmentType = OrderType & {
    recipient_user_id: ID;
    fulfillment_technician_id: ID | null;
};

export type OrderAssignTechnicianInputType = {
    order_id: ID;
    fulfillment_technician_id: ID;
};

/** Historia przejść: komentarz to notatka osoby, nie automatycznie generowany opis. */
export type OrderHistoryType = {
    id: ID;
    order_id: ID;
    changed_by_id: ID;
    previous_status: OrderStatus | null;
    new_status: OrderStatus;
    comment: string | null;
    created_at: ISODateString;
};

/** Źródło realizacji konkretnej partii produktu. */
export type OrderFulfillmentSourceType = "local_stock" | "branch_transfer" | "supplier";
export type OrderItemFulfillmentStatus =
    | "planned" | "reserved" | "ordered" | "in_transit" | "received"
    | "prepared" | "delivered" | "cancelled";

export type OrderItemFulfillmentBaseType = {
    id: ID;
    order_item_id: ID;
    quantity: number;
    /** Ile sztuk dotarło do technika / zostało pozyskanych; nie oznacza wydania użytkownikowi. */
    received_quantity: number;
    status: OrderItemFulfillmentStatus;
    created_at: ISODateString;
    updated_at: ISODateString;
};

export type OrderItemFulfillmentType = OrderItemFulfillmentBaseType & (
    | {
        source_type: "local_stock" | "branch_transfer";
        source_location_id: ID;
        supplier_id: null;
    }
    | {
        source_type: "supplier";
        source_location_id: null;
        supplier_id: ID;
    }
);

export type OrderItemFulfillmentCreateType = Pick<OrderItemFulfillmentBaseType, "order_item_id" | "quantity"> & (
    | {
        source_type: "local_stock" | "branch_transfer";
        source_location_id: ID;
        supplier_id?: never;
    }
    | {
        source_type: "supplier";
        supplier_id: ID;
        source_location_id?: never;
    }
);

/** Opcjonalna checklista całego zamówienia, nie zastępuje OrderItemFulfillmentType. */
export type OrderFulfillmentTaskKind =
    | "equipment_collected"
    | "equipment_registered"
    | "equipment_prepared"
    | "document_generated"
    | "equipment_delivered";

export type OrderFulfillmentTaskType = {
    id: ID;
    order_id: ID;
    task_type: OrderFulfillmentTaskKind;
    completed_by_id: ID | null;
    completed_at: ISODateString | null;
    note: string | null;
};

/** Podstawowe dane modelu z products.ts. */
export type OrderProductRefType = {
    id: ID;
    name: string;
    manufacturer?: string | null;
    model?: string | null;
};

/** Podstawowe dane konkretnego egzemplarza EQ-*. */
export type OrderEquipmentRefType = {
    id: ID;
    product_id: ID;
    serial_number: string | null;
    location_id: ID | null;
};

/** FK fulfillment_id → order_item_fulfillments; equipment_id → equipment. */
export type FulfillmentEquipmentType = {
    fulfillment_id: ID;
    equipment_id: ID;
};

/** Wykorzystuj istniejący typ z equipments.ts, bez konkurencyjnej historii przekazań. */
export type OrderEquipmentAssignmentType = EquipmentAssignmentType;

export type SupplierType = {
    id: ID;
    name: string;
    contact_name: string | null;
    email: string | null;
    phone: string | null;
};

export type OrderItemDetailsType = OrderItemType & {
    product: OrderProductRefType | null;
    fulfillments: OrderItemFulfillmentType[];
    equipment: OrderEquipmentRefType[];
};

export type OrderUserSummaryType = { id: ID; firstName: string; lastName: string };
export type OrderTicketSummaryType = { id: ID; title: string; customer_id: ID };

export type OrderDetailsType = OrderWithAssignmentType & {
    ticket: OrderTicketSummaryType | null;
    created_by: OrderUserSummaryType | null;
    reviewed_by: OrderUserSummaryType | null;
    recipient: OrderUserSummaryType | null;
    fulfillment_technician: OrderUserSummaryType | null;
    items: OrderItemDetailsType[];
    history: OrderHistoryType[];
    fulfillment_tasks: OrderFulfillmentTaskType[];
};

export type OrderListItemType = OrderWithAssignmentType & {
    item_count: number;
    total_quantity: number;
    recipient_name: string | null;
    technician_name: string | null;
};

export type OrderListFiltersType = {
    status?: OrderStatus | "all";
    ticket_id?: ID;
    created_by_id?: ID;
    recipient_user_id?: ID;
    fulfillment_technician_id?: ID;
    search?: string;
    created_after?: ISODateString;
    created_before?: ISODateString;
    sort_by?: "created_at" | "updated_at" | "status";
    sort_dir?: "asc" | "desc";
    limit?: number;
    offset?: number;
};

// ============================================================================
// TYPY DLA SERWISU ORDERS / KOMPONENTÓW UI (kompatybilność z dawnym API)
// ============================================================================
import type { ProductType } from "@/data/products";
import type { TicketType } from "@/data/exampleTicketsList";
import type { UserType } from "@/data/users";

/** Wynik tworzenia zamówienia: rekord orders + nowo utworzone pozycje. */
export type OrderWithProductsType = OrderWithAssignmentType & {
    products: OrderItemType[];
};

/** Krótka karta użytkownika używana wcześniej przez OrdersPage. */
export type OrderUserViewType = Pick<UserType, "id" | "email"> & {
    name: string;
    avatarUrl: string;
};

/** Produkt w liście orderów: pozycja OI-* i model PRD-*. */
export type OrderItemListViewType = OrderItemType & {
    product: ProductType | null;
};

/** Wzbogacony typ wiersza/listy dla istniejących komponentów React. */
export type OrderListViewType = OrderListItemType & {
    products: OrderItemListViewType[];
    ticket: TicketType | null;
    createdBy: OrderUserViewType | null;
    reviewedBy: OrderUserViewType | null;
    recipientUser: OrderUserViewType | null;
    fulfillmentTechnician: OrderUserViewType | null;
};

/** Widok pojedynczego zamówienia: lista + fulfillmenty, historia, zadania. */
export type OrderDetailViewType = OrderListViewType & Pick<
    OrderDetailsType,
    "items" | "history" | "fulfillment_tasks"
>;
