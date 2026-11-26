import { UserMinType } from "../users";

export type CommentContentType = "ticket"

export type Comment = {
    id: string,
    value: string,
    sender_id: string,
    content_id: string,
    content_type: CommentContentType,
    parent_id: string | null,
    created_at: string,
    updated_at: string | null,
    public: boolean,
    deleted_at: string | null
}

export type CommentView = Comment & {
    sender: UserMinType;
    senderName: string;
    senderAvatarUrl: string | null;

    isEdited: boolean;
    isDeleted: boolean;
    isPublic: boolean;

    createdAtLabel: string;
    updatedAtLabel?: string;

    visibilityLabel: "Publiczny" | "Wewnętrzny";
};