import { BasicChip } from "@/components/ui/data-display/BasicChip"
import { TicketStatusType } from "@/data/exampleTicketsList"
import { ticketStatusColorMap, ticketStatusIconMap, ticketStatusMap } from "../helpers/map"

export const TicketStatusChip = ({ status } : { status: TicketStatusType }) => {

    const Icon = ticketStatusIconMap[status];

    return (
        <BasicChip color={ticketStatusColorMap[status]}>
            <Icon size={12}/>
            {ticketStatusMap[status]}
        </BasicChip>
    )
}