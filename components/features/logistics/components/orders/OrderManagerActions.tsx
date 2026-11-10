import { useOrderDetails } from "../../context/OrderDetailsProvider";
import { useModalStore } from "@/store/modals";
import { Row } from "@/components/ui/layout/flex";
import { Button } from "@/components/ui/controls/buttons/Button";

export const OrderManagerActions = () => {
    const { orderId } = useOrderDetails();
    const { openModal } = useModalStore();

    const openApproveModal = () => {
        openModal("approveOrder", { id: orderId })
    }

    const openDeclineModal = () => {
        openModal("declineOrder", { id: orderId })
    }

    return (
        <Row Center className="gap-4">
            <Button variant="danger-soft" onClick={openDeclineModal}>Decline</Button>
            <Button className={"bg-indigo-400 text-white shadow-sm"} onClick={openApproveModal}>Approve</Button>
        </Row>
    )
}