"use client"

import { Modal as HModal, ModalContainerProps } from "@heroui/react";
import { useModalStore } from "@/store/modals";

export const Modal = ({
    children,
    isOpen = true,
    isDismissable = true,
    onOpenChange,
    size = "lg",
    closeTrigger = false,
    className
}: {
    children: React.ReactNode,
    isOpen?: boolean,
    isDismissable?: boolean,
    onOpenChange?: (isOpen: boolean) => void,
    size?: "lg" | "cover" | "full" | "md" | "sm" | "xs" | undefined,
    closeTrigger?: boolean,
    className?: string
}) => {

    const { closeModal } = useModalStore();

    const handleOpenChange = (open: boolean) => {
        if(onOpenChange) {
            onOpenChange(open);
            return;
        };

        if(isDismissable){
            closeModal();
        }
    }
    return (
        <HModal isOpen={isOpen} onOpenChange={handleOpenChange}>
            <HModal.Backdrop isDismissable={isDismissable}>
                <HModal.Container size={size}>
                    
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