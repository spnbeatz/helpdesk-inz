import { Dropdown, Button, Label, Popover } from "@heroui/react";
import { LuBell } from "react-icons/lu";

export const Notifications = () => {
    return (
        <Popover>
            <Button variant="tertiary"><LuBell/></Button>
            <Popover.Content className={"min-w-[300px] rounded-lg bg-white-80"} placement="right">
                <Popover.Dialog>
                    <Popover.Arrow />
                    <Popover.Heading className="flex flex-row items-center gap-2">
                        <LuBell/> Notifications
                    </Popover.Heading>
                    <p className="w-full text-center p-4 text-muted">No notifications yet</p>
                </Popover.Dialog>
            </Popover.Content>
        </Popover>
    )
}