import { useOrdersPageStore } from "@/store/pages/orders.store";

export const useCreateOrderTicket = () => {
    const { createData, setCreateData } = useOrdersPageStore();

    const selectTicket = (ticketId: string) => {
        setCreateData({ ticket_id: ticketId });
    };

    const removeTicket = () => {
        setCreateData({ ticket_id: undefined });
    };

    return {
        selectedTicketId: createData.ticket_id,
        selectTicket,
        removeTicket,
    };
};