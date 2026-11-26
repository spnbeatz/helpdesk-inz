import { Row } from "@/components/ui/layout/flex"
import { Notifications } from "../../features/notifications/components/Notifications"
import { UserPanel } from "./User"
import { Button } from "@heroui/react"

export const UpperNavigation = () => {
    return (
        <Row
            EndCenter
            className="gap-2 mt-auto z-20"
        >
            <Notifications />
            <UserPanel />
        </Row>
    )
}