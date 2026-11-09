import { Label, Description } from "@heroui/react"
import { Column } from "../layout/flex"

export const Title = ({
    title, 
    description,
    variant = "site"
} : {
    title?: string, 
    description?: string,
    variant?: "site" | "section"
}) => {
    return (
        <Column StartCenter className="gap-2">
            <Label className={`${variant === "site" ? "text-4xl" : "text-xl text-black/80"}`}>
                {title}
            </Label>
            <Description>
                {description}
            </Description>
        </Column>
    )
}