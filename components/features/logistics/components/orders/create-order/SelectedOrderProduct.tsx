"use client";

import { OrderItemCreateType } from "@/data/orders/seed";

import { useProduct } from "@/queries/logistics/logistics.query";

import { Row, Column } from "@/components/ui/layout/flex";
import { Description, Label, Input } from "@heroui/react";

import { LuX } from "react-icons/lu";
import { useCreateOrderProducts } from "../../../hooks/useCreateOrderProducts";

export const SelectedOrderProduct = ({
    product,
}: {
    product: OrderItemCreateType;
}) => {
    const { data: productData } = useProduct(product.item_id);
    const { changeQuantity, removeProduct } = useCreateOrderProducts();

    return (
        <Row CenterStart
            className="w-full relative group"
        >
            <Row CenterBetween className="w-full p-2 shadow-sm rounded-lg pr-10">
                <Column StartCenter className="w-full">
                    <Description>{productData?.id}</Description>

                    <Label>
                        {productData?.name} - {productData?.model}
                    </Label>

                    <Description>
                        {productData?.manufacturer}
                    </Description>
                </Column>

                {changeQuantity && (
                    <Input
                        type="number"
                        min={1}
                        className="w-17.5"
                        value={product.quantity}
                        onChange={(e) => {
                            const quantity = Number(e.target.value);

                            if (Number.isInteger(quantity) && quantity > 0) {
                                changeQuantity(product.item_id, quantity);
                            }
                        }}
                    />
                )}
            </Row>
            <LuX
                className="absolute cursor-pointer hidden group-hover:block right-5"
                onClick={() =>
                    removeProduct(product.item_id)
                }
            />
        </Row>

    );
};
