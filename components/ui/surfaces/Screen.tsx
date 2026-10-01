import { Card, ScrollShadow } from "@heroui/react"

export const Screen = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full py-2 pr-2">
            <Card className="rounded-lg h-full bg-white/90">
                <div className="w-full h-full p-4">
                    {children}
                </div>

            </Card>
        </div>

    )
}