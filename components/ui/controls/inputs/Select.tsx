import { FilterOption } from "@/components/composed/filters/types";
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
    options?: FilterOption[];
    isRequired?: boolean;
    defaultValue?: string | string[] | null;
    placeholder?: string;
    onChange?: (value: string | string[] | null) => void;
    className?: string,
    mode?: "single" | "multiple"
};

export const Select = ({
    label,
    options = [],
    isRequired = false,
    defaultValue,
    placeholder,
    onChange,
    className,
    mode = "single"
}: SelectProps) => {
    return (
        <HSelect

            aria-label="select"
            isRequired={isRequired}
            value={defaultValue}
            placeholder={placeholder}
            className={`${className}`}
            selectionMode={mode}
            onChange={(key: Key | Key[] | null) => {
                onChange?.(
                    key
                        ? Array.isArray(key)
                            ? key.map(String)
                            : String(key)
                        : null
                );
            }}
        >
            {label && <Label>{label}</Label>}

            <HSelect.Trigger className="rounded-lg bg-white/70 text-xs">
                <HSelect.Value className={"text-xs text-black/60"} />
                <HSelect.Indicator className="w-[14px] h-[14px]" />
            </HSelect.Trigger>

            <HSelect.Popover className={"rounded-lg"}>
                <ListBox className="w-auto">
                    {options.map((opt) => (
                        <ListBox.Item
                            key={opt.value}
                            id={opt.value}
                            textValue={opt.label}
                            value={opt.value}
                            className="text-xs text-black/70 rounded-md"
                        >
                            {opt.label}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </HSelect.Popover>
        </HSelect>
    );
};