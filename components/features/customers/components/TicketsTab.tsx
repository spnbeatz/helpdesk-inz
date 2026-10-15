import { Tab } from "@/components/ui/controls/tabs/Tabs";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { useParams } from "next/navigation";
import { TicketsGrid } from "../../tickets/components/TicketsGrid";


export const TicketsTab = () => {

    const params = useParams<{id: string}>();
    const { data: ticketList } = useTicketList({userId: params.id});

    if(!ticketList) return null;

    return (
        <Tab id="tickets">
            <TicketsGrid ticketsList={ticketList} itemsPerPage={9}/>
        </Tab>
    )
}