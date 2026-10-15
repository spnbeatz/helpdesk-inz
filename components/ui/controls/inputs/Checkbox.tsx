import { Checkbox as HCheckbox, CheckboxProps } from "@heroui/react"

export const Checkbox = ({children, ...props} : CheckboxProps & { children?: React.ReactNode}) => {
    return (
        <HCheckbox {...props}>
            <HCheckbox.Content className={"text-xs font-normal"}>
                <HCheckbox.Control className="bg-indigo-400/20 before:bg-indigo-400/80">
                    <HCheckbox.Indicator />
                </HCheckbox.Control>
                {children}
            </HCheckbox.Content>
        </HCheckbox>
    )
}