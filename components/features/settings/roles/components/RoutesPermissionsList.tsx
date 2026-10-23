import { Column, Row } from "@/components/ui/layout/flex"
import { Label } from "@heroui/react"
import { appRoutes } from "@/config/appRoutes";
import { RoutePermissionItem } from "./RoutePermissionItem";

export const RoutesPermissionsList = ({ roleId }: { roleId: string }) => {
    return (
        <Column Start className="w-full gap-2">
            <Row CenterBetween className="w-full gap-4 mb-2 ">
                <Label className="w-full text-black/60">Name</Label>
                <Label className="w-full text-black/60">Path</Label>
                <Label className="w-full text-black/60">Status</Label>
                <Label className="w-[70px] shrink-0 text-black/60">Action</Label>
            </Row>
            {appRoutes.map((route) => (
                <RoutePermissionItem key={"routepermission" + route.key} roleId={roleId} route={route} />
            ))}
        </Column>
    )
}