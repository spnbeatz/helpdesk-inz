import { formatRelativeDate } from "@/utils/date..util";
import { TicketListItemType } from "@/api/services/tickets.service";
import { User } from "../../users/components/User";

export const TicketUser = ({ ticket } : { ticket: TicketListItemType }) => {

    return (
        <User
            source="https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            name={ticket.customer?.email}
            description={formatRelativeDate(ticket.created_at)}
        />
    )
}