"use client"

import { TicketsStatsSection } from "@/components/features/tickets/sections/TicketsStatsSection";
import { Column } from "@/components/ui/layout/flex/Column";
import { TicketsGrid } from "@/components/features/tickets/components/TicketsGrid";
import { Title } from "@/components/ui/typography/Title";
import { TableView } from "@/components/composed/table/TableView";
import { ticketTableId } from "@/components/features/tickets/config/ticketsTableColumns.config";
import { TicketStatusTabSwitch } from "@/components/features/tickets/components/TicketStatusTabSwitch";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { useCallback } from "react";
import { TicketListFilterButton } from "@/components/features/tickets/components/TicketListFilterButton";
import { TicketsSettingsPopover } from "@/components/features/tickets/components/TicketsSettingsPopover";
import { TicketAddButton } from "@/components/features/tickets/components/TicketAddButton";
import { TicketsTable } from "@/components/features/tickets/components/TicketsTable";

export default function TicketsPage() {

    const setFilters = useTicketsPageStore(state => state.setFilters);

    const onSearch = useCallback((value: string) => {
        setFilters({ searchValue: value })
    }, [setFilters])

    return (
        <Column StartBetween className="w-full h-full gap-4">
            <Title title="Tickets" />
            <TicketsStatsSection />
            <TableView
                tableId={ticketTableId}
                leftContent={<TicketStatusTabSwitch />}
                onSearch={onSearch}
                filterButton={<TicketListFilterButton />}
                settingsButton={<TicketsSettingsPopover />}
                createButton={<TicketAddButton />}
                table={<TicketsTable />}
                grid={<TicketsGrid />}
            />
        </Column>
    )
}
