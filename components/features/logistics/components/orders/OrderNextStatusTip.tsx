import { Column } from "@/components/ui/layout/flex";
import { Label } from "@heroui/react";

export const OrderNextStatusTip = () => {
    return (
        <Column className="w-full rounded-lg bg-indigo-200  p-2 shadow-sm">
            <Label className="text-indigo-800">{"What's next?"}</Label>
        </Column>
    )
}