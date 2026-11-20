"use client"

import { Modal as HModal, ModalContainerProps } from "@heroui/react";
import { useState } from "react";

export const Modal = ({
    children,
    isDismissable = true,
    size = "lg",
    closeTrigger = false,
    className,
    trigger
}: {
    children: React.ReactNode,
    isDismissable?: boolean,
    size?: "lg" | "cover" | "full" | "md" | "sm" | "xs" | undefined,
    closeTrigger?: boolean,
    className?: string,
    trigger?: React.ReactNode
}) => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const handleOpenChange = (open: boolean) => {
        if(!open) setIsOpen(false)
    }
    return (
        <HModal isOpen={isOpen} onOpenChange={handleOpenChange}>
            {trigger}
            <HModal.Backdrop isDismissable={isDismissable}>
                <HModal.Container size={size} className={"h-auto"}>
                    
                    <HModal.Dialog className={`rounded-lg bg-white backdrop-blur-md p-10 ${className}`}>
                        {closeTrigger && <HModal.CloseTrigger />}
                        <HModal.Body>
                            {children}
                        </HModal.Body>
                    </HModal.Dialog>
                </HModal.Container>
            </HModal.Backdrop>
        </HModal>
    )
}