import { useOrdersPageStore } from "@/store/pages/orders.store";
import { useTicket } from "@/queries/tickets/tickets.query";

import { Column } from "@/components/ui/layout/flex";
import { EmptyState } from "@heroui/react";
import { Ticket } from "@/components/features/tickets/components/Ticket";

export const SelectedOrderTicket = () => {
    const { createData } = useOrdersPageStore();
    const { data: ticketData } = useTicket(createData.ticket_id || undefined);

    if (!ticketData) return (
        <Column Center className="w-full h-full border p-4 border-gray-200/60 rounded-lg">
            <EmptyState className="py-6">No selected ticket</EmptyState>
        </Column>

    )

    return (
        <Ticket ticket={ticketData} />
    )
}