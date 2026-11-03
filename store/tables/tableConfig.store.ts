import { create } from "zustand";
import { createTableConfig } from "@/hooks/createTableConfig";
import { InventoryTableItemType } from "@/components/features/logistics/config/inventoryTableColumns";
import { inventoryDefaultColumns, usersDefaultColumns } from "./tableDefaults";
import { User } from "@/data/users";

export type TableConfigType<T extends string = string> = {
    visibleColumns: T[];
};

type TableConfigStore = {
    tables: Record<string, TableConfigType>;

    initializeTable: (
        tableId: string,
        defaultColumns: string[]
    ) => void;

    setVisibleColumns: (
        tableId: string,
        columns: string[]
    ) => void;

    addColumn: (
        tableId: string,
        column: string
    ) => void;

    removeColumn: (
        tableId: string,
        column: string
    ) => void;

    toggleColumn: (
        tableId: string,
        column: string
    ) => void;

    resetTable: (
        tableId: string,
        defaultColumns: string[]
    ) => void;
};

export const useTableConfigStore = create<TableConfigStore>((set) => ({
    tables: {},

    initializeTable: (tableId, defaultColumns) =>
        set(state => {
            if (state.tables[tableId]) return state;

            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: [...defaultColumns]
                    }
                }
            };
        }),

    setVisibleColumns: (tableId, columns) =>
        set(state => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    visibleColumns: [...columns]
                }
            }
        })),

    addColumn: (tableId, column) =>
        set(state => {
            const current = state.tables[tableId];

            if (!current || current.visibleColumns.includes(column)) {
                return state;
            }

            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: [...current.visibleColumns, column]
                    }
                }
            };
        }),

    removeColumn: (tableId, column) =>
        set(state => {
            const current = state.tables[tableId];

            if (!current || !current.visibleColumns.includes(column)) {
                return state;
            }

            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: current.visibleColumns.filter(
                            item => item !== column
                        )
                    }
                }
            };
        }),

    toggleColumn: (tableId, column) =>
        set(state => {
            const current = state.tables[tableId];

            if (!current) return state;

            const visible = current.visibleColumns.includes(column);

            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: visible
                            ? current.visibleColumns.filter(item => item !== column)
                            : [...current.visibleColumns, column]
                    }
                }
            };
        }),

    resetTable: (tableId, defaultColumns) =>
        set(state => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    visibleColumns: [...defaultColumns]
                }
            }
        }))
}));

export const useInventoryTableConfig =
    createTableConfig<InventoryTableItemType>(
        "inventory",
        inventoryDefaultColumns
    )

export const useUsersSettingsTableConfig =
    createTableConfig<User>(
        "users.settings",
        usersDefaultColumns
    )