import { Modal } from "../../../composed/modals/Modal";
import { useModalStore } from "@/store/modals";
import { useInventoryProduct } from "@/queries/logistics/logistics.query";

export type InventoryItemModalType = {
    productId?: string
}

export const InventoryItemModal = ({ data } : { data: InventoryItemModalType}) => {

    const { closeModal } = useModalStore();
    const { data: product } = useInventoryProduct(data.productId || "")

    return (
        <Modal 
            isOpen 
            isDismissable={true}
            onOpenChange={(isOpen) => {
                if(!isOpen) closeModal();
            }}
        >
            <div>{product?.assetTag}</div>
        </Modal>
    )
}