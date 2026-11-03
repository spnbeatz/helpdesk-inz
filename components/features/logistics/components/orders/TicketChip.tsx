import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { LuTicket, LuExternalLink } from "react-icons/lu";

export const TicketChip = ({ ticketId }: { ticketId: string }) => {
    return (
        <BasicChip color="normal" className="cursor-pointer text-black/60">
            <LuTicket className="mr-1 text-[16px] text-black/60" />
            {ticketId}
            <LuExternalLink className="ml-1 text-black/50" />
        </BasicChip>
    )
}