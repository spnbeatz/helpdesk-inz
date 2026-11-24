import { IconButton } from "@/components/ui/controls/buttons/iconButton"
import { LuUserPlus } from "react-icons/lu"
import { useModalStore } from "@/store/modals"

export const UserCreateButton = () => {

    const { openModal } = useModalStore();

    const openCreateFormModal = () => {
        openModal("createUser")
    }

    return (
        <IconButton 
            Icon={LuUserPlus} 
            className="bg-indigo-400/80 text-white" 
            iconColor="white"
            onClick={openCreateFormModal}
        >
            Create user
        </IconButton>
    )
}