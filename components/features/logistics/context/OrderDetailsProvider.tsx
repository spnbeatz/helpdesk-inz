"use client";

import {
    createContext,
    useContext,
    ReactNode
} from "react";

import { useParams } from "next/navigation";
import { useOrder } from "@/queries/logistics/logistics.query";

type OrderDetailsContextType = {
    orderId: string;
    query: ReturnType<typeof useOrder>;
};

const OrderDetailsContext =
    createContext<OrderDetailsContextType | null>(null);

export const OrderDetailsProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const { id } = useParams<{ id: string }>();

    const query = useOrder(id);

    return (
        <OrderDetailsContext.Provider
            value={{
                orderId: id,
                query
            }}
        >
            {children}
        </OrderDetailsContext.Provider>
    );
};

export const useOrderDetails = () => {
    const context = useContext(OrderDetailsContext);

    if (!context) {
        throw new Error(
            "useOrderDetails must be used within OrderDetailsProvider"
        );
    }

    return {
        orderId: context.orderId,
        order: context.query.data,
        ...context.query
    };
};