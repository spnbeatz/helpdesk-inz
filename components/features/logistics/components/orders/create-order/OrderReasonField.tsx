import { useOrdersPageStore } from "@/store/pages/orders.store";
import { Input } from "@/components/ui/controls/inputs/Input";

export const OrderReasonField = () => {
    const { createData, setCreateData } = useOrdersPageStore();
    return (
        <Input
            label="Reason"
            isRequired
            type="textarea"
            rows={5}
            placeholder="Write a reason of order..."
            value={createData.reason}
            onInput={(v) => setCreateData({ reason: v })}
        />
    )

}