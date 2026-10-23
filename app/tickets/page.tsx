"use client"

import { TicketsScreenHeader } from "@/components/features/tickets/components/TicketsScreenHeader";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { TicketsStatsSection } from "@/components/features/tickets/sections/TicketsStatsSection";
import { Column } from "@/components/ui/layout/flex/Column";
import { TicketsGrid } from "@/components/features/tickets/components/TicketsGrid";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { useAuth } from "@/providers/auth.provider";
import { Row } from "@/components/ui/layout/flex";
import { TicketStatusTabSwitch } from "@/components/features/tickets/components/TicketStatusTabSwitch";
import { Search } from "@/components/ui/controls/inputs/Search";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { TicketListFilterButton } from "@/components/features/tickets/components/TicketListFilterButton";
import { AddButton } from "@/components/ui/controls/buttons/addButton";
import { LuChartLine, LuSettings, LuSlash} from "react-icons/lu";
import { useModalStore } from "@/store/modals";
import { Title } from "@/components/ui/typography/Title";

export default function TicketsPage() {
    const { user } = useAuth();
    const { filters, itemsPerPage, title, description } = useTicketsPageStore();
    const { data: filteredTickets = [], isLoading } = useTicketList(filters)

    return (
        <Column StartBetween className="w-full h-full gap-4">
            <Title title={title} description={description} />     
            <TicketsStatsSection />
            <TicketsGridHeader />
            <TicketsGrid ticketsList={filteredTickets} itemsPerPage={itemsPerPage} />
        </Column>
    )
}

export const TicketsGridHeader = () => {

    const { openModal } = useModalStore();
    const { setFilters } = useTicketsPageStore();

    const handleCreateTicket = () => {
        openModal("ticketForm");
    }
    return (
        <Row CenterBetween className="w-full">
            <TicketStatusTabSwitch />
            <Row StartBetween className="gap-2">
                <Search onSearch={(v) => setFilters({ searchValue: v })} />
                <TicketListFilterButton />
                <AddButton label="New Ticket" onClick={handleCreateTicket} />
                <IconButton Icon={LuSettings} />
            </Row>
        </Row>
    )
}
