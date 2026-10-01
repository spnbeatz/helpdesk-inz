"use client"

import { TicketsScreenHeader } from "@/components/features/tickets/components/TicketsScreenHeader";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { TicketsStatsSection } from "@/components/features/tickets/sections/TicketsStatsSection";
import { TicketsListGridSection } from "@/components/features/tickets/sections/TicketsListGridSection";
import { Column } from "@/components/ui/layout/flex/Column";

export default function TicketsPage() {
    const { statsVisibility } = useTicketsPageStore();

    return (
        <Column className="w-full h-full relative">
            <TicketsScreenHeader />
            {statsVisibility && <TicketsStatsSection />}
            <TicketsListGridSection />
        </Column>
    )
}

