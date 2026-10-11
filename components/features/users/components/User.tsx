import { Row, Column } from "@/components/ui/layout/flex";
import { Avatar } from "@heroui/react";
import { Label, Description } from "@heroui/react";

export type UserComponentProps = {
    source?: string;
    description?: string,
    name?: string
}

export const User = ({ source, description, name } : UserComponentProps) => {
    return (
        <Row Center className="gap-2">
            {source && <Avatar size="sm" className="rounded-lg">
                <Avatar.Image src={source} />
            </Avatar>}
            <Column className="justify-center">
                <Label className="text-black/70">{name}</Label>
                <Description>{description}</Description>
            </Column>
        </Row>
    )
}