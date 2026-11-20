"use client"

import { TicketsScreenHeader } from "@/components/features/tickets/components/TicketsScreenHeader";
import { TicketsStatsSection } from "@/components/features/tickets/sections/TicketsStatsSection";
import { Column } from "@/components/ui/layout/flex/Column";
import { TicketsGrid } from "@/components/features/tickets/components/TicketsGrid";
import { TicketsList } from "@/components/features/tickets/components/TicketsList";

export default function TicketsPage() {

    return (
        <Column StartBetween className="w-full h-full gap-4">
            <TicketsScreenHeader />    
            <TicketsStatsSection />
            <TicketsList />
        </Column>
    )
}
