"use client"

import { Modal } from "@/components/composed/modals/Modal";
import { Row, Column } from "@/components/ui/layout/flex";
import { useTicket } from "@/queries/tickets/tickets.query";
import { useEffect, useState } from "react";
import { TicketUser } from "../components/TicketUser";
import { TicketInfoChips } from "../components/TicketInfoChips";
import { Avatar, AvatarImage, Description, EmptyState, Label, ScrollShadow } from "@heroui/react";
import { Title } from "@/components/ui/typography/Title";
import { Section } from "@/components/ui/surfaces/Section";
import { User } from "../../users/components/User";
import { Input } from "@/components/ui/controls/inputs/Input";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuFilePlus2, LuPencil, LuSend, LuTrash2 } from "react-icons/lu";
import { Divider } from "@/components/ui/layout/Divider";

export type TicketViewModalProps = {
    ticketId?: string
}

export const TicketViewModal = ({ data }: { data: TicketViewModalProps }) => {

    const { data: ticketData } = useTicket(data?.ticketId);

    if (!ticketData) return null;

    return (
        <Modal isDismissable isOpen size="cover" closeTrigger>
            <Row StartBetween className="w-full h-full gap-10">
                <Column StartBetween className="gap-6 w-3/5 h-full">
                    <Row CenterBetween className="w-full">
                        <TicketUser ticket={ticketData} />
                        <TicketInfoChips ticket={ticketData} />
                    </Row>
                    <Column StartCenter className="gap-4">
                        <Row Start className="gap-4 mt-6">
                            <div className="w-[3px] h-full bg-indigo-200"></div>
                            <Column Start>
                                <Label className="text-xl">{ticketData.title}</Label>
                                <Description className="text-sm">{ticketData.description}</Description>
                            </Column>
                        </Row>
                        <Row CenterStart className="gap-2">
                            <IconButton Icon={LuPencil} />
                            <IconButton Icon={LuTrash2} className="bg-orange-400"/>
                        </Row>

                    </Column>


                    <TicketAttachmentsSection />
                    <Section description="Assigned To" className="flex flex-col items-start gap-2">
                        <User
                            name="kamil@gmail.com"
                            description="Technician"
                            source="https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                        />
                    </Section>
                </Column>
                <Divider vertical />
                <TicketCommentsSection />
            </Row>

        </Modal>
    )
}

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

export const TicketCommentsSection = () => {
    const comments = ["1"]
    return (
        <Column Start className="w-2/5 h-full">
            <Label className="text-lg">Comments {"(0)"}</Label>
            {comments.length < 1 ?
                (<EmptyState className="w-full h-full flex justify-center items-center">No comments yet</EmptyState>)
                :
                (<CommentsList comments={comments} />)
            }
            <CommentsInput onSubmit={() => console.log("comment submitted")} />
        </Column>
    )
}

export const CommentsList = ({ comments = [] }: { comments: any[] }) => {
    return (
        <ScrollShadow className="w-full h-full">

        </ScrollShadow>
    )
}

export const CommentsInput = ({ onSubmit }: { onSubmit: () => void }) => {

    const [value, setValue] = useState<string>("")

    return (
        <Row CenterBetween className="w-full gap-2">
            <Avatar>
                <AvatarImage src={"https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"} />
            </Avatar>
            <Input
                value={value}
                onInput={(value, _) => setValue(value)}
                placeholder="Write a comment..."
            />
            <IconButton Icon={LuSend} onClick={onSubmit} />
        </Row>
    )
}