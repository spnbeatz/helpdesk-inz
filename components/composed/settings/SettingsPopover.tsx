
import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Popover } from "@/components/ui/data-display/Popover";
import { Grid } from "@/components/ui/layout/Grid";
import { Section } from "@/components/ui/surfaces/Section";
import { Checkbox } from "@/components/ui/controls/inputs/Checkbox";
import { LuSettings, LuRotateCcw } from "react-icons/lu";
import { Button, Label } from "@heroui/react";
import { Column, Row } from "@/components/ui/layout/flex";
import { ListLayoutType } from "../switch/ListLayoutSwitch";

export type TableColumnOption<TKey extends string> = {
    id: TKey;
    name: string;
};

type TableSettingsProps<TKey extends string> = {
    columns?: TableColumnOption<TKey>[];
    visibleColumns?: TKey[];
    onToggleColumn?: (column: TKey) => void;
    onReset?: () => void;
    layoutType?: ListLayoutType
}

type ListSettingsProps = {
    itemsPerPage?: number,
    changeItemsPerPage?: (count: number) => void
}

type SettingsPopoverProps<TKey extends string> =
    TableSettingsProps<TKey> &
    ListSettingsProps

export function SettingsPopover<TKey extends string>({
    columns,
    visibleColumns,
    onToggleColumn,
    onReset,
    layoutType,
    itemsPerPage,
    changeItemsPerPage
}: SettingsPopoverProps<TKey>) {
    return (
        <Popover
            trigger={
                <IconButton
                    className="bg-white/40"
                    Icon={LuSettings}
                >
                    Settings
                </IconButton>
            }
        >
            <Section title="Settings">
                <ListItemsCountPerPageSwitch
                    itemsPerPage={itemsPerPage}
                    changeItemsPerPage={changeItemsPerPage}
                />
                <TableColumnsSettings
                    columns={columns}
                    visibleColumns={visibleColumns}
                    onToggleColumn={onToggleColumn}
                    onReset={onReset}
                    layoutType={layoutType}
                />
            </Section>
            <div className="flex justify-end mt-5 w-full">
                <Button
                    className={"w-full rounded-lg bg-indigo-400/60"}
                    slot="close"
                    variant="primary"
                >
                    Close
                </Button>
            </div>
        </Popover>
    );
}

export const ListItemsCountPerPageSwitch = (
    { itemsPerPage, changeItemsPerPage }: ListSettingsProps
) => {

    const options: number[] = [
        15, 25, 50, 100
    ];

    if (!itemsPerPage || !changeItemsPerPage) return null;
    return (
        <Column Start className="w-full gap-2">
            <Label>Items per page</Label>
            <Grid cols={4} gap={2}>
                {options.map((option) => (
                    <Button
                        onClick={() => changeItemsPerPage(option)}
                        variant="outline"
                        className={`w-full rounded-lg font-normal text-xs
                        ${option === itemsPerPage ? "bg-indigo-400/60 text-white font-semibold" : "bg-white"}
                        `}
                    >
                        {option}
                    </Button>
                ))}
            </Grid>
        </Column>

    )
}

export const TableColumnsSettings = <TKey extends string>({
    onReset, columns, visibleColumns, onToggleColumn, layoutType
}: TableSettingsProps<TKey>) => {

    if (
        !columns ||
        !onReset ||
        !visibleColumns ||
        !onToggleColumn ||
        layoutType === "grid"
    ) {
        return null;
    }

    return (
        <Column Start className="w-full gap-2 mt-2">
            <Row CenterBetween className="w-full">
                <Label>Visible columns</Label>
                {onReset && <Button
                    onClick={onReset}
                    variant="ghost"
                    className="shadow-none p-1 rounded-lg"
                >
                    <LuRotateCcw />
                    Reset
                </Button>}
            </Row>

            <Grid cols={2} gap={3}>
                {columns.map(column => (
                    <Checkbox
                        className={"bg-white/60 p-3 rounded-lg shadow-sm"}
                        key={column.id}
                        isSelected={visibleColumns.includes(column.id)}
                        onChange={() => onToggleColumn(column.id)}
                    >
                        {column.name}
                    </Checkbox>
                ))}
            </Grid>
        </Column>
    )
}
