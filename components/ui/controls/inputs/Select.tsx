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
};

export const Select = ({
    label,
    options = [],
    isRequired = false,
    defaultValue,
    placeholder,
    onChange,
}: SelectProps) => {
    return (
        <HSelect
            isRequired={isRequired}
            value={defaultValue}
            placeholder={placeholder}
            className="w-full"
            onChange={(key: Key | null) => {
                onChange?.(key ? String(key) : null);
            }}
        >
            {label && <Label>{label}</Label>}

            <HSelect.Trigger className="rounded-lg bg-white/70">
                <HSelect.Value />
                <HSelect.Indicator />
            </HSelect.Trigger>

            <HSelect.Popover>
                <ListBox>
                    {options.map((opt) => (
                        <ListBox.Item
                            key={opt.id}
                            id={opt.id}
                            textValue={opt.textValue}
                            value={opt.id}
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