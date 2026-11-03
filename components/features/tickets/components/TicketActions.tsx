import { TicketListItemType } from "@/api/services/tickets.service";
import { TicketActionsProvider } from "../context/ticketActions.context";
import { Row } from "@/components/ui/layout/flex";
import { TicketActionButton } from "./TicketActionButton";

export const TicketActions = ({
    ticket
}: {
    ticket: TicketListItemType;
}) => (
    <TicketActionsProvider item={ticket}>
        <Row Center className="gap-2">
            <TicketActionButton action="edit" />
            <TicketActionButton action="delete" />
            <TicketActionButton action="close" />
            <TicketActionButton action="assignSelf" />
            <TicketActionButton action="assignTechnician" />
            <TicketActionButton action="remoteConnect" />
        </Row>
    </TicketActionsProvider>
);