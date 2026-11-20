import { Button } from "@heroui/react"
import { LuPlus } from "react-icons/lu"
import { background } from "@/styles"
import { Row } from "../../layout/flex"

export const AddButton = ({
    onClick,
    label
}:{
    onClick?: () => void,
    label: string
}) => {
    return (
        <Button variant="ghost" className={"rounded-lg shadow-sm p-0 overflow-hidden"} onClick={onClick}>
            <div className={`w-full h-full bg-indigo-400/60`}>
                <Row Center className="w-full h-full px-4 gap-2 rounded-lg text-xs text-white text-shadow-sm">
                    <LuPlus /> {label} 
                </Row>
            </div>

        </Button>
    )
}