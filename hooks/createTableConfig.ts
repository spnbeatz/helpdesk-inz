import { useTableConfigStore } from "@/store/tables/tableConfig.store";
import { useEffect } from "react";

export const createTableConfig = <T extends object>(
    tableId: string,
    defaultColumns: (keyof T)[]
) => {
    return function useTableConfig() {
        const config = useTableConfigStore(
            state => state.tables[tableId]
        );

        const initializeTable = useTableConfigStore(
            state => state.initializeTable
        );

        const setVisible = useTableConfigStore(
            state => state.setVisibleColumns
        );

        const add = useTableConfigStore(
            state => state.addColumn
        );

        const remove = useTableConfigStore(
            state => state.removeColumn
        );

        const toggle = useTableConfigStore(
            state => state.toggleColumn
        );

        const reset = useTableConfigStore(
            state => state.resetTable
        );

        useEffect(() => {
            initializeTable(tableId, defaultColumns.map(String));
        }, [initializeTable]);

        const visibleColumns =
            (config?.visibleColumns ?? defaultColumns) as (keyof T)[];

        return {
            visibleColumns,

            setVisibleColumns: (columns: (keyof T)[]) =>
                setVisible(tableId, columns.map(String)),

            addColumn: (column: keyof T) =>
                add(tableId, String(column)),

            removeColumn: (column: keyof T) =>
                remove(tableId, String(column)),

            toggleColumn: (column: keyof T) =>
                toggle(tableId, String(column)),

            resetTableConfig: () =>
                reset(tableId, defaultColumns.map(String))
        };
    };
};