"use client";

import { FilterControl } from "./FilterControl";

import {
    Button,
    Label,
    Popover,
} from "@heroui/react";

import { Select } from "@/components/ui/controls/inputs/Select";

import {
    LuArrowDownWideNarrow,
    LuArrowUpNarrowWide,
    LuFilter,
    LuRotateCcw
} from "react-icons/lu";

import { FilterPopoverProps } from "./types";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Grid } from "@/components/ui/layout/Grid";
import { BaseFiltersType } from "@/types/filters.types";
import { useEffect } from "react";

export function FilterPopover<
    TSortKey extends string,
    TFilters extends BaseFiltersType<TSortKey>
>({
    config,
    filters,
    setFilters,
    onClear,
    children
}: FilterPopoverProps<TFilters, TSortKey>) {

    const updateFilter = (
        key: keyof TFilters,
        value: unknown
    ) => {
        const updates = {
            [key]: value,
            page: 1
        } as unknown as Partial<TFilters>;

        setFilters(updates);
    };

    useEffect(() => console.log("check"), [filters])

    const activeFiltersCount = config.filters.reduce((count, filter) => {
        if (filter.type === "date-range") {
            return count +
                (filters[filter.fromKey] ? 1 : 0) +
                (filters[filter.toKey] ? 1 : 0);
        }

        const value = filters[filter.key];

        if (filter.type === "checkbox") {
            return count + (value === true ? 1 : 0);
        }

        if (Array.isArray(value)) {
            return count + (value.length > 0 ? 1 : 0);
        }

        return count +
            (value !== undefined && value !== null && value !== "" ? 1 : 0);
    }, 0);

    return (
        <Popover>
            <IconButton
                Icon={LuFilter}
                className="bg-white/40"
            >
                Filters

                {activeFiltersCount > 0 && (
                    <span>{activeFiltersCount}</span>
                )}
            </IconButton>

            <Popover.Content
                placement="bottom end"
                className="rounded-lg"
            >
                <Popover.Dialog className="w-[340px] max-h-[75vh] overflow-y-auto p-4 rounded-lg">

                    {/* Nagłówek */}
                    <div className="flex items-center justify-between mb-4">
                        <Popover.Heading>
                            Filters and sorting
                        </Popover.Heading>

                        <Button
                            size="sm"
                            variant="ghost"
                            onPress={onClear}
                        >
                            <LuRotateCcw size={15} />
                            Clear
                        </Button>
                    </div>

                    {/* Sortowanie */}
                    <section className="mb-5">
                        <h4 className="mb-2 font-medium">
                            Sorting
                        </h4>

                        <Select
                            defaultValue={
                                filters.sortBy
                                    ? String(filters.sortBy)
                                    : null
                            }
                            options={config.sortOptions}
                            mode="single"
                            onChange={(selected) => {
                                if (typeof selected !== "string") return;

                                const option = config.sortOptions.find(
                                    item => String(item.value) === selected
                                );

                                if (option) {
                                    updateFilter("sortBy", option.value);
                                }
                            }}
                        />

                        <Grid cols={2} gap={2} className="w-full mt-2">
                            <Button
                                className={`w-full rounded-lg
                                    ${filters.sortDir === "asc"
                                        ? "bg-indigo-400/60"
                                        : ""}`

                                }
                                variant="outline"
                                onPress={() => updateFilter("sortDir", "asc")}
                            >
                                <LuArrowUpNarrowWide size={16} />
                                Ascending
                            </Button>

                            <Button
                                className={`w-full rounded-lg
                                    ${filters.sortDir === "desc"
                                        ? "bg-indigo-400/60"
                                        : ""}`

                                }
                                variant="outline"
                                onPress={() => updateFilter("sortDir", "desc")}
                            >
                                <LuArrowDownWideNarrow size={16} />
                                Descending
                            </Button>
                        </Grid>
                    </section>

                    {/* Filtry */}
                    {config.filters.length > 0 && (
                        <section className="space-y-3">
                            <h4 className="font-medium">
                                Filters
                            </h4>

                            {config.filters.map((filter, index) => (
                                <div
                                    key={`${filter.type}-${index}`}
                                    className="space-y-1"
                                >
                                    {filter.type !== "checkbox" && (
                                        <Label>
                                            {filter.label}
                                        </Label>
                                    )}

                                    <FilterControl
                                        filter={filter}
                                        value={filters}
                                        onChange={updateFilter}
                                    />
                                </div>
                            ))}
                        </section>
                    )}
                    {children}
                    {/* Zamknięcie */}
                    <div className="flex justify-end mt-5">
                        <Button
                            className={"w-full rounded-lg bg-indigo-400/60"}
                            slot="close"
                            variant="primary"
                        >
                            Close
                        </Button>
                    </div>

                </Popover.Dialog>
            </Popover.Content>
        </Popover>
    );
}
