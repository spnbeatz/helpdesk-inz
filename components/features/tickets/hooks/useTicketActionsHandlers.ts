import { useModalStore } from "@/store/modals";
import { TicketListItemType } from "@/api/services/tickets.service";

export const useTicketActionHandlers = (
    ticket: TicketListItemType
) => {
    const { openModal } = useModalStore();

    const handleEdit = () => {
        console.log("edit")
    };

    const handleDelete = () => {
        openModal("deleteTicket", { ticketId: ticket.id });
    };

    const handleClose = () => {
        console.log("close ticket")
    };

    const handleAssignSelf = () => {
        console.log("assign self")
    };

    const handleAssignTechnician = () => {
        console.log("assign technician")
    };

    const handleRemoteConnect = () => {
        console.log("open remote")
    };

    return {
        edit: handleEdit,
        delete: handleDelete,
        close: handleClose,
        assignSelf: handleAssignSelf,
        assignTechnician: handleAssignTechnician,
        remoteConnect: handleRemoteConnect
    };
};