import { Modal } from "../../../composed/modals/Modal";
import { useModalStore } from "@/store/modals";
import { useEquipment, useEquipmentAssigmentsList, useInventoryProduct, useProduct } from "@/queries/logistics/logistics.query";
import { Column, Row } from "@/components/ui/layout/flex";
import { Description, Label, ScrollShadow } from "@heroui/react";
import { Section } from "@/components/ui/surfaces/Section";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { User } from "../../users/components/User";
import { LuDot } from "react-icons/lu";
import { useAuth } from "@/providers/auth.provider";
import { useAccess } from "@/providers/access.provider";
import { EquipmentAssignActions } from "../components/equipments/EquipmentAssignActions";
import { EquipmentActionButton } from "../components/equipments/EquipmentActionButton";
import { EquipmentActionsProvider } from "../context/equipmentActions.context";
import { Grid } from "@/components/ui/layout/Grid";
import { EquipmentListItemType } from "@/api/services/logistics.service";

export type InventoryItemModalType = {
    productId?: string
}

export const InventoryItemModal = ({ data }: { data: InventoryItemModalType }) => {

    const { closeModal } = useModalStore();
    const { data: eq } = useEquipment(data.productId);

    const isAssigned = eq?.assignedTo;

    const detailCardsConfig:{title: string, descriptionKey: keyof EquipmentListItemType}[] = [
        { title: "Serial number", descriptionKey: "serialNumber" },
        { title: "Purchase Date", descriptionKey: "purchaseDate" },
        { title: "Warranty Until", descriptionKey: "warrantyUntil" }
    ]

    if (!eq) {
        return null
    }
    return (
        <Modal
            isOpen
            size="lg"
            isDismissable={true}
            onOpenChange={(isOpen) => {
                if (!isOpen) closeModal();
            }}
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
                    <Column Start className="gap-4 w-full">
                        <Description className="font-semibold">Details</Description>
                        <Grid cols={3} gap={4} className="w-full">
                            {detailCardsConfig.map((detail) => (
                                <DetailCard
                                    key={detail.descriptionKey}
                                    title={detail.title}
                                    description={String(eq?.[detail.descriptionKey])}
                                />
                            ))}
                        </Grid>
                    </Column>
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

export const DetailCard = ({
    title,
    description,
    className
}: {
    title?: string,
    description?: string,
    className?: string
}) => {
    return (
        <Column Center className={`w-full bg-white/60 shadow-sm p-4 rounded-lg ${className}`}>
            <Label className="text-xs">{title}</Label>
            <Description>{description}</Description>
        </Column>
    )
}


export const EquipmentAssigmentsHistory = ({ equipmentId }: { equipmentId?: string }) => {

    const { data: assigments } = useEquipmentAssigmentsList(equipmentId);

    return (
        <Section title="Assigments history" className="h-50 w-full">
            <ScrollShadow className="w-full">
                {assigments?.map((assigment) => {
                    return (
                        <Row CenterBetween className="gap-2 w-full">
                            <p>{assigment.status}</p>
                        </Row>
                    )
                })}
            </ScrollShadow>
        </Section>
    )

}