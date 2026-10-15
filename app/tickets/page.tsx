"use client"

import { TicketsScreenHeader } from "@/components/features/tickets/components/TicketsScreenHeader";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { TicketsStatsSection } from "@/components/features/tickets/sections/TicketsStatsSection";
import { Column } from "@/components/ui/layout/flex/Column";
import { TicketsGrid } from "@/components/features/tickets/components/TicketsGrid";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { useAuth } from "@/providers/auth.provider";

export default function TicketsPage() {
    const { user } = useAuth();
    const { statsVisibility, filters, itemsPerPage } = useTicketsPageStore();
    const { data: filteredTickets = [], isLoading } = useTicketList(filters)

    return (
        <Column StartBetween className="w-full h-full gap-4">
            <TicketsScreenHeader/>
            {statsVisibility && <TicketsStatsSection />}
            <TicketsGrid ticketsList={filteredTickets} itemsPerPage={itemsPerPage}/>
        </Column>
    )
}

