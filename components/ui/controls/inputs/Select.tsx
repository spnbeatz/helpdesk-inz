import {
    Select as HSelect,
    Key,
    Label,
    ListBox,
} from "@heroui/react";

export type SelectOptionsType = {
    id: string;
    textValue: string;
};

type SelectProps = {
    label?: string;
    options?: SelectOptionsType[];
    isRequired?: boolean;
    defaultValue?: string;
    placeholder?: string;
    onChange?: (value: string | null) => void;
    className?: string
};

export const Select = ({
    label,
    options = [],
    isRequired = false,
    defaultValue,
    placeholder,
    onChange,
    className
}: SelectProps) => {
    return (
        <HSelect
        
            aria-label="select"
            isRequired={isRequired}
            value={defaultValue}
            placeholder={placeholder}
            className={`${className}`}
            onChange={(key: Key | null) => {
                onChange?.(key ? String(key) : null);
            }}
        >
            {label && <Label>{label}</Label>}

            <HSelect.Trigger className="rounded-lg bg-white/70 text-xs">
                <HSelect.Value className={"text-xs text-black/60"}/>
                <HSelect.Indicator className="w-[14px] h-[14px]"/>
            </HSelect.Trigger>

            <HSelect.Popover className={"rounded-lg"}>
                <ListBox className="w-auto">
                    {options.map((opt) => (
                        <ListBox.Item
                            key={opt.id}
                            id={opt.id}
                            textValue={opt.textValue}
                            value={opt.id}
                            className="text-xs text-black/70 rounded-md"
                        >
                            {opt.textValue}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </HSelect.Popover>
        </HSelect>
    );
};