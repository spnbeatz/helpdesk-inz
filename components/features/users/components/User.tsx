import { Row, Column } from "@/components/ui/layout/flex";
import { Avatar } from "@heroui/react";
import { Label, Description } from "@heroui/react";

export type UserComponentProps = {
    source?: string;
    description?: string,
    name?: string,
    size?: "default" | "small"
}

export const User = ({ source, description, name, size = "default" } : UserComponentProps) => {
    return (
        <Row Center className="gap-2">
            {source && <Avatar size="sm" className={`rounded-lg ${size === "small" && "w-4.5 h-4.5"}`}>
                <Avatar.Image src={source} />
            </Avatar>}
            <Column className="justify-center">
                <Label className={`text-black/70 ${size === "small" && "text-xs"}`}>{name}</Label>
                <Description>{description}</Description>
            </Column>
        </Row>
    )
}