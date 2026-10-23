
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

export const TicketsScreenHeader = () => {
    const { title, description, setFilters } = useTicketsPageStore();
    const { openModal } = useModalStore();

    const handleCreateTicket = () => {
        openModal("ticketForm");
    }
    return (
        <Column Center className="w-full pr-2">
            <Row StartBetween className="w-full">
                <Title title={title}  />
                <Row StartBetween className="gap-2">
                    <TicketStatusTabSwitch />
                    <Search onSearch={(v) => setFilters({ searchValue: v })} />
                    <TicketListFilterButton />
                    <AddButton label="New Ticket" onClick={handleCreateTicket} />

                    <IconButton Icon={LuSettings} />

                </Row>
            </Row>
        </Column>
    )
}

