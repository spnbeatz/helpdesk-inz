import { SettingsPopover, TableColumnOption } from "./SettingsPopover";
import type { ComponentProps } from "react";

type SettingsPopoverProps = ComponentProps<typeof SettingsPopover>;

type PageStore = {
    filters: {
        itemsPerPage?: number;
    };
    setFilters: (filters: { itemsPerPage: number}) => void;
};

type TableConfig<TColumn extends string> = {
    visibleColumns: TColumn[];
    toggleColumn: (column: TColumn) => void;
    resetTableConfig: () => void;
    layoutType?: SettingsPopoverProps["layoutType"];
};

export function createSettingsPopover<
    TStore extends PageStore,
    TColumn extends string
>(
    usePageStore: () => TStore,
    useTableConfig?: () => TableConfig<TColumn>,
    columns?: TableColumnOption<TColumn>[]
) {
    return function PageSettingsPopover() {
        const { filters, setFilters } = usePageStore();
        const tableConfig = useTableConfig?.();

        return (
            <SettingsPopover
                columns={columns}
                visibleColumns={tableConfig?.visibleColumns}
                onToggleColumn={tableConfig?.toggleColumn}
                onReset={tableConfig?.resetTableConfig}
                layoutType={tableConfig?.layoutType}
                itemsPerPage={filters.itemsPerPage}
                changeItemsPerPage={(count) =>
                    setFilters({ itemsPerPage: count })
                }
            />
        );
    };
}