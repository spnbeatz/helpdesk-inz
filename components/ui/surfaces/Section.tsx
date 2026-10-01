import { Description, Label } from "@heroui/react";
import { Column, Row } from "../../ui/layout/flex";

export const Section = ({
    children,
    rightContent,
    title,
    description,
    className = "",
}: {
    children: React.ReactNode;
    rightContent?: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}) => {
    return (
        <div className={`w-full flex flex-col min-h-0 ${className}`}>
            <Row CenterBetween className="w-full shrink-0">
                <Column StartCenter>
                    <Label className="text-black/80 text-lg">
                        {title}
                    </Label>

                    {description && (
                        <Description>
                            {description}
                        </Description>
                    )}
                </Column>

                {rightContent}
            </Row>

            <div className="flex-1 min-h-0">
                {children}
            </div>
        </div>
    );
};