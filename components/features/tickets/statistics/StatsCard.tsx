import { Card, Label } from "@heroui/react"
import React from "react"
import { LuArrowUp } from "react-icons/lu"

export const StatsCard = ({additionalIcon, title, quantity, className} : {additionalIcon: React.ReactNode, title: string, quantity: number, className?: string}) => {
    return (
        <Card className={`flex flex-col items-center justify-center gap-4 rounded-lg bg-white/60 text-black/70 px-10 h-full aspect-square relative shrink-0 ${className}`}>
            <Label className="text-black/70">{title}</Label>
            <p className="text-2xl">{quantity}</p>
            <div className="absolute bottom-4 right-4">
                {additionalIcon}
            </div>
        </Card>
    )
}