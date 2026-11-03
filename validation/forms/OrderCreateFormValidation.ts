import { OrderCreateType } from "@/data/orders_old";
import { useOrdersPageStore } from "@/store/pages/orders.store";

export type OrderCreateFormErrors = {
    products?: string;
    ticket_id?: string;
    reason?: string;
};

export const orderCreateFormValidation = (createData: OrderCreateType): OrderCreateFormErrors => {

    const errors: OrderCreateFormErrors = {};

    if (createData.products.length === 0) {
        errors.products = "Select at least one product";
    }

    if (createData.products.some(
        (product) =>
            !Number.isInteger(product.quantity) ||
            product.quantity < 1
    )) {
        errors.products = "Product quantity must be greater than 0";
    }

    if (!createData.ticket_id) {
        errors.ticket_id = "Select a ticket";
    }

    if (!createData.reason.trim()) {
        errors.reason = "Reason is required";
    }

    return errors;
};