import { formatRelativeDate } from "@/utils/date..util";
import { TicketListItemType } from "@/api/services/tickets.service";
import { User } from "../../users/components/User";

export const TicketUser = ({ ticket } : { ticket: TicketListItemType }) => {

    return (
        <User
            source={ticket.customer.avatarUrl}
            name={ticket.customer?.name}
            description={formatRelativeDate(ticket.created_at)}
        />
    )
}