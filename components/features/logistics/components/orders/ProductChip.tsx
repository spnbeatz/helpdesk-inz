import { OrderItemType } from "@/data/orders/types";
import { ProductType } from "@/data/products"
import { equipmentTypeIcons } from "@/data/equipments";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { Description } from "@heroui/react";

export const ProductChip = ({ product }: {
    product: OrderItemType & { product: ProductType | null }
}) => {

    const Icon = equipmentTypeIcons[product.product?.type || "accessory"]

    return (
        <BasicChip color="normal" className="cursor-pointer text-black/60">
            <Icon className="mr-1 text-black/60 text-[14px]" />
            {product.product?.name}
            <Description>x {product.quantity}</Description>
        </BasicChip>
    )
}