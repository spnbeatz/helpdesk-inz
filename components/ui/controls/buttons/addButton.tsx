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
        <Button className={"rounded-lg shadow-sm p-0 overflow-hidden"} onClick={onClick}>
            <div className={`w-full h-full ${background.bluepurplegradient}`}>
                <Row Center className="w-full h-full bg-white/30 px-4 gap-2 rounded-lg ">
                    {label} <LuPlus />
                </Row>
            </div>

        </Button>
    )
}