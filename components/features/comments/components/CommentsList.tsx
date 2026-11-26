"use client"

import { Column, Row } from "@/components/ui/layout/flex"
import { CommentView } from "@/data/comments/type"
import { Avatar, Description, Label, ScrollShadow } from "@heroui/react"
import { useEffect, useRef } from "react"
import { formatRelativeDate } from "@/utils/date..util"
import { useAuth } from "@/providers/auth.provider"
import { iso } from "zod"
import { LuClock } from "react-icons/lu"

export const CommentsList = ({
    canView,
    comments = [],
}: {
    canView: (comment: CommentView) => boolean
    comments: CommentView[],
}) => {

    return (
        <ScrollShadow className="w-full h-full pr-9 pt-4">
            <Column Start className="gap-3">
                {comments.map((comment) => {
                    return canView(comment) && <CommentListItem key={comment.value} comment={comment} />
                })}
            </Column>

        </ScrollShadow>
    )
}

export type CommentListItemProps = {
    comment: CommentView,
}

export const CommentListItem = ({
    comment,
}: CommentListItemProps) => {

    const { user } = useAuth();

    if (!user) return null;

    const isOwner = user.id === comment.sender_id;

    return (
        <Row Start className={`${!isOwner && "flex-row-reverse"} w-full gap-4`}>
            <CommentUser
                userId={comment.sender_id}
                avatarUrl={comment.senderAvatarUrl}
                name={comment.senderName}
            />
            <CommentBubble comment={comment} isOwner={isOwner} />
        </Row>
    )
}

export const CommentBubble = ({
    comment,
    isOwner
}: {
    comment: CommentView
    isOwner: boolean
}) => {
    return (
        <Row Start className={`${!isOwner && "flex-end"} p-4 rounded-lg shadow-sm bg-indigo-200/30 max-w-[70%]`} >
            <Column Start>
                <Row CenterBetween className={`${!isOwner && "flex-row-reverse"} w-full`}>
                    <Label>{comment.senderName}</Label>
                    {comment.isEdited && <Description className="tex-indigo-400">Edited</Description>}
                </Row>

                <Description className={`text-sm text-black/80 ${!isOwner && "text-left"}`}>{comment.value}</Description>
                <Description className={`${!isOwner && "ml-auto"} mt-2 flex flex-row items-center gap-1`}><LuClock/>{formatRelativeDate(comment.created_at)}</Description>
            </Column>
        </Row>
    )
}

export const CommentUser = ({
    userId,
    avatarUrl,
    name
}: {
    userId: string,
    avatarUrl: string | null,
    name: string
}) => {
    return (
        <Avatar className="mt-2 rounded-lg">
            <Avatar.Image src={avatarUrl || undefined} />
            <Avatar.Fallback>N</Avatar.Fallback>
        </Avatar>
    )
}