"use client";

import { Avatar, Card, Description, Label, Button } from "@heroui/react";
import { useAuth } from "@/providers/auth.provider";
import { LuChevronDown, LuLogOut } from "react-icons/lu";
import { Column, Row } from "@/components/ui/layout/flex";
import { Dropdown } from "@/components/ui/data-display/Dropdown";

export const UserPanel = () => {

    return (
        <div className="w-10 h-10 mt-auto ml-auto">
            <Dropdown trigger={(
                <UserPanelTrigger />
            )}>
                <Column Start>
                    options
                </Column>
            </Dropdown>
        </div>

    )
}

export const UserPanelTrigger = () => {

    const { user } = useAuth();

    if (!user) return null;

    return (
        <Avatar className={`rounded-lg w-10 h-10 shadow-sm`}>
            <Avatar.Image src={user.avatarUrl || ""} />
        </Avatar>
    )
}