import { Select as HSelect, Key, Label, ListBox } from "@heroui/react"

export type SelectOptionsType = {
    id: string,
    textValue: string
}

export const Select = ({
    label,
    options = [],
    isRequired = false,
    defaultValue,
    placeholder,
    name,
    onChange
}:{
    label?: string,
    options?: SelectOptionsType[]
    isRequired?: boolean,
    defaultValue?: string,
    placeholder?: string,
    name: string,
    onChange?: (value: string, key: string) => void
}) => {
    return (
        <HSelect 
            isRequired={isRequired} 
            value={defaultValue} 
            placeholder={placeholder} 
            className={"w-full"}
            onChange={(v: Key | null) => onChange?.(v as string, name)}
        >
            { label && <Label>{label}</Label> }
            <HSelect.Trigger className={"rounded-lg bg-white/70"}>
                <HSelect.Value/>
                <HSelect.Indicator />
            </HSelect.Trigger>
            <HSelect.Popover>
                <ListBox>
                    {options.map((opt) => {
                        return (
                            <ListBox.Item id={opt.id} textValue={opt.textValue}>
                                {opt.textValue}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        )
                    })}
                </ListBox>
            </HSelect.Popover>
        </HSelect>
    )
}