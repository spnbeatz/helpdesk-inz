import { Column } from "@/components/ui/layout/flex";
import { Label, EmptyState } from "@heroui/react";
import { CommentsList } from "../../comments/components/CommentsList";
import { CommentsInput } from "../../comments/components/CommentsInput";

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