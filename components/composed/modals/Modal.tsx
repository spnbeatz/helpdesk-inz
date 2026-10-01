import { Modal as HModal } from "@heroui/react"

export const Modal = ({
    children,
    isOpen = true,
    isDismissable = true,
    onOpenChange
}: {
    children: React.ReactNode,
    isOpen?: boolean,
    isDismissable?: boolean,
    onOpenChange?: (isOpen: boolean) => void
}) => {
    return (
        <HModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <HModal.Backdrop isDismissable={isDismissable}>
                <HModal.Container size="lg">
                    <HModal.Dialog className="rounded-lg bg-white/80 backdrop-blur-md">
                        <HModal.Body>
                            {children}
                        </HModal.Body>
                    </HModal.Dialog>
                </HModal.Container>
            </HModal.Backdrop>
        </HModal>
    )
}