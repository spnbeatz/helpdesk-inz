"use client"

import { Column } from "@/components/ui/layout/flex";
import { Label, EmptyState } from "@heroui/react";
import { CommentsList } from "../../comments/components/CommentsList";
import { CommentsInput } from "../../comments/components/CommentsInput";
import { useCommentsList } from "../queries/query";
import { useEffect } from "react";
import { TicketListItemType } from "@/api/services/tickets.service";
import { CommentView } from "@/data/comments/type";
import { useAuth } from "@/providers/auth.provider";
import { Divider } from "@/components/ui/layout/Divider";

export const TicketCommentsSection = ({ ticketData }: { ticketData: TicketListItemType }) => {

    const { data: commentsList = [] } = useCommentsList(ticketData.id);
    const { user } = useAuth();

    const canViewComment = (
        comment: CommentView
    ) => {
        if (!user) return false;

        const role = user.roleNames[0];

        if (role === "Administrator" || role === "Manager") return true;
        if (comment.isPublic) return true;
        if (
            role === "Technician" &&
            ticketData.technician_id === user.id
        ) return true

        return false;
    }

    const inputPlaceholder = () => {
        if (!user) return "Please log in to comment!";
        if (ticketData.status === "resolved") return "Ticket resolved. You can't comment!";
        if (ticketData.status === "pending") return "Please assign yourself to ticket to comment this!";

        const role = user.roleNames[0];

        if (role === "Administrator") return null;

        if (ticketData.technician_id === user.id) return null;
        if (ticketData.customer_id === user.id) return null;

        return "You can't comment!";
    }

    return (
        <Column Start className="w-full h-[400px] gap-2">
            <Label className="text-lg">Comments {commentsList ? commentsList.length : 0}</Label>
            <CommentsInput placeholder={inputPlaceholder()} onSubmit={() => console.log("comment submitted")} />
            <Divider />
            {commentsList && commentsList.length < 1 ?
                (<EmptyState className="w-full h-full flex justify-center items-center">No comments yet</EmptyState>)
                :
                (<CommentsList canView={canViewComment} comments={commentsList || []} />)
            }

        </Column>
    )
}