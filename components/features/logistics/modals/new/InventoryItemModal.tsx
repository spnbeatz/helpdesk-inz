import { Modal } from "@/components/composed/modals/new/Modal";
import { useModalStore } from "@/store/modals";
import { useEquipment, useEquipmentAssigmentsList, useInventoryProduct, useProduct } from "@/queries/logistics/logistics.query";
import { Column, Row } from "@/components/ui/layout/flex";
import { Description, Label } from "@heroui/react";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { User } from "@/components/features/users/components/User";
import { EquipmentAssignActions } from "../../components/equipments/EquipmentAssignActions";
import { EquipmentActionButton } from "../../components/equipments/EquipmentActionButton";
import { EquipmentActionsProvider } from "../../context/equipmentActions.context";
import { useEffect } from "react";

export type InventoryItemModalType = {
    productId?: string
}

export const InventoryItemModal = ({ data }: { data: InventoryItemModalType }) => {

    const { closeModal } = useModalStore();
    const { data: eq } = useEquipment(data.productId);
    const { data: assigments } = useEquipmentAssigmentsList(data.productId);

    const isAssigned = eq?.assignedTo;

    useEffect(() => {
        console.log(assigments, "assigments")
    }, [assigments])

    if (!eq) {
        return null
    }
    return (
        <Modal
            size="lg"
            isDismissable={true}
        >
            <EquipmentActionsProvider item={eq}>
                <Column Start className="w-full gap-4">
                    <Row StartBetween className="w-full">
                        <Column Start>
                            <Label className="text-xl">{eq?.product.name}</Label>
                            <Row CenterStart className="gap-2">
                                <Description>{eq?.id}</Description>
                                <Description>{eq?.product.model}</Description>
                                <Description>{eq?.product.manufacturer}</Description>
                            </Row>
                        </Column>
                        <BasicChip>
                            {eq?.status}
                        </BasicChip>
                    </Row>

                    <Row EndBetween className="w-full">
                        <Column StartCenter className="gap-2">
                            <Description>Assigned user</Description>
                            {isAssigned ? <User
                                source={eq?.assignedUser?.avatarUrl ?? ""}
                                name={eq?.assignedUser?.name}
                                size="small"
                            /> : (
                                <Description className="p-2 border-gray-200 rounded-lg">No assignment</Description>
                            )}

                        </Column>
                        <EquipmentAssignActions />
                    </Row>
                    <EquipmentActionButton action="order" />
                </Column>
            </EquipmentActionsProvider>

        </Modal>
    )
}
