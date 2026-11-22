
import { Row } from "@/components/ui/layout/flex";
import { EquipmentActionButton } from "../../inventory/components/EquipmentActionButton";

export const EquipmentAssignActions = () => {
    return (
        <Row Center className="gap-2">
            <EquipmentActionButton action="assign" />
            <EquipmentActionButton action="reassign" />
            <EquipmentActionButton action="unassign" />
        </Row>
    )

}