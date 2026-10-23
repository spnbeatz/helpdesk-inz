import { IconType } from "react-icons";
import { Button } from "@heroui/react";

export const IconButton = ({
    Icon,
    onClick,
    variant = "outline",
    children,
    className,
    disabled = false,
    iconColor
}: {
    Icon: IconType,
    onClick?: () => void,
    variant?: "outline" | "danger" | "danger-soft" | "ghost" | "primary" | "secondary" | "tertiary" | undefined,
    children?: React.ReactNode,
    className?: string,
    disabled?: boolean,
    iconColor?: string
}) => {
    return (
        <Button
            onClick={onClick}
            className={`rounded-lg text-xs shadow-sm px-3 font-normal relative ${className}`}
            variant={variant} isDisabled={disabled}>
            <Icon className="text-black/70" color={iconColor}/>
            {children}
        </Button>
    )

}

