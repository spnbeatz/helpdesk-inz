"use client"

import { useAuth } from "@/providers/auth.provider";
import { useEffect, useRef, useState } from "react";
import { MultipleTypeNavItem } from "./navItem";
import { ExampleLogo } from "../other/ExampleLogo";
import { navigationRoutes, NavigationRoutesType } from "@/config/navigation";
import { Accordion, Button } from "@heroui/react";
import { background } from "@/styles";
import { usePathname } from "next/navigation";
import { UserPanel } from "./user";
import { LuBell } from "react-icons/lu";
import { Notifications } from "./notifications";

export const Navigation = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { user } = useAuth();
    const pathname = usePathname();

    const defaultExpandedKey = () => {
        const pathnameKey = pathname.split("/")[1];
        return [pathnameKey];
    }


    if (!user) return null;

    return (
        <div className="h-screen relative p-2 bg-transparent">
            {/* <DecorCard element={containerRef} rotation={3}/> */}
            <div
                ref={containerRef}
                className={`h-full min-w-[250px] rounded-xl bg-mauve-200/80 z-10 flex flex-col items-start justify-start gap-6 p-4 overflow-hidden`}
                style={{
                    boxShadow: "0px 2px 10px -4px gray"
                }}
            >
                <div className="flex flex-row items-center justify-between gap-2 w-full">
                    <ExampleLogo />
                    <Notifications />
                </div>
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

