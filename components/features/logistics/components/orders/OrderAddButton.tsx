import { IconButton } from "@/components/ui/controls/buttons/iconButton"
import { useModalStore } from "@/store/modals";
import { LuShoppingBag } from "react-icons/lu"

export const OrderAddButton = () => {

    const { openModal } = useModalStore();
    
    const handleOpenCreateOrderModal = () => {
        openModal("createOrder");
    }
    return (
        <IconButton
            Icon={LuShoppingBag}
            iconColor="#ffffffaa"
            onClick={handleOpenCreateOrderModal}
            className="bg-indigo-500/60 text-white/80"
        >
            Create order
        </IconButton>
    )
}