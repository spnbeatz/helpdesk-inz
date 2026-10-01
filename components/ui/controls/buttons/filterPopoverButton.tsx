import { Popover } from "@heroui/react"
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
        <Popover>
            <IconButton Icon={LuFilter} />
            <Popover.Content className={"rounded-lg min-w-[300px] bg-white/90"}>
                <Popover.Dialog className="flex flex-col items-start justify-center gap-2">
                    <Popover.Heading className="text-lg text-black/70">
                        {header}
                    </Popover.Heading>
                    {children}
                </Popover.Dialog>
            </Popover.Content>
        </Popover>
    )
}