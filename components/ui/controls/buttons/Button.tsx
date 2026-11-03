import { Button as HButton } from "@heroui/react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof HButton>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <HButton {...props} className={`rounded-lg ${className}`}>
            {children}
        </HButton>
    );
};