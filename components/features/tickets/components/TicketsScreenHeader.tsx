
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
    const { setStatsVisibility, statsVisibility, title, description } = useTicketsPageStore();
    const { openModal } = useModalStore();
    const { setFilters } = useTicketsPageStore();

    const handleCreateTicket = () => {
        openModal("ticketForm");
    }
    return (
        <Column Center className="w-full pr-2">
            <Row Start className="w-full">
                <Title title={title} description={description} />
                <Row StartBetween className="gap-2">
                    <TicketStatusTabSwitch />

                    <Search onSearch={(v) => setFilters({searchValue: v})}/>

                    <IconButton Icon={LuChartLine} onClick={setStatsVisibility}>
                        {!statsVisibility && <LuSlash className="absolute" />}
                    </IconButton>

                    <TicketListFilterButton />

                    <AddButton label="New Ticket" onClick={handleCreateTicket} />

                    <IconButton Icon={LuSettings} />

                </Row>
            </Row>
        </Column>
    )
}

