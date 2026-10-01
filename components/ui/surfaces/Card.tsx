import { Card as HCard } from "@heroui/react"

export const Card = ({
    children,
    className,
    id
}:{
    children: React.ReactNode,
    className?: string,
    id?: string
}) => {
    return (
        <HCard className={`bg-white/60 rounded-lg shadow-sm p-8 ${className}`} id={id}>
            {children}
        </HCard>
    )
}