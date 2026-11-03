import { useOrder } from "@/queries/logistics/logistics.query";
import { Modal } from "@/components/composed/modals/Modal";

export type OrderViewModalType = {
    orderId: string
}

export const OrderViewModal = ({ data }: { data: OrderViewModalType }) => {
    const { data: orderData } = useOrder(data.orderId);

    return (
        <Modal isOpen>
            <div>{orderData?.reason}</div>
        </Modal>
    )
}