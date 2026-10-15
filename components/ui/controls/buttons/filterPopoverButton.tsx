import { Popover } from "../../data-display/Popover"
import { IconButton } from "./iconButton"
import { LuFilter } from "react-icons/lu"

export const FilterPopoverButton = ({
    children,
    header = "List filters"
}: {
    children: React.ReactNode,
    header?: string
}) => {
    return (
        <Popover 
            trigger={<IconButton Icon={LuFilter} />}
            header={header}
        > 
            {children}
        </Popover>
    )
}