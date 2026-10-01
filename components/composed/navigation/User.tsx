"use client";

import { Avatar, Card, Description, Label, Button } from "@heroui/react";
import { useAuth } from "@/providers/auth.provider";
import { LuLogOut } from "react-icons/lu";
import { Column, Row } from "@/components/ui/layout/flex";

export const UserPanel = () => {
    const { user } = useAuth();
    return (
        <Card className="mt-auto w-full flex flex-col items-center justify-between bg-white/30 rounded-lg p-2">
            <Row CenterStart className="gap-2 w-full">
                <Avatar className="rounded-lg">
                    <Avatar.Image src={user?.avatar} />
                </Avatar>
                <Column StartCenter>
                    <Label className="text-xs">{user?.email}</Label>
                    <Description>{user?.role[0]}</Description>
                </Column>

            </Row>

            <Button variant="tertiary" className={"rounded-lg w-full text-xs"}><LuLogOut /> Logout </Button>
        </Card>
    )
}