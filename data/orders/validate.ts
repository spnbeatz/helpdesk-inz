/**
 * Uruchom: tsc && node dist/validate-orders.js
 * Sprawdza krotności, FK, przejścia statusów, ilości, Inventory oraz terminy.
 */
import { locations } from "./locations";
import { usersList } from "./users";
import { ticketsList } from "./tickets.mock";
import { productsList } from "./products";
import { equipmentList as originalEquipmentList } from "./equipments";
import {
    ordersList, orderItemsList, orderHistoryList,
    orderItemFulfillmentsList, orderFulfillmentTasksList,
    fulfillmentEquipmentList, equipmentAssignmentsList,
    equipmentList, suppliersList, getOrderDetails, orderListItems,
} from "./orders.mock";

function check(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(`VALIDATION ERROR: ${message}`);
}
const unique = (ids: string[], name: string) =>
    check(new Set(ids).size === ids.length, `duplicate id in ${name}`);
const fk = (value: string, set: Set<string>, label: string) =>
    check(set.has(value), `invalid ${label} = ${value}`);
const numericTime = (s: string) => Date.parse(s);
const users = new Set(usersList.map(e => e.id));
const tickets = new Set(ticketsList.map(e => e.id));
const products = new Set(productsList.map(e => e.id));
const locationsById = new Map(locations.map(l => [l.id, l]));
const locationIds = new Set(locationsById.keys());
const equipmentById = new Map(equipmentList.map(e => [e.id, e]));
const equipIds = new Set(equipmentById.keys());
const supplierIds = new Set(suppliersList.map(e => e.id));
const orderIds = new Set(ordersList.map(e => e.id));
const itemById = new Map(orderItemsList.map(e => [e.id, e]));
const fulfillmentById = new Map(orderItemFulfillmentsList.map(f => [f.id, f]));
const linkByEquipment = new Map(fulfillmentEquipmentList.map(e => [e.equipment_id, e]));
const assignmentByEquipment = new Map(equipmentAssignmentsList.map(e => [e.equipment_id, e]));

check(locations.length === 21, "expected 21 locations");
check(productsList.length === 112, "expected 112 products");
check(originalEquipmentList.length === 115, "expected 115 original equipment");
check(ordersList.length === 40, "expected 40 orders");
check(orderItemsList.length === 57, "expected 57 order items");

for (const [name, values] of ([
    ["locations", locations.map(v => v.id)],
    ["products", productsList.map(v => v.id)],
    ["equipment", equipmentList.map(v => v.id)],
    ["orders", ordersList.map(v => v.id)],
    ["orderItems", orderItemsList.map(v => v.id)],
    ["histories", orderHistoryList.map(v => v.id)],
    ["fulfillments", orderItemFulfillmentsList.map(v => v.id)],
    ["fulfillment_tasks", orderFulfillmentTasksList.map(v => v.id)],
    ["assignments", equipmentAssignmentsList.map(v => v.id)],
] as [string, string[]][])) unique(values, name);

for (const loc of locations) {
    if (loc.parent_id !== null) {
        const parent = locationsById.get(loc.parent_id);
        check(parent?.type === "branch", `${loc.id} parent must be a branch`);
        check(loc.type === "warehouse", `${loc.id} child must be a warehouse`);
        check(parent.city === loc.city, `${loc.id} parent in another city`);
    } else check(loc.type === "branch", `${loc.id} branch root expected`);
}
for (const u of usersList) fk(u.location_id, locationIds, `users.${u.id}.location_id`);
for (const t of ticketsList) fk(t.customer_id, users, `tickets.${t.id}.customer_id`);

for (const order of ordersList) {
    fk(order.ticket_id, tickets, `${order.id}.ticket_id`);
    fk(order.created_by_id, users, `${order.id}.created_by_id`);
    fk(order.recipient_user_id, users, `${order.id}.recipient_user_id`);
    if (order.reviewed_by_id) fk(order.reviewed_by_id, users, `${order.id}.reviewed_by_id`);
    if (order.fulfillment_technician_id) fk(order.fulfillment_technician_id, users, `${order.id}.fulfillment_technician_id`);
    const ticket = ticketsList.find(t => t.id === order.ticket_id)!;
    check(order.recipient_user_id === ticket.customer_id, `${order.id} recipient != ticket customer`);
    check(numericTime(order.created_at) >= numericTime(ticket.created_at), `${order.id} predates ticket`);
    check(numericTime(order.updated_at) >= numericTime(order.created_at), `${order.id} bad updated_at`);
    check(numericTime(order.updated_at) <= Date.now(), `${order.id} future updated_at`);
    const reviewed = order.status !== "pending";
    check(Boolean(order.reviewed_by_id) === reviewed, `${order.id} review actor mismatch`);
    check(Boolean(order.reviewed_at) === reviewed, `${order.id} reviewed_at mismatch`);
    check(Boolean(order.completed_at) === (order.status === "completed"), `${order.id} completion mismatch`);
    check(order.status !== "declined" || Boolean(order.feedback), `${order.id} declined without feedback`);
    check((order.status === "pending" || order.status === "declined") === (order.fulfillment_technician_id === null), `${order.id} assignment workflow mismatch`);
    const history = orderHistoryList.filter(h => h.order_id === order.id);
    check(history.length > 0, `${order.id} no history`);
    check(history[0].previous_status === null && history[0].new_status === "pending", `${order.id} invalid first event`);
    check(history[history.length - 1].new_status === order.status, `${order.id} final event != current status`);
    for (let i = 0; i < history.length; i++) {
        const e = history[i];
        fk(e.changed_by_id, users, `history ${e.id}.changed_by_id`);
        if (i) {
            check(e.previous_status === history[i - 1].new_status, `${order.id} broken status transitions`);
            check(numericTime(e.created_at) >= numericTime(history[i - 1].created_at), `${order.id} reverse history timestamp`);
        }
    }
    const items = orderItemsList.filter(i => i.order_id === order.id);
    check(items.length > 0, `${order.id} has zero products`);
    const fs = orderItemFulfillmentsList.filter(f => items.some(i => i.id === f.order_item_id));
    check(order.status !== "pending" && order.status !== "declined" || fs.length === 0, `${order.id} unapproved order fulfilled`);
    check(order.status === "pending" || order.status === "declined" || fs.length > 0, `${order.id} approved order without fulfillment`);
    for (const i of items) {
        const f = fs.filter(row => row.order_item_id === i.id);
        const accounted = f.reduce((sum, row) => sum + row.quantity, 0);
        check(order.status === "pending" || order.status === "declined" || accounted === i.quantity, `${i.id} fulfillment qty mismatch: ${accounted} vs ${i.quantity}`);
        if (order.status === "completed") {
            check(f.every(row => row.status === "delivered" && row.received_quantity === row.quantity), `${i.id} completed but not all delivered`);
        }
    }
    const tasks = orderFulfillmentTasksList.filter(x => x.order_id === order.id);
    check((order.status === "completed" || order.status === "in_progress") ? tasks.length === 5 : tasks.length === 0, `${order.id} invalid checklist`);
    if (order.status === "completed") check(tasks.every(t => t.completed_at !== null), `${order.id} missing completed task`);
    const detail = getOrderDetails(order.id);
    check(detail?.items.length === items.length, `${order.id} details wrong items`);
    check(detail?.history.length === history.length, `${order.id} details wrong history`);
}

for (const item of orderItemsList) {
    fk(item.order_id, orderIds, `${item.id}.order_id`);
    fk(item.item_id, products, `${item.id}.item_id`);
    check(item.quantity > 0 && Number.isInteger(item.quantity), `${item.id} bad quantity`);
}
for (const f of orderItemFulfillmentsList) {
    check(itemById.has(f.order_item_id), `${f.id} missing item ${f.order_item_id}`);
    check(Number.isInteger(f.quantity) && f.quantity > 0, `${f.id} invalid quantity`);
    check(Number.isInteger(f.received_quantity) && f.received_quantity >= 0 && f.received_quantity <= f.quantity, `${f.id} received_quantity outside range`);
    if (f.source_type === "supplier") {
        check(f.source_location_id === null, `${f.id} supplier with location`);
        fk(f.supplier_id, supplierIds, `${f.id}.supplier_id`);
    } else {
        check(f.supplier_id === null, `${f.id} warehouse with supplier`);
        const location = locationsById.get(f.source_location_id);
        check(location?.type === "warehouse" && location.id !== "LOC-021", `${f.id} bad warehouse source`);
        const item = itemById.get(f.order_item_id)!;
        const order = ordersList.find(o => o.id === item.order_id)!;
        const recipient = usersList.find(u => u.id === order.recipient_user_id)!;
        const loc = locationsById.get(recipient.location_id)!;
        const branchId = loc.type === "branch" ? loc.id : loc.parent_id;
        check((location.parent_id === branchId) === (f.source_type === "local_stock"), `${f.id} wrong branch transfer/local source`);
    }
}

for (const eq of equipmentList) {
    fk(eq.product_id, products, `${eq.id}.product_id`);
    fk(eq.location_id, locationIds, `${eq.id}.location_id`);
    if (eq.assignedTo) fk(eq.assignedTo, users, `${eq.id}.assignedTo`);
    if (eq.status === "available" || eq.status === "reserved") check(eq.assignedTo === null, `${eq.id} available but assignedTo present`);
}
for (const e of originalEquipmentList) {
    check(equipmentById.has(e.id), `lost original equipment ${e.id}`);
    if (e.status !== "available") {
        check(JSON.stringify(equipmentById.get(e.id)) === JSON.stringify(e), `${e.id} original nonavailable equipment should never be taken`);
    }
}
unique(fulfillmentEquipmentList.map(l => l.equipment_id), "fulfillmentEquipment by equipment_id");
unique(equipmentAssignmentsList.map(a => a.equipment_id), "equipmentAssignments by equipment_id");
for (const link of fulfillmentEquipmentList) {
    check(fulfillmentById.has(link.fulfillment_id), `invalid fulfillment link ${link.fulfillment_id}`);
    fk(link.equipment_id, equipIds, `link ${link.equipment_id}`);
    const f = fulfillmentById.get(link.fulfillment_id)!;
    const item = itemById.get(f.order_item_id)!;
    const eq = equipmentById.get(link.equipment_id)!;
    check(eq.product_id === item.item_id, `product mismatch ${link.equipment_id}: ${eq.product_id} vs ${item.item_id}`);
    const assignment = assignmentByEquipment.get(eq.id);
    check(Boolean(assignment), `${eq.id} link without equipment assignment`);
    check(f.quantity === 1, `${f.id} linked physical item must represent one unit`);
    check(f.status === "delivered" ? assignment!.status === "assigned" : assignment!.status === "reserved", `${eq.id} wrong equipment assignment status`);
}
for (const assignment of equipmentAssignmentsList) {
    const eq = equipmentById.get(assignment.equipment_id);
    check(Boolean(eq), `${assignment.id} missing equipment`);
    check(linkByEquipment.has(assignment.equipment_id), `${assignment.id} has no fulfillment link`);
    if (assignment.user_id) fk(assignment.user_id, users, `${assignment.id}.user_id`);
    if (assignment.technician_id) fk(assignment.technician_id, users, `${assignment.id}.technician_id`);
    if (assignment.ticket_id) fk(assignment.ticket_id, tickets, `${assignment.id}.ticket_id`);
    check(assignment.status === eq!.status, `${assignment.id} vs equipment status`);
    if (assignment.status === "assigned") {
        check(assignment.assigned_at !== null, `${assignment.id} assigned without date`);
        check(eq!.assignedTo === assignment.user_id, `${assignment.id} assignedTo != assigned recipient`);
    } else check(assignment.assigned_at === null, `${assignment.id} reserved with assigned_at`);
}
check(orderListItems.length === ordersList.length, "orderListItems count mismatch");
console.log("OK: spójność FK, typów danych, historii, statusów, ilości i stanów Inventory");
console.log(JSON.stringify({
    locations: locations.length,
    products: productsList.length,
    originalEquipment: originalEquipmentList.length,
    currentEquipment: equipmentList.length,
    orders: ordersList.length,
    orderItems: orderItemsList.length,
    orderHistory: orderHistoryList.length,
    fulfillments: orderItemFulfillmentsList.length,
    fulfillmentEquipment: fulfillmentEquipmentList.length,
    equipmentAssignments: equipmentAssignmentsList.length,
    tasks: orderFulfillmentTasksList.length,
    byStatus: Object.fromEntries(["pending", "accepted", "in_progress", "completed", "declined"].map(k => [k, ordersList.filter(o => o.status === k).length])),
    bySource: Object.fromEntries(["local_stock", "branch_transfer", "supplier"].map(k => [k, orderItemFulfillmentsList.filter(f => f.source_type === k).length])),
}, null, 2));
