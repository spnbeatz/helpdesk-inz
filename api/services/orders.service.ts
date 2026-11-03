/**
 * Serwis MOCK – Orders.
 * Korzysta z tych samych mutowalnych tablic co orders.mock.ts.
 * Docelowo operacje tworzenia i walidacja uprawnien musza byc na backendzie.
 */
import { usersList, type UserType } from "@/data/users";
import type { OrdersPageFiltersType } from "@/store/pages/orders.store";
import { ticketsList } from "@/data/exampleTicketsList";
import { productsList } from "@/data/products";
import {
    ordersList,
    orderItemsList,
    orderHistoryList,
    getOrderDetails,
} from "@/data/orders/mock";
import type {
    OrderCreateType,
    OrderItemType,
    OrderWithAssignmentType,
    OrderWithProductsType,
    OrderListViewType,
    OrderDetailViewType,
} from "@/data/orders/types";

/**
 * Rozszerza dotychczasowe filtry Zustand bez konieczności natychmiastowej
 * edycji orders.store.ts.
 */
type ExtendedOrdersPageFiltersType = OrdersPageFiltersType & {
    recipientUserId?: string;
    fulfillmentTechnicianId?: string | null;
    offset?: number;
};

const nextMockId = (prefix: string, ids: readonly string[], digits = 3): string => {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${escaped}-(\\d+)$`);
    const max = ids.reduce((current, id) => {
        const match = regex.exec(id);
        return match ? Math.max(current, Number(match[1])) : current;
    }, 0);
    return `${prefix}-${String(max + 1).padStart(digits, "0")}`;
};

const mapUser = (user: UserType | undefined) =>
    user ? {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatarUrl: user.avatarUrl ?? "",
    } : null;

const fullName = (user: UserType | undefined): string | null =>
    user ? `${user.firstName} ${user.lastName}` : null;

/**
 * Tworzy Order z produktami i pierwszym zdarzeniem historii.
 * Nie tworzy jeszcze fulfillmentów ani przypisań EQ – nastąpi to po akceptacji.
 */
export const createOrder = async (
    data: OrderCreateType
): Promise<OrderWithProductsType> => {
    const { ticket_id, created_by_id, products, reason } = data;

    if (!ticket_id || !created_by_id) {
        throw new Error("Ticket and creator are required");
    }

    const ticket = ticketsList.find(t => t.id === ticket_id);
    if (!ticket) throw new Error("Ticket not found");

    if (!usersList.some(u => u.id === created_by_id)) {
        throw new Error("Creator not found");
    }

    if (!usersList.some(u => u.id === ticket.customer_id)) {
        throw new Error("Ticket recipient not found");
    }

    if (!reason.trim()) throw new Error("Reason is required");
    if (!products.length) throw new Error("At least one product is required");

    const productMap = new Map(productsList.map(p => [p.id, p]));
    const seen = new Set<string>();

    for (const item of products) {
        if (!item.item_id || !Number.isInteger(item.quantity) || item.quantity < 1) {
            throw new Error("Invalid product or quantity");
        }
        if (seen.has(item.item_id)) throw new Error("Duplicate product in order");
        seen.add(item.item_id);

        const product = productMap.get(item.item_id);
        if (!product || !product.is_active) {
            throw new Error(`Product ${item.item_id} is unavailable`);
        }
    }

    const now = new Date().toISOString();
    const orderId = nextMockId("ORD", ordersList.map(o => o.id));

    const order: OrderWithAssignmentType = {
        id: orderId,
        ticket_id,
        reason: reason.trim(),
        created_by_id,
        recipient_user_id: ticket.customer_id,
        fulfillment_technician_id: null,
        status: "pending",
        feedback: null,
        reviewed_by_id: null,
        reviewed_at: null,
        created_at: now,
        updated_at: now,
        completed_at: null,
    };

    const orderItems: OrderItemType[] = products.map((item, index) => ({
        id: `OI-${orderId.slice(4)}-${String(index + 1).padStart(2, "0")}`,
        order_id: orderId,
        item_id: item.item_id,
        quantity: item.quantity,
    }));

    const historyId = nextMockId("OH", orderHistoryList.map(h => h.id), 4);

    // Mock: wszystkie trzy tablice muszą być aktualizowane razem.
    ordersList.push(order);
    orderItemsList.push(...orderItems);
    orderHistoryList.push({
        id: historyId,
        order_id: orderId,
        changed_by_id: created_by_id,
        previous_status: null,
        new_status: "pending",
        comment: null,
        created_at: now,
    });

    return { ...order, products: orderItems };
};

/**
 * Lista dla widoku Orders: uzupełniona o produkty, użytkowników, ticket
 * i pola podsumowujące. Indeksy są budowane przy wywołaniu, dlatego nowe
 * zamówienia dodane przez createOrder pojawiają się od razu.
 */
export const getOrdersList = (
    filter: ExtendedOrdersPageFiltersType = {}
): OrderListViewType[] => {
    const {
        sortBy = "created_at",
        sortDir = "desc",
        status = "all",
        searchValue,
        createdById,
        reviewedById,
        ticketId,
        createdAfter,
        createdBefore,
        limit,
        productId,
        orderId,
        recipientUserId,
        fulfillmentTechnicianId,
        offset = 0,
    } = filter;

    const productMap = new Map(productsList.map(p => [p.id, p]));
    const ticketsMap = new Map(ticketsList.map(t => [t.id, t]));
    const usersMap = new Map(usersList.map(u => [u.id, u]));
    const orderItemsMap = new Map<string, OrderItemType[]>();

    for (const item of orderItemsList) {
        const existing = orderItemsMap.get(item.order_id) ?? [];
        existing.push(item);
        orderItemsMap.set(item.order_id, existing);
    }

    let result = ordersList.filter(order => {
        if (status !== "all" && order.status !== status) return false;
        if (orderId && order.id !== orderId) return false;
        if (createdById && order.created_by_id !== createdById) return false;
        if (reviewedById !== undefined && order.reviewed_by_id !== reviewedById) return false;
        if (ticketId && order.ticket_id !== ticketId) return false;
        if (recipientUserId && order.recipient_user_id !== recipientUserId) return false;
        if (fulfillmentTechnicianId !== undefined &&
            order.fulfillment_technician_id !== fulfillmentTechnicianId) return false;
        if (productId && !(orderItemsMap.get(order.id) ?? [])
            .some(item => item.item_id === productId)) return false;

        const created = Date.parse(order.created_at);
        if (createdAfter && created < Date.parse(createdAfter)) return false;
        if (createdBefore && created > Date.parse(createdBefore)) return false;

        if (!searchValue?.trim()) return true;
        const query = searchValue.trim().toLowerCase();
        const ticket = ticketsMap.get(order.ticket_id);
        const itemMatches = (orderItemsMap.get(order.id) ?? []).some(item => {
            const product = productMap.get(item.item_id);
            return [item.item_id, product?.name, product?.manufacturer,
                product?.model, product?.type]
                .some(value => (value ?? "").toLowerCase().includes(query));
        });
        const userMatches = [
            order.created_by_id,
            order.reviewed_by_id,
            order.recipient_user_id,
            order.fulfillment_technician_id,
        ].some(id => {
            const u = id ? usersMap.get(id) : null;
            return u && `${u.firstName} ${u.lastName}`.toLowerCase().includes(query);
        });

        return [order.id, order.ticket_id, order.reason, order.status,
            ticket?.title, order.feedback]
            .some(value => (value ?? "").toLowerCase().includes(query)) ||
            itemMatches || Boolean(userMatches);
    });

    // Bezpieczny fallback, gdy UI poda nieobsługiwaną kolumnę.
    const sortable = new Set<keyof OrderWithAssignmentType>([
        "id", "ticket_id", "reason", "status", "feedback",
        "created_by_id", "reviewed_by_id", "created_at", "updated_at",
        "reviewed_at", "completed_at", "recipient_user_id",
        "fulfillment_technician_id",
    ]);
    const requestedSort = sortBy as keyof OrderWithAssignmentType;
    const sortKey: keyof OrderWithAssignmentType = sortable.has(requestedSort)
        ? requestedSort : "created_at";
    result = [...result].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        const comparison = String(aValue).localeCompare(String(bValue), undefined, {
            numeric: true,
            sensitivity: "base",
        });
        return sortDir === "asc" ? comparison : -comparison;
    });

    // Offset przed limitem (nie zmienia zasad filtrowania).
    const safeOffset = Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0;
    result = result.slice(safeOffset);
    if (limit !== undefined && Number.isFinite(limit)) {
        result = result.slice(0, Math.max(0, Math.floor(limit)));
    }

    return result.map(order => {
        const items = orderItemsMap.get(order.id) ?? [];
        const creator = usersMap.get(order.created_by_id);
        const reviewer = order.reviewed_by_id ? usersMap.get(order.reviewed_by_id) : undefined;
        const recipient = usersMap.get(order.recipient_user_id);
        const technician = order.fulfillment_technician_id
            ? usersMap.get(order.fulfillment_technician_id)
            : undefined;

        return {
            ...order,
            item_count: items.length,
            total_quantity: items.reduce((total, item) => total + item.quantity, 0),
            recipient_name: fullName(recipient),
            technician_name: fullName(technician),
            products: items.map(item => ({
                ...item,
                product: productMap.get(item.item_id) ?? null,
            })),
            ticket: ticketsMap.get(order.ticket_id) ?? null,
            createdBy: mapUser(creator),
            reviewedBy: mapUser(reviewer),
            recipientUser: mapUser(recipient),
            fulfillmentTechnician: mapUser(technician),
        };
    });
};

/**
 * Pełny szczegół zamówienia: dawne pola listy + statusy i źródła realizacji,
 * konkretne urządzenia EQ-*, historia i checklista technika.
 * Nie korzysta ze statycznego orderListItems (wyliczonego przy imporcie).
 */
export const getOrder = (id: string): OrderDetailViewType | null => {
    const order = getOrdersList({ orderId: id, limit: 1 })[0];
    if (!order) return null;

    const details = getOrderDetails(id);
    if (!details) return null;

    return {
        ...order,
        items: details.items,
        history: details.history,
        fulfillment_tasks: details.fulfillment_tasks,
    };
};
