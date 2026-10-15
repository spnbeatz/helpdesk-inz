import { Dropdown as HDropdown } from "@heroui/react";

type DropdownProps = {
    trigger: React.ReactNode,
    body: React.ReactNode
}

export const Dropdown = ({trigger, body} : DropdownProps) => {
    return (
        <HDropdown>
            <HDropdown.Trigger>{trigger}</HDropdown.Trigger>
            <HDropdown.Popover>
                <HDropdown.Menu>
                    {body}
                </HDropdown.Menu>
            </HDropdown.Popover>
        </HDropdown>
    )
}