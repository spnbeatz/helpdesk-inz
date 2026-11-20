import { Dropdown as HDropdown } from "@heroui/react";

type DropdownProps = {
    trigger: React.ReactNode,
    children: React.ReactNode
}

export const Dropdown = ({trigger, children} : DropdownProps) => {
    return (
        <HDropdown>
            <HDropdown.Trigger>{trigger}</HDropdown.Trigger>
            <HDropdown.Popover className={"rounded-lg"}>
                <HDropdown.Menu>
                    {children}
                </HDropdown.Menu>
            </HDropdown.Popover>
        </HDropdown>
    )
}