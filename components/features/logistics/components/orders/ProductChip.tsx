import { OrderItemDetailsType, OrderItemType, OrderProductRefType } from "@/data/orders/types";
import { ProductType } from "@/data/products"
import { equipmentTypeIcons } from "@/data/equipments";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { Description } from "@heroui/react";

export const ProductChip = ({ item }: {
    item: OrderItemDetailsType | OrderItemType & {
        product: ProductType | null;
    } | null
}) => {

    const Icon = equipmentTypeIcons[item?.product?.type || "accessory"]

    return (
        <BasicChip color="normal" className="cursor-pointer text-black/60">
            <Icon className="mr-1 text-black/60 text-[14px]" />
            {item?.product?.name}
            <Description>x {item?.quantity}</Description>
        </BasicChip>
    )
}