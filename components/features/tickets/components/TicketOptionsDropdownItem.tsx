import { Dropdown } from "@heroui/react"
import { TicketAction } from "../config/actions.config"
import { TicketActionButton } from "./TicketActionButton"

export const TicketOptionsDropdownItem = ({ action } : { action: TicketAction}) => {
    return (
        <Dropdown.Item className="rounded-xl">
            <TicketActionButton action={action} />
        </Dropdown.Item>
    )
}