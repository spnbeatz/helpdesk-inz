import { Section } from "@/components/ui/surfaces/Section";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuFilePlus2 } from "react-icons/lu";
import { EmptyState } from "@heroui/react";
import { ScrollShadow } from "@heroui/react";

export const TicketAttachmentsSection = () => {
    const attachments = [];
    return (
        <Section
            className="h-[250px] w-full mt-auto"
            title="Attachments (0)"
            rightContent={(
                <IconButton Icon={LuFilePlus2} />
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