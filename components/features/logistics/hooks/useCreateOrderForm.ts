import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth.provider";
import { useOrdersPageStore } from "@/store/pages/orders.store";
import { useCreateOrder } from "@/queries/logistics/logistics.mutation";
import {
    OrderCreateFormErrors,
    orderCreateFormValidation,
} from "@/validation/forms/OrderCreateFormValidation";
import { useModalStore } from "@/store/modals";

type CreateOrderFormOptions = {
    ticketId?: string;
    itemId?: string;
};

export const useCreateOrderForm = ({
    ticketId,
    itemId,
}: CreateOrderFormOptions) => {
    const { user } = useAuth();
    const { createData, setCreateData } = useOrdersPageStore();
    const { openModal } = useModalStore();

    const [errors, setErrors] = useState<OrderCreateFormErrors | null>(null);

    const {
        mutateAsync: createOrder,
        isPending,
    } = useCreateOrder();

    useEffect(() => {
        setCreateData({
            ticket_id: ticketId,
            created_by_id: user?.id,
            products: itemId
                ? [{ item_id: itemId, quantity: 1 }]
                : [],
        });
    }, [ticketId, itemId, user?.id, setCreateData]);

    const submit = async () => {
        const validationErrors = orderCreateFormValidation(createData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors(null);

        try {
            const result = await createOrder(createData);

            if (result) {
                openModal("confirmation", {
                    iconType: "info",
                    title: "Success",
                    description: `You have ordered items:
                        ${createData.products.map(p => p.item_id).join(", ")}`,
                });
            }
        } catch (error) {
            // Obsługę błędu pozostawiamy mechanizmowi mutacji
            // lub dodajemy tutaj odpowiedni komunikat.
        }
    };

    return {
        errors,
        isPending,
        submit,
    };
};