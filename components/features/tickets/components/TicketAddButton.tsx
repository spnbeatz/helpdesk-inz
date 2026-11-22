import { AddButton } from "@/components/ui/controls/buttons/addButton"
import { useModalStore } from "@/store/modals";

export const TicketAddButton = () => {
    const { openModal } = useModalStore();

    const handleCreateTicket = () => {
        openModal("ticketForm");
    }
    return (
        <AddButton label="New Ticket" onClick={handleCreateTicket} />
    )
}