import { useAuth } from "@/providers/auth.provider";
import { useState } from "react";
import { Row } from "@/components/ui/layout/flex";
import { Avatar } from "@heroui/react";
import { Input } from "@/components/ui/controls/inputs/Input";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { LuSend } from "react-icons/lu";

export const CommentsInput = ({ onSubmit }: { onSubmit: () => void }) => {

    const { user } = useAuth();

    const [value, setValue] = useState<string>("")

    return (
        <Row CenterBetween className="w-full gap-2">
            <Avatar>
                <Avatar.Image src={user?.avatarUrl || ""} />
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