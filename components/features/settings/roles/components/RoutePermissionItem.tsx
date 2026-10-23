import { roleBlockedRoutesList } from "@/data/users";
import { AppRouteType } from "@/config/appRoutes";
import { Description, Button } from "@heroui/react";
import { Row } from "@/components/ui/layout/flex";

export const RoutePermissionItem = ({ roleId, route }: { roleId: string, route: AppRouteType }) => {
    const blocked = roleBlockedRoutesList.some(
        (item) =>
            item.roleId === roleId &&
            item.routeKey === route.key
    );

    return (
        <Row CenterBetween className="w-full gap-4">
            <Description className="whitespace-nowrap w-full font-semibold">{route.name}</Description>
            <Description className="w-full">{route.path}</Description>
            <Description className={`w-full ${blocked ? "text-red-500" : "text-green-500"}`}>{blocked ? "Blocked" : "Available"}</Description>
            <Button className={`w-[70px] h-7 shrink-0 text-black/60 font-normal text-xs rounded-lg ${blocked ? "bg-green-200" : "bg-red-200"}`}>{blocked ? "Unblock" : "Block"}</Button>
        </Row>
    )
}