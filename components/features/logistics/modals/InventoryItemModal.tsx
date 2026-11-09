import { Modal } from "../../../composed/modals/Modal";
import { useModalStore } from "@/store/modals";
import { useEquipment, useEquipmentAssigmentsList, useInventoryProduct, useProduct } from "@/queries/logistics/logistics.query";
import { Column, Row } from "@/components/ui/layout/flex";
import { Label } from "@heroui/react";
import { Section } from "@/components/ui/surfaces/Section";

export type InventoryItemModalType = {
    productId?: string
}

export const InventoryItemModal = ({ data }: { data: InventoryItemModalType }) => {

    const { closeModal } = useModalStore();
    const { data: eq } = useEquipment(data.productId);
    const { data: assigments } = useEquipmentAssigmentsList(data.productId);

    return (
        <Modal
            isOpen
            size="lg"
            isDismissable={true}
            onOpenChange={(isOpen) => {
                if (!isOpen) closeModal();
            }}
        >
            <Column Start className="w-full gap-4">
                <Row CenterStart className="gap-2">
                    <Label className="text-2xl">Equipment {eq?.id}</Label>

                </Row>
                <Section title="Product details" className="p-4 shadow-sm bg-white/60 rounded-lg">
                    <Column Start>
                        <Row Start className="gap-1">
                            <Label>Name:</Label>
                            <Label className="font-normal">{eq?.product.name}</Label>
                        </Row>
                        <Row Start className="gap-1">
                            <Label>Model:</Label>
                            <Label className="font-normal">{eq?.product.model}</Label>
                        </Row>
                        <Row Start className="gap-1">
                            <Label>Manufacturer:</Label>
                            <Label className="font-normal">{eq?.product.manufacturer}</Label>
                        </Row>
                        
                    </Column>
                </Section>
                {assigments?.map((assigment) => {
                    return (
                        <Row Start className="gap-2">
                            <div>{assigment.technician_id}</div>
                        </Row>
                    )
                })}

            </Column>
        </Modal>
    )
}