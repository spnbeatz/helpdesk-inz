import { Row } from "@/components/ui/layout/flex";
import { User, UserMinType } from "@/data/users";
import { Avatar } from "@heroui/react";

type TableUserEmailProps = Pick<UserMinType, "name" | "avatarUrl">;


export const TableUserEmail = ({avatarUrl, name} : TableUserEmailProps ) => {
    return (
        <Row CenterStart className="gap-2 group">
            <Avatar className="w-[22px] h-[22px] rounded-lg">
                <Avatar.Image src={avatarUrl || undefined} />
                <Avatar.Fallback className="text-black/50">{name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
            </Avatar>
            {name}
        </Row>
    )
}