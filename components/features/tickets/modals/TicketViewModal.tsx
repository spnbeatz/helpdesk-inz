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
import { LuCircle, LuCircleX, LuFilePlus2, LuPencil, LuPlugZap, LuSend, LuTrash2, LuUserRoundCheck, LuUserRoundPlus } from "react-icons/lu";
import { Divider } from "@/components/ui/layout/Divider";
import { useAccess } from "@/providers/access.provider";
import { useAuth } from "@/providers/auth.provider";
import { useCustomer } from "@/queries/customers/customers.query";
import { TicketListItemType } from "@/api/services/tickets.service";

export type TicketViewModalProps = {
    ticketId?: string
}

export const TicketViewModal = ({ data }: { data: TicketViewModalProps }) => {

    const { data: ticketData } = useTicket(data?.ticketId);
    const { data: technicianData } = useCustomer(ticketData?.technician_id)

    if (!ticketData) return null;

    return (
        <Modal isDismissable isOpen size="cover" className="w-[700px]" closeTrigger>
            <Column StartBetween className="gap-6 w-full h-full">
                <TicketHeaderSection ticket={ticketData} />
                <TicketMainSection ticket={ticketData} />
                <TicketAttachmentsSection />
                <TicketCommentsSection />
            </Column>

        </Modal>
    )
}

export const TicketHeaderSection = ({ ticket }: { ticket: TicketListItemType }) => {
    return (
        <Column Start className="w-full gap-6 mt-4">
            <Row CenterBetween className="w-full">
                <Description>{ticket.id}</Description>
                <TicketActions ticket={ticket} />
            </Row>
            <Row CenterBetween className="w-full">
                <TicketUser ticket={ticket} />
                <TicketInfoChips ticket={ticket} />
            </Row>
        </Column>
    )
}

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
        <Column Start className="w-full h-full">
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

    const { user } = useAuth();

    const [value, setValue] = useState<string>("")

    return (
        <Row CenterBetween className="w-full gap-2">
            <Avatar>
                <AvatarImage src={user?.avatarUrl || ""} />
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

export const RemoteConnectButton = ({ technicianId }: { technicianId: string | null }) => {
    const { hasPermission } = useAccess();
    const { user } = useAuth();

    console.log(technicianId, "technician", user?.id)
    if (!hasPermission("tickets.remote") || user?.id !== technicianId || !technicianId) return null;

    return (
        <IconButton Icon={LuPlugZap}>Remote connect</IconButton>
    )
}

export const TechnicianInfo = ({ technicianId }: { technicianId: string | null }) => {

    const { data: technicianData } = useCustomer(technicianId);

    if (!technicianData && technicianId === null) return (
        <Description>Not assigned</Description>
    )

    return (
        <Column Start className="gap-2">
            <Description>Assigned to</Description>
            <User
                name={technicianData?.name}
                description="Technician"
                source={technicianData?.avatarUrl}
            />
        </Column>
    )
}

export const TicketActions = ({ ticket }: { ticket: TicketListItemType }) => {
    return (
        <Row Center className="gap-2">
            <TicketAssignToMeButton ticket={ticket} />
            <TicketAssignToUserButton ticket={ticket} />
            <RemoteConnectButton technicianId={ticket.technician_id} />
            <TicketEditButton ticket={ticket} />
            <TicketCloseButton ticket={ticket} />
            <TicketDeleteButton />

        </Row>
    )
}

export const TicketEditButton = ({ ticket }: { ticket: TicketListItemType }) => {
    const { hasRole } = useAccess();
    const { user } = useAuth();

    const canEdit =
        hasRole("Administrator") ||
        ticket.technician_id === user?.id ||
        ticket.customer_id === user?.id;

    if (!user || !canEdit) return null;
    return (
        <IconButton Icon={LuPencil}>Edit</IconButton>
    )
}

export const TicketDeleteButton = () => {
    const { hasRole } = useAccess();

    if (!hasRole("Administrator")) return null;
    return (
        <IconButton Icon={LuTrash2}>Delete</IconButton>
    )
}

export const TicketCloseButton = ({
    ticket
}: {
    ticket: TicketListItemType
}) => {
    const { hasPermission, hasRole } = useAccess();
    const { user } = useAuth();

    const isAdmin = hasRole("Administrator");
    const isOwner = ticket.technician_id === user?.id;

    const canClose =
        !!user &&
        ticket.status !== "closed" &&
        hasPermission("tickets.close") &&
        (isAdmin || isOwner);

    console.log("TicketCloseButton:", {
        userId: user?.id,
        technicianId: ticket.technician_id,
        status: ticket.status,
        isAdmin,
        isOwner,
        hasPermission: hasPermission("tickets.close"),
        canClose
    });

    if (!canClose) return null;

    return (
        <IconButton Icon={LuCircleX}>
            Close ticket
        </IconButton>
    );
};

export const TicketAssignToMeButton = ({
    ticket
}: {
    ticket: TicketListItemType
}) => {
    const { hasPermission } = useAccess();
    const { user } = useAuth();

    const canAssign =
        !!user &&
        ticket.status === "new" &&
        ticket.technician_id === null &&
        hasPermission("tickets.assign.self");

    if (!canAssign) return null;

    return (
        <IconButton Icon={LuUserRoundCheck}>
            Assign to me
        </IconButton>
    );
};

export const TicketAssignToUserButton = ({
    ticket
}: {
    ticket: TicketListItemType
}) => {
    const { hasPermission, hasRole } = useAccess();
    const { user } = useAuth();

    if (!user || ticket.status === "closed") return null;

    const isAssigned = ticket.technician_id !== null;

    const canAssignOther =
        !isAssigned &&
        hasPermission("tickets.assign.other");

    const canReassign =
        isAssigned &&
        hasPermission("tickets.reassign") &&
        (
            hasRole("Administrator") ||
            ticket.technician_id === user.id
        );

    if (!canAssignOther && !canReassign) return null;

    return (
        <IconButton Icon={LuUserRoundPlus}>
            {isAssigned ? "Reassign" : "Assign technician"}
        </IconButton>
    );
};