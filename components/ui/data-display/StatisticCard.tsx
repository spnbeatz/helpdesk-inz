import { Panel } from "../surfaces/Panel"
import { Row, Column } from "../layout/flex"
import { Label, Description } from "@heroui/react"

type StatisticCardProps = {
    title?: string,
    value?: string,
    description?: string,
    rightContent?: React.ReactNode,
    onClick?: () => void
}

export const StatisticCard = ({ title, value, description, rightContent, onClick }: StatisticCardProps) => {
    return (
        <Panel className={`
                flex-1 transition-transform duration-200
                ${onClick ? "cursor-pointer hover:scale-[1.02]" : ""}
            `}>
            <Row StartBetween className={`w-full`} onClick={onClick}>
                <Column Start className="gap-2">
                    <Description>{title}</Description>
                    <Label className="text-3xl">{value}</Label>
                    <Description className="text-red-500">{description}</Description>
                </Column>
                {rightContent}
            </Row>

        </Panel>
    )
}