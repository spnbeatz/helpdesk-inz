import { EquipmentListItemType } from "@/api/services/logistics.service";

export const useEquipmentActionsHandlers = (
    eq: EquipmentListItemType
) => {
    const handleAssign = () => console.log("assign");
    const handleReassign = () => console.log("reassing");
    const handleUnassign = () => console.log("unassign");
    const order = () => console.log("order"); 

    return {
        assign: handleAssign,
        reassign: handleReassign,
        unassign: handleUnassign,
        order
    }
}