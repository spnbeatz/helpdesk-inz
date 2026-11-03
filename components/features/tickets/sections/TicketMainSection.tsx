import { TicketListItemType } from "@/api/services/tickets.service"
import { Column, Row } from "@/components/ui/layout/flex"
import { Label, Description } from "@heroui/react";
import { TechnicianInfo } from "../components/TechnicianInfo";

export const TicketMainSection = ({ ticket }: { ticket: TicketListItemType }) => {
    return (
        <Column StartCenter className="gap-4 w-full">
            <Row Start className="gap-4 mt-6">
                <div className="w-[3px] h-full bg-indigo-200"></div>
                <Column Start>
                    <Label className="text-xl">{ticket.title}</Label>
                    <Description className="text-sm">{ticket.description}</Description>
                </Column>
            </Row>
            <TechnicianInfo technicianId={ticket.technician_id} />
        </Column>
    )
}