"use client";

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import type { IconType } from "react-icons";

export type ActionConfig = {
    allowed: boolean;
    Icon: IconType;
    label: string;
};

type ActionButtonProps = ActionConfig & {
    onClick: () => void;
};

export const ActionButton = ({
    allowed,
    Icon,
    label,
    onClick
}: ActionButtonProps) => {
    if (!allowed) return null;

    return (
        <IconButton Icon={Icon} onClick={onClick}>
            {label}
        </IconButton>
    );
};