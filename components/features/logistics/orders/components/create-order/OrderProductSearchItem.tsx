import { ProductType } from "@/data/products";

import { Row } from "@/components/ui/layout/flex";
import { Label, Description } from "@heroui/react";

export const OrderProductSearchItem = ({ product }: { product: ProductType }) => {
    return (
        <Row CenterStart className="gap-2">
            <Label>{product.name}</Label>
            <Description>
                {product.manufacturer} {product.model}
            </Description>
        </Row>
    )
}