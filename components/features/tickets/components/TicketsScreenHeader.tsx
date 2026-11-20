
import { LuSettings, LuChartLine, LuSlash } from "react-icons/lu"
import { useTicketsPageStore } from "@/store/pages/tickets.store"
import { useModalStore } from "@/store/modals"
import { Title } from "../../../ui/typography/Title"
import { AddButton } from "../../../ui/controls/buttons/addButton"
import { Search } from "../../../ui/controls/inputs/Search";
import { IconButton } from "../../../ui/controls/buttons/iconButton"
import { TicketStatusTabSwitch } from "./TicketStatusTabSwitch"
import { TicketListFilterButton } from "./TicketListFilterButton";
import { Row, Column } from "../../../ui/layout/flex"
import { TicketsListLayoutSwitch } from "./TicketsListLayoutSwitch"
import { TicketsSettingsPopover } from "./TicketsSettingsPopover"
import { useCallback } from "react"

export const TicketsScreenHeader = () => {
    const { setFilters } = useTicketsPageStore();
    const { openModal } = useModalStore();

    const handleCreateTicket = () => {
        openModal("ticketForm");
    }

    const handleSearch = useCallback((value: string) => {
        setFilters({ searchValue: value, page: 1 });
    }, [setFilters]);

    return (
        <Column Center className="w-full pr-2">
            <Row StartBetween className="w-full">
                <Title title={"Tickets"} />
                <Row StartBetween className="gap-2">
                    <TicketStatusTabSwitch />
                    <TicketsListLayoutSwitch />
                    <Search onSearch={handleSearch} />
                    
                    <TicketListFilterButton />
                    <TicketsSettingsPopover />
                    <AddButton label="New Ticket" onClick={handleCreateTicket} />
                </Row>
            </Row>
        </Column>
    )
}

