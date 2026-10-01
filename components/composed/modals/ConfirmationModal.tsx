import { useModalStore } from "@/store/modals"
import { background } from "@/styles";
import { Description, Label, Modal, Button } from "@heroui/react";
import { FcInfo } from "react-icons/fc";
import { TiInfoLarge, TiWarning } from "react-icons/ti";

export type ConfirmationModalProps = {
    iconType: "info" | "warning" | "danger",
    title: string,
    description?: string,
    confirmAction?: () => void,
    confirmButtonText?: string
}

export const ConfirmationModal = ({ data }: { data: ConfirmationModalProps }) => {

    const { closeModal } = useModalStore();

    const getIcon = () => {

        const iconSize = 30;

        switch (data.iconType) {
            case "info": return <TiInfoLarge size={iconSize} color="blue" />
            case "warning": return <TiWarning size={iconSize} color="orange" />
            case "danger": return <TiWarning size={iconSize} color="red" />
            default: return <TiWarning size={iconSize} color="green" />
        }
    }

    return (
        <Modal
            isOpen
            
            onOpenChange={(open) => {
                if (!open) {
                    closeModal();
                }
            }}
        >
            <Modal.Backdrop isDismissable={false}>
                <Modal.Container >
                    <Modal.Dialog className={"rounded-lg bg-white/80 backdrop-blur-md"}>
                        <Modal.CloseTrigger />
                        <Modal.Header className="flex flex-row items-center justify-start">
                            {getIcon()}
                            <Label>{data.title}</Label>
                        </Modal.Header>
                        {data.description &&
                            <Modal.Body>
                                <Description>{data.description}</Description>
                            </Modal.Body>
                        }
                        <Modal.Footer className="w-full flex flex-row items-center justify-end">
                            {data.confirmAction && 
                            <Button variant="tertiary" onClick={closeModal} className={"rounded-lg"}>
                                Cancel
                            </Button>}
                            <Button onClick={data.confirmAction} className={"rounded-lg bg-sky-700/60"}>
                                {data.confirmButtonText || "Confirm"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}