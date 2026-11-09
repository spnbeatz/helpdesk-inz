/**
 * DANE MOCKOWE – Orders + Inventory (bez SQL).
 *
 * Bazą są istniejące 40 zamówień/57 pozycji, 112 produktów, 115 egzemplarzy,
 * 21 lokalizacji, istniejący usersList i ticketsList.
 *
 * Nie zmieniamy produktów PRD-* na EQ-* w order_items:
 * PRD = model, EQ = fizyczny egzemplarz wykorzystany przy realizacji.
 *
 * Dane są liczone przy imporcie modułu, na podstawie aktualnych ticketsList.
 * Jeżeli ticketsList generuje ruchome daty, cały moduł należy importować
 * z tej samej instancji fixture (w bazie SQL użyj zamrożonego snapshotu).
 */

import { orderSeeds, additionalProducts, REVIEWER_ID } from "./seed";
import { ticketsList } from "../exampleTicketsList";
import { productsList } from "../products";
import { equipmentList as baseEquipmentList } from "../equipments";
import { locations } from "../locations";
import { usersList } from "../users";
import type { Equipment, EquipmentAssignmentType } from "../equipments";
import type {
    OrderType, OrderItemType, OrderWithAssignmentType, OrderHistoryType, OrderCreateType,
    OrderItemFulfillmentType, OrderItemFulfillmentStatus,
    OrderFulfillmentTaskType, OrderFulfillmentTaskKind, FulfillmentEquipmentType,
    SupplierType, OrderDetailsType, OrderListItemType, OrderUserSummaryType,
    OrderEquipmentRefType,
} from "./types";

export const suppliersList: SupplierType[] = [
    { id: "SUP-001", name: "Dystrybutor IT A", contact_name: "Dział B2B", email: "b2b@example.invalid", phone: null },
    { id: "SUP-002", name: "Hurtownia komputerowa B", contact_name: null, email: "orders@example.invalid", phone: null },
    { id: "SUP-003", name: "Dostawca akcesoriów C", contact_name: null, email: "sales@example.invalid", phone: null },
];

const ticketMap = new Map(ticketsList.map(t => [t.id, t]));
const userMap = new Map(usersList.map(u => [u.id, u]));
const productMap = new Map(productsList.map(p => [p.id, p]));
const locationMap = new Map(locations.map(l => [l.id, l]));
const now = Date.now();
const time = (epoch: number) => new Date(Math.min(epoch, now)).toISOString();
const plusHours = (iso: string, hours: number) => time(Date.parse(iso) + hours * 3_600_000);
const plusYears = (date: string, years: number) => {
    const d = new Date(`${date}T00:00:00.000Z`);
    d.setUTCFullYear(d.getUTCFullYear() + years);
    return d.toISOString().slice(0, 10);
};
const technicians = ["USR-002", "USR-003", "USR-015", "USR-023"] as const;
const rejectionReasons = [
    "W magazynie znajduje się już sprzęt zastępczy.",
    "Brak wystarczającego uzasadnienia zakupu.",
    "Najpierw należy wykorzystać dostępne wyposażenie.",
    "Zakup wymaga dodatkowego potwierdzenia budżetu.",
];

// A) Zamówienia i pozycje (spójne z pierwotnymi seedami ORD-001..040).
const generated = orderSeeds.map((seed, index) => {
    const ticket = ticketMap.get(seed.ticket_id);
    if (!ticket) throw new Error(`Order seed ${index}: missing ticket ${seed.ticket_id}`);
    const lines = [
        { item_id: seed.product_id, quantity: seed.quantity },
        ...(additionalProducts[index] ?? []),
    ];
    if (new Set(lines.map(p => p.item_id)).size !== lines.length) {
        throw new Error(`Order seed ${index}: duplicate product in one order`);
    }
    for (const p of lines) {
        if (!productMap.has(p.item_id)) throw new Error(`Missing product ${p.item_id}`);
        if (!Number.isInteger(p.quantity) || p.quantity < 1) throw new Error(`Invalid quantity for ${p.item_id}`);
    }
    const createdAt = plusHours(ticket.created_at, .5);
    const isReviewed = seed.status !== "pending";
    const reviewedAt = isReviewed ? plusHours(createdAt, 1.5) : null;
    const progressAt = reviewedAt ? plusHours(reviewedAt, 6) : null;
    const completedAt = seed.status === "completed" && progressAt ? plusHours(progressAt, 64) : null;
    const updatedAt = completedAt ?? (seed.status === "in_progress" ? progressAt : reviewedAt) ?? createdAt;
    const creator = technicians.includes(ticket.technician_id as typeof technicians[number])
        ? ticket.technician_id as string : technicians[index % technicians.length];
    const id = `ORD-${String(index + 1).padStart(3, "0")}`;
    const order: OrderWithAssignmentType = {
        id, ticket_id: ticket.id, reason: seed.reason, status: seed.status,
        feedback: seed.status === "declined" ? rejectionReasons[index % rejectionReasons.length] : null,
        created_by_id: creator,
        reviewed_by_id: isReviewed ? REVIEWER_ID : null,
        created_at: createdAt, updated_at: updatedAt, reviewed_at: reviewedAt,
        completed_at: completedAt,
        recipient_user_id: ticket.customer_id,
        fulfillment_technician_id: seed.status === "pending" || seed.status === "declined" ? null : creator,
    };
    if (!userMap.has(order.recipient_user_id)) throw new Error(`Missing recipient ${order.recipient_user_id}`);
    const items: OrderItemType[] = lines.map((p, n) => ({
        id: `OI-${String(index + 1).padStart(3, "0")}-${String(n + 1).padStart(2, "0")}`,
        order_id: id, item_id: p.item_id, quantity: p.quantity,
    }));
    return { order, items };
});

export const ordersList: OrderWithAssignmentType[] = generated.map(g => g.order);
export const orderItemsList: OrderItemType[] = generated.flatMap(g => g.items);

// B) Historia statusów – zawsze kompletna ścieżka dla aktualnego statusu.
let historyCounter = 0;
export const orderHistoryList: OrderHistoryType[] = ordersList.flatMap(o => {
    const rows: OrderHistoryType[] = [];
    const add = (
        from: OrderHistoryType["previous_status"], to: OrderHistoryType["new_status"],
        changedBy: string, at: string, comment: string | null = null,
    ) => rows.push({
        id: `OH-${String(++historyCounter).padStart(4, "0")}`,
        order_id: o.id, changed_by_id: changedBy,
        previous_status: from, new_status: to,
        comment, created_at: at,
    });
    add(null, "pending", o.created_by_id, o.created_at);
    if (o.status !== "pending" && o.reviewed_at) {
        const decision = o.status === "declined" ? "declined" : "accepted";
        add("pending", decision, o.reviewed_by_id!, o.reviewed_at,
            decision === "declined" ? o.feedback : null);
        if (o.status === "in_progress" || o.status === "completed") {
            const progressAt = plusHours(o.reviewed_at, 6);
            add("accepted", "in_progress", o.fulfillment_technician_id!, progressAt);
            if (o.status === "completed" && o.completed_at) {
                add("in_progress", "completed", o.fulfillment_technician_id!, o.completed_at);
            }
        }
    }
    return rows;
});

// C) Realizacje w powiązaniu z fizycznym wyposażeniem.
// Modyfikujemy kopie istniejących EQ-*, nigdy wcześniejsze rekordy importu.
const inventory = new Map<string, Equipment>(baseEquipmentList.map(e => [e.id, { ...e }]));
const usedEquipment = new Set<string>();
const fulfillmentRows: OrderItemFulfillmentType[] = [];
const fulfillmentLinks: FulfillmentEquipmentType[] = [];
const assignmentRows: EquipmentAssignmentType[] = [];
let fulfillmentCounter = 0;
let newEquipmentNumber = Math.max(...baseEquipmentList.map(e => Number(e.id.replace(/\D/g, "")))) + 1;
let equipmentAssignmentCounter = 0;

const warehouseForBranch = (branchId: string): string => {
    const direct = locations.find(l => l.type === "warehouse" && l.parent_id === branchId && l.id !== "LOC-021");
    return direct?.id ?? "LOC-001";
};

const getRecipientBranch = (userId: string): string => {
    const user = userMap.get(userId);
    if (!user) throw new Error(`No recipient ${userId}`);
    const loc = locationMap.get(user.location_id);
    if (!loc) throw new Error(`Invalid location ${user.location_id}`);
    return loc.type === "branch" ? loc.id : loc.parent_id ?? "LOC-002";
};
const supplierForProduct = (productId: string) => {
    const p = productMap.get(productId)!;
    return p.type === "accessory" ? "SUP-003" : p.type === "printer" ? "SUP-002" : "SUP-001";
};
const isSharedEquipment = (productId: string) => {
    const type = productMap.get(productId)?.type;
    return type === "printer" || type === "network";
};

type Source =
    | { source_type: "local_stock" | "branch_transfer"; source_location_id: string; supplier_id: null }
    | { source_type: "supplier"; source_location_id: null; supplier_id: string };

const sourceFromLocation = (warehouseId: string, branchId: string): Source => ({
    source_type: locationMap.get(warehouseId)?.parent_id === branchId ? "local_stock" : "branch_transfer",
    source_location_id: warehouseId, supplier_id: null,
});

const availableEquipment = (productId: string, recipientBranch: string): Equipment | null => {
    const stock = [...inventory.values()].filter(e =>
        e.product_id === productId && e.status === "available" && !usedEquipment.has(e.id) &&
        locationMap.get(e.location_id)?.type === "warehouse" && e.location_id !== "LOC-021"
    );
    const localWarehouse = warehouseForBranch(recipientBranch);
    return stock.find(e => e.location_id === localWarehouse) ?? stock[0] ?? null;
};
const equipmentSource = (item: OrderItemType, branch: string): Source => {
    const available = availableEquipment(item.item_id, branch);
    return available
        ? sourceFromLocation(available.location_id, branch)
        : { source_type: "supplier", source_location_id: null, supplier_id: supplierForProduct(item.item_id) };
};

const addFulfillment = (
    order: OrderWithAssignmentType, item: OrderItemType, count: number,
    status: OrderItemFulfillmentStatus, source: Source, receivedQuantity: number,
): OrderItemFulfillmentType => {
    const id = `FUL-${String(++fulfillmentCounter).padStart(4, "0")}`;
    const createdAt = order.reviewed_at ?? order.created_at;
    const updatedAt = status === "delivered" ? order.completed_at ?? order.updated_at : order.updated_at;
    const record: OrderItemFulfillmentType = {
        id, order_item_id: item.id, quantity: count,
        received_quantity: receivedQuantity, status,
        created_at: createdAt, updated_at: updatedAt,
        ...source,
    };
    fulfillmentRows.push(record);
    return record;
};

const createNewEquipment = (order: OrderWithAssignmentType, productId: string): Equipment => {
    const num = newEquipmentNumber++;
    const purchased = order.completed_at ?? order.updated_at;
    const purchaseDate = purchased.slice(0, 10);
    const id = `EQ-${String(num).padStart(3, "0")}`;
    const equipment: Equipment = {
        id, product_id: productId,
        assetTag: `IT-MOCK-${String(num).padStart(4, "0")}`,
        serialNumber: `MOCK-${order.id}-${num}`,
        status: "available", assignedTo: null,
        location_id: "LOC-001", room: null,
        purchaseDate, warrantyUntil: plusYears(purchaseDate, 3),
    };
    inventory.set(id, equipment);
    return equipment;
};

/** Wydanie lub rezerwacja jednego egzemplarza; gwarancja zgodnego product_id. */
const linkEquipment = (
    order: OrderWithAssignmentType, fulfill: OrderItemFulfillmentType, equipment: Equipment,
    assigned: boolean,
): void => {
    const recipientBranch = getRecipientBranch(order.recipient_user_id);
    const shared = isSharedEquipment(equipment.product_id);
    const next: Equipment = {
        ...equipment,
        status: assigned ? "assigned" : "reserved",
        assignedTo: assigned && !shared ? order.recipient_user_id : null,
        location_id: assigned ? recipientBranch : equipment.location_id,
        room: assigned && shared ? (productMap.get(equipment.product_id)!.type === "network" ? "Serwerownia" : "Biuro") : null,
    };
    inventory.set(next.id, next);
    usedEquipment.add(next.id);
    fulfillmentLinks.push({ fulfillment_id: fulfill.id, equipment_id: next.id });
    assignmentRows.push({
        id: `EA-ORD-${String(++equipmentAssignmentCounter).padStart(4, "0")}`,
        equipment_id: next.id, ticket_id: order.ticket_id,
        user_id: shared ? null : order.recipient_user_id,
        technician_id: order.fulfillment_technician_id,
        status: assigned ? "assigned" : "reserved",
        reserved_at: plusHours(order.reviewed_at ?? order.created_at, 2),
        assigned_at: assigned ? order.completed_at ?? order.updated_at : null,
        returned_at: null, cancelled_at: null,
    });
};

/** Stan każdej partii jest ustalany na podstawie stanu zamówienia. */
const sortedOrders = [...ordersList].sort((a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id));
for (const order of sortedOrders) {
    if (order.status === "pending" || order.status === "declined") continue;
    const items = orderItemsList.filter(i => i.order_id === order.id);
    const recipientBranch = getRecipientBranch(order.recipient_user_id);
    for (const item of items) {
        if (order.status === "accepted") {
            addFulfillment(order, item, item.quantity, "planned", equipmentSource(item, recipientBranch), 0);
            continue;
        }
        if (order.status === "completed") {
            for (let n = 0; n < item.quantity; n++) {
                const existing = availableEquipment(item.item_id, recipientBranch);
                const source: Source = existing ? sourceFromLocation(existing.location_id, recipientBranch) : {
                    source_type: "supplier", source_location_id: null, supplier_id: supplierForProduct(item.item_id),
                };
                const equipment = existing ?? createNewEquipment(order, item.item_id);
                const f = addFulfillment(order, item, 1, "delivered", source, 1);
                linkEquipment(order, f, equipment, true);
            }
            continue;
        }
        // in_progress: część zamówień ma sprzęt przygotowany / zarezerwowany,
        // pozostałe dopiero zamówione od dostawcy; czasem częściowo wydane.
        const number = Number(order.id.slice(-3));
        const hasReadyPart = number % 3 !== 0;
        if (hasReadyPart) {
            const existing = availableEquipment(item.item_id, recipientBranch);
            const source: Source = existing ? sourceFromLocation(existing.location_id, recipientBranch) : {
                source_type: "supplier", source_location_id: null, supplier_id: supplierForProduct(item.item_id),
            };
            const equipment = existing ?? createNewEquipment(order, item.item_id);
            const partialDelivered = number % 4 === 1 && item.quantity > 1;
            const prepared = !partialDelivered && number % 2 === 0;
            const status: OrderItemFulfillmentStatus = partialDelivered ? "delivered" : prepared ? "prepared" : "reserved";
            const f = addFulfillment(order, item, 1, status, source, prepared || partialDelivered ? 1 : 0);
            // Zamówienie nadal in_progress; częściowe wydanie liczymy od aktualizacji zamówienia.
            linkEquipment(order, f, equipment, partialDelivered);
        }
        const remaining = item.quantity - (hasReadyPart ? 1 : 0);
        if (remaining > 0) {
            addFulfillment(order, item, remaining, number % 2 === 0 ? "in_transit" : "ordered", {
                source_type: "supplier", source_location_id: null, supplier_id: supplierForProduct(item.item_id),
            }, 0);
        }
    }
}

export const orderItemFulfillmentsList: OrderItemFulfillmentType[] = fulfillmentRows;
export const fulfillmentEquipmentList: FulfillmentEquipmentType[] = fulfillmentLinks;
export const equipmentAssignmentsList: EquipmentAssignmentType[] = assignmentRows;
/** Aktualny snapshot Inventory PO uwzględnieniu realizacji Orderów – używaj go zamiast bazowych 115 EQ. */
export const equipmentList: Equipment[] = [...inventory.values()].sort((a, b) =>
    Number(a.id.slice(3)) - Number(b.id.slice(3))
);

// D) Checklista na poziomie order; w bazie analogiczne rekordy order_fulfillment_tasks.
const taskKinds: OrderFulfillmentTaskKind[] = [
    "equipment_collected", "equipment_registered", "equipment_prepared", "document_generated", "equipment_delivered",
];
export const orderFulfillmentTasksList: OrderFulfillmentTaskType[] = ordersList
    .filter(o => o.status === "in_progress" || o.status === "completed")
    .flatMap(o => {
        const fullyDone = o.status === "completed";
        const physical = fulfillmentLinks.some(link =>
            fulfillmentRows.some(f => f.id === link.fulfillment_id &&
                orderItemsList.some(item => item.id === f.order_item_id && item.order_id === o.id))
        );
        return taskKinds.map((taskType, index) => {
            const done = fullyDone || (physical && index < 2);
            return {
                id: `OFT-${o.id.slice(4)}-${String(index + 1).padStart(2, "0")}`,
                order_id: o.id, task_type: taskType,
                completed_by_id: done ? o.fulfillment_technician_id : null,
                completed_at: done ? (fullyDone && index >= 3 ? o.completed_at : o.updated_at) : null,
                note: null,
            };
        });
    });

// E) Gotowe widoki frontendowe – nie zmieniają struktury rekordów źródłowych.
const summary = (id: string | null): OrderUserSummaryType | null => {
    if (!id) return null;
    const u = userMap.get(id);
    return u ? { id: u.id, firstName: u.firstName, lastName: u.lastName } : null;
};
const fullName = (id: string | null): string | null => {
    const u = id ? userMap.get(id) : null;
    return u ? `${u.firstName} ${u.lastName}` : null;
};
const equipmentById = new Map(equipmentList.map(e => [e.id, e]));

export const getOrderDetails = (orderId: string): OrderDetailsType | null => {
    const o = ordersList.find(v => v.id === orderId);
    const history = orderHistoryList
        .filter(h => h.order_id === orderId)
        .map(h => {
            const user = usersList.find(user => user.id === h.changed_by_id);

            return {
                ...h,
                changed_by: user
                    ? {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        avatarUrl: user.avatarUrl
                    }
                    : undefined
            };
        });

    if (!o) return null;
    const ticket = ticketMap.get(o.ticket_id);
    return {
        ...o,
        ticket: ticket ? { id: ticket.id, title: ticket.title, customer_id: ticket.customer_id } : null,
        created_by: summary(o.created_by_id),
        reviewed_by: summary(o.reviewed_by_id),
        recipient: summary(o.recipient_user_id),
        fulfillment_technician: summary(o.fulfillment_technician_id),
        items: orderItemsList.filter(item => item.order_id === orderId).map(item => {
            const p = productMap.get(item.item_id);
            const f = fulfillmentRows.filter(row => row.order_item_id === item.id);
            const equipmentIds = new Set(fulfillmentLinks
                .filter(link => f.some(row => row.id === link.fulfillment_id))
                .map(link => link.equipment_id));
            const equipment: OrderEquipmentRefType[] = [...equipmentIds].flatMap(id => {
                const e = equipmentById.get(id);
                return e ? [{ id: e.id, product_id: e.product_id, serial_number: e.serialNumber, location_id: e.location_id }] : [];
            });
            return {
                ...item,
                product: p ? { id: p.id, name: p.name, manufacturer: p.manufacturer, model: p.model } : null,
                fulfillments: f, equipment,
            };
        }),
        history,
        fulfillment_tasks: orderFulfillmentTasksList.filter(t => t.order_id === orderId),
    };
};

export const orderListItems: OrderListItemType[] = ordersList.map(o => {
    const items = orderItemsList.filter(i => i.order_id === o.id);
    return {
        ...o,
        item_count: items.length,
        total_quantity: items.reduce((sum, i) => sum + i.quantity, 0),
        recipient_name: fullName(o.recipient_user_id),
        technician_name: fullName(o.fulfillment_technician_id),
    };
});

// Niezmieniony rdzeń zamówienia jest również dostępny bez pól rozszerzonych.
export const bareOrdersList: OrderType[] = ordersList;
