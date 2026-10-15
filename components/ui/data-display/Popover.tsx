import { Popover as HPopover } from "@heroui/react";

type PopoverProps = { children: React.ReactNode, trigger: React.ReactNode, header?: string }

export const Popover = ({ children, trigger, header }: PopoverProps) => {
    return (
        <HPopover>
            {trigger}
            <HPopover.Content className={"rounded-lg min-w-[300px] bg-white/90"}>
                <HPopover.Dialog className="flex flex-col items-start justify-center gap-2">
                    <HPopover.Heading>
                        <p className="text-sm text-black/70">{header}</p>
                    </HPopover.Heading>
                    {children}
                </HPopover.Dialog>
            </HPopover.Content>
        </HPopover>
    )
}