import { Description, Label, ProgressBar } from "@heroui/react"

export const Progress = ({
    value,
    label
} : {
    value: number,
    label?: string
}) => {
    return (
        <ProgressBar value={value}>
            {label && <Description>{label}</Description>}
            <ProgressBar.Output />
            <ProgressBar.Track>
                <ProgressBar.Fill className="bg-indigo-400/60" />
            </ProgressBar.Track>
        </ProgressBar>
    )
}