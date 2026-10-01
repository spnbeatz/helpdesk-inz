"use client"

import { useAuth } from "@/providers/auth.provider";
import { MultipleTypeNavItem } from "./NavItem";
import { ExampleLogo } from "../../misc/ExampleLogo";
import { navigationRoutes } from "@/config/navigation";
import { Accordion} from "@heroui/react";
import { usePathname } from "next/navigation";
import { UserPanel } from "./User";
import { Notifications } from "./Notifications";
import { Row } from "@/components/ui/layout/flex";

export const Navigation = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    const defaultExpandedKey = () => {
        const pathnameKey = pathname.split("/")[1];
        return [pathnameKey];
    }


    if (!user) return null;

    return (
        <div className="h-screen relative p-2 bg-transparent">
            <div
                className={`h-full min-w-[250px] rounded-xl bg-mauve-200/80 z-10 flex flex-col items-start justify-start gap-6 p-4 overflow-hidden`}
                style={{
                    boxShadow: "0px 2px 10px -4px gray"
                }}
            >
                <Row CenterBetween className="flex flex-row items-center justify-between gap-2 w-full">
                    <ExampleLogo />
                    <Notifications />
                </Row>

                <Accordion hideSeparator className="w-full flex flex-col items-center justify-center gap-2" defaultExpandedKeys={defaultExpandedKey()}>
                    {navigationRoutes.map(item => {
                        return <MultipleTypeNavItem item={item} key={item.name}/>
                    })}
                </Accordion>
                <UserPanel />
            </div>
        </div>
    )
}

