import { Section } from "@/components/ui/surfaces/Section";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuFilePlus2 } from "react-icons/lu";
import { EmptyState } from "@heroui/react";
import { ScrollShadow } from "@heroui/react";
import { useModalStore } from "@/store/modals";
import { TicketListItemType } from "@/api/services/tickets.service";

export const TicketAttachmentsSection = ({ ticket } : { ticket: TicketListItemType }) => {
    const attachments = [];
    const { openModal } = useModalStore();

    const handleAddAttachment = () => {
        openModal("ticketAttachments", { ticket })
    };

    return (
        <Section
            className="h-[100px] w-full mt-auto"
            title="Attachments (0)"
            rightContent={(
                <IconButton Icon={LuFilePlus2} onClick={handleAddAttachment}/>
            )}
        >
            {attachments.length < 1 ?
                (<EmptyState className="w-full h-full flex justify-center items-center">No attachments yet</EmptyState>)
                :
                (<ScrollShadow>

                </ScrollShadow>)
            }

        </Section >
    )
}