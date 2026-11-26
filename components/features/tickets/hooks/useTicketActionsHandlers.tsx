import { useModalStore } from "@/store/modals";
import { TicketListItemType } from "@/api/services/tickets.service";
import { useAssignTechnician, useCloseTicket, useDeleteTicket } from "../queries/mutation";
import { useAuth } from "@/providers/auth.provider";

export const useTicketActionHandlers = (
    ticket: TicketListItemType
) => {
    const openModal = useModalStore(state => state.openModal);
    const closeAllModals = useModalStore(state => state.closeAllModals);
    const closeModal = useModalStore(state => state.closeModal)

    const { mutateAsync: deleteTicket } = useDeleteTicket();
    const { mutateAsync: closeTicket } = useCloseTicket();
    const { mutateAsync: assignTicket } = useAssignTechnician();

    const { user } = useAuth();

    const handleEdit = () => {
        console.log("edit")
        openModal("ticketForm", { ticketId: ticket.id })
    };

    const handleDelete = () => {
        console.log("delete")
        openModal("confirmation", {
            iconType: "danger",
            title: "Delete ticket",
            description: "Are you sure you want to delete this ticket?",
            confirmAction: () => {
                deleteTicket(ticket.id);
                closeAllModals();
            },
            confirmButtonText: "Delete"
        })
    };

    const handleClose = () => {
        openModal("confirmation", {
            iconType: "warning",
            title: "Close ticket",
            description: "Are you sure you want to close this ticket?",
            confirmAction: () => {
                closeTicket({
                    id: ticket.id,
                    created_at: ticket.created_at
                })
                closeModal();
            },
            closeToPrevious: true,
            confirmButtonText: "Close"
        })
    };

    const handleAssignSelf = () => {
        openModal("confirmation", {
            iconType: "warning",
            title: "Assign ticket",
            description: "Do you want to assign yourself to this ticket?",
            confirmAction: () => {
                if(!user) return;

                assignTicket({
                    id: ticket.id,
                    status: "in_progress",
                    technician_id: user.id
                })

                closeModal();
            },
            
        })
    };

    const handleAssignTechnician = () => {
        openModal("assignTechnician", { ticketId: ticket.id})
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