import { Description, Label } from "@heroui/react";

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
            <div className="w-full flex flex-row items-center justify-between shrink-0">
                <div className="flex flex-col items-start justify-center">
                    <Label className="text-black/80 text-lg">
                        {title}
                    </Label>

                    {description && (
                        <Description>
                            {description}
                        </Description>
                    )}
                </div>

                {rightContent}
            </div>

            <div className="flex-1 min-h-0">
                {children}
            </div>
        </div>
    );
};