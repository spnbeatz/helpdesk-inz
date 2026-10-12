import { Modal } from "@/components/composed/modals/Modal";
import { useModalStore } from "@/store/modals";
import { useCustomer } from "@/queries/customers/customers.query";
import { Column, Row } from "@/components/ui/layout/flex";
import { Avatar } from "@heroui/react";

export type CustomerInfoModalType = {
    customerId: string
};

export const CustomerInfoModal = ({ data }: { data: CustomerInfoModalType }) => {

    const { closeModal } = useModalStore();
    const { data: customer } = useCustomer(data.customerId);

    return (
        <Modal
            isOpen
            size="cover"
            closeTrigger
            isDismissable={true}
            onOpenChange={(isOpen) => {
                if (!isOpen) closeModal();
            }}
        >
            <Column Start className="w-full">
                <Row StartBetween className="w-full">
                    <Column CenterStart className="w-1/3">
                        <Avatar className="w-[200px] h-[200px] rounded-lg">
                            <Avatar.Image src={customer?.avatarUrl} alt={customer?.name.slice(0, 1)} />
                        </Avatar>
                        <div className="text-3xl text-black/70 font-semibold">{customer?.name}</div>
                    </Column>
                </Row>
            </Column>


        </Modal>
    )
}