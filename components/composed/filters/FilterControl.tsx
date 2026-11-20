"use client";

import {
    Checkbox,
    Input,
    Label,
} from "@heroui/react";

import { Select } from "@/components/ui/controls/inputs/Select";


import {
    FilterDefinition,
} from "./types";

export const FilterControl = <T,>({
    filter,
    value,
    onChange,
}: {
    filter: FilterDefinition<T>;
    value: Partial<Record<keyof T, unknown>>;
    onChange: (key: keyof T, value: unknown) => void;
}) => {
    switch (filter.type) {
        case "select": {
            const selectedValue = value[filter.key] as string | undefined;

            return (
                <Select
                    options={filter.options || []}
                    defaultValue={selectedValue}
                    mode="multiple"
                    onChange={(selected) =>
                        onChange(filter.key, selected)
                    }
                />
            )
        }

        case "multi-select": {
            const selectedValues =
                (value[filter.key] as string[] | undefined) ?? [];

            return (
                <Select
                    options={filter.options || []}
                    defaultValue={selectedValues}
                    mode="multiple"
                    onChange={(selected) => {
                        console.log(selected, "selected")
                        onChange(
                            filter.key,
                            Array.isArray(selected) ? selected : []
                        )
                    }

                    }
                />
            );
        }

        case "checkbox": {
            const checked = Boolean(value[filter.key]);

            return (
                <Checkbox
                    isSelected={checked}
                    onChange={(selected) =>
                        onChange(filter.key, selected)
                    }
                >
                    <Checkbox.Content>
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        {filter.label}
                    </Checkbox.Content>
                </Checkbox>
            );
        }

        case "text": {
            const textValue =
                (value[filter.key] as string | undefined) ?? "";

            return (
                <Input
                    className="w-full"
                    placeholder="Wpisz wartość..."
                    value={textValue}
                    onChange={(event) =>
                        onChange(filter.key, event.target.value)
                    }
                />
            );
        }

        case "date-range": {
            const from = value[filter.fromKey] as string | undefined;
            const to = value[filter.toKey] as string | undefined;

            return (
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-default-500">
                            From
                        </Label>
                        <Input
                            className={"rounded-lg"}
                            type="date"
                            value={from ?? ""}
                            onChange={(event) =>
                                onChange(filter.fromKey, event.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-default-500">
                            To
                        </Label>
                        <Input
                            className={"rounded-lg"}
                            type="date"
                            value={to ?? ""}
                            onChange={(event) =>
                                onChange(filter.toKey, event.target.value)
                            }
                        />
                    </div>
                </div>
            );
        }

        default:
            return null;
    }
};