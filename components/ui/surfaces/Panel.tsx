import { IconType } from "react-icons";
import { Column, Row } from "../layout/flex";
import { Label } from "@heroui/react";

type PanelProps = {
    Icon?: IconType,
    label?: string,
    children: React.ReactNode,
    className?: string
}

export const Panel = ({ Icon, label, children, className } : PanelProps) => {
    return (
        <Column Start className={`gap-4 p-6 bg-white/70 rounded-lg shadow-sm ${className}`}>
            {label && <Row CenterStart className="gap-2">
                {Icon && <Icon />}
                <Label className="text-lg">{label}</Label>
            </Row>}
            {children}
        </Column>
    )
}