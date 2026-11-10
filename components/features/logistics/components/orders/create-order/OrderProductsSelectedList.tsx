"use client"

import { useCreateOrderProducts } from "../../../hooks/useCreateOrderProducts";

import { Column, Row } from "@/components/ui/layout/flex";
import { EmptyState, Description, ScrollShadow } from "@heroui/react";
import { SelectedOrderProduct } from "./SelectedOrderProduct";

export const OrderProductsSelectedList = () => {

    const { products } = useCreateOrderProducts();

    return (
        <Column
            Center
            className="w-full h-87.5 border border-gray-200/60 p-4 rounded-lg gap-2"
        >
            <Description className="w-full">
                Selected products
            </Description>

            {products.length < 1 ? (
                <Row Center className="h-full">
                    <EmptyState>
                        No selected products
                    </EmptyState>
                </Row>
            ) : (
                <ScrollShadow className="h-full w-full">
                    {products.map((product) => <SelectedOrderProduct product={product} />)}
                </ScrollShadow>
            )}
        </Column>
    )
}