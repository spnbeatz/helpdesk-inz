import { Dropdown } from "@/components/ui/data-display/Dropdown";
import { TicketActionsProvider } from "../context/ticketActions.context";
import { LuEllipsisVertical } from "react-icons/lu";
import { TicketListItemType } from "@/api/services/tickets.service";
import { TicketActionButton } from "./TicketActionButton";

export const TicketOptionsDropdown = ({ ticket }: { ticket: TicketListItemType }) => {
    return (
        <TicketActionsProvider item={ticket}>
            <Dropdown
                trigger={<LuEllipsisVertical size={18}/>}
            >

                <TicketActionButton action="edit" />
                <TicketActionButton action="delete" />
                <TicketActionButton action="close" />
                <TicketActionButton action="assignSelf" />
                <TicketActionButton action="assignTechnician" />
                <TicketActionButton action="remoteConnect" />

            </Dropdown>
        </TicketActionsProvider>
    )
}