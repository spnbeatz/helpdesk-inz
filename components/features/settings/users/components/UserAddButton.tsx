import { IconButton } from "@/components/ui/controls/buttons/iconButton"
import { LuUserPlus } from "react-icons/lu"

export const UserAddButton = () => {
    return (
        <IconButton Icon={LuUserPlus} className="bg-indigo-400/80 text-white" iconColor="white">Create user</IconButton>
    )
}