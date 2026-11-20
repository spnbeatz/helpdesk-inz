"use client";

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Dropdown } from "@heroui/react";
import type { IconType } from "react-icons";

export type ActionConfig = {
    allowed: boolean;
    Icon: IconType;
    label: string;
};

export type ActionButtonType = "button" | "dropdown"

type ActionButtonProps = ActionConfig & {
    onClick: () => void;
    type?: ActionButtonType
};

export const ActionButton = ({
    allowed,
    Icon,
    label,
    onClick,
    type = "button"
}: ActionButtonProps) => {
    if (!allowed) return null;

    if(type === "dropdown") {
        return (
            <Dropdown.Item>
                <Icon />
                {label}
            </Dropdown.Item>
        )
    }

    return (
        <IconButton Icon={Icon} onClick={onClick} className={`text-xs`}>
            {label}
        </IconButton>
    );
};