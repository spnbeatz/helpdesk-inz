import { Button, ButtonProps } from "@heroui/react";
import { ComponentProps } from "react";
import { ButtonRoot } from "@heroui/react";
import { background } from "@/styles";

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
    return (
        <Button {...props}>
{/*             <div className={`w-full h-full ${background.bluepurplegradient}`}>
                <div className="w-full h-full bg-white/70">
                    {typeof children === "function"
                        ? children
                        : children}
                </div>
            </div> */}
        </Button>

    )
}

