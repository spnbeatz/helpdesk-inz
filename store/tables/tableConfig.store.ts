"use client"

import { ListLayoutType } from "@/components/composed/switch/ListLayoutSwitch";
import { create } from "zustand";

export type TableConfigType<T extends string = string> = {
    visibleColumns: T[];
    layoutType: ListLayoutType
};

type TableConfigStore = {
    tables: Record<string, TableConfigType>;
    initializeTable: (
        tableId: string,
        defaultColumns: string[],
        defaultType: ListLayoutType
    ) => void;

    setVisibleColumns: (
        tableId: string,
        columns: string[],
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

    changeType: (
        tableId: string,
        type: ListLayoutType,
    ) => void,

    getType: (tableId: string) => ListLayoutType;
};

export const useTableConfigStore = create<TableConfigStore>((set, get) => ({
    tables: {},

    initializeTable: (tableId, defaultColumns, defaultType) =>
        set(state => {
            if (state.tables[tableId]) return state;

            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: [...defaultColumns],
                        layoutType: defaultType
                    }
                }
            };
        }),

    setVisibleColumns: (tableId, columns) =>
        set(state => {
            const current = state.tables[tableId]
            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: [...columns],
                        layoutType: current.layoutType
                    }
                }
            }
        }),
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
                        visibleColumns: [...current.visibleColumns, column],
                        layoutType: current.layoutType
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
                        ),
                        layoutType: current.layoutType
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
                            : [...current.visibleColumns, column],
                        layoutType: current.layoutType
                    }
                }
            };
        }),

    resetTable: (tableId, defaultColumns) =>
        set(state => {
            const current = state.tables[tableId]
            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: [...defaultColumns],
                        layoutType: current.layoutType
                    }
                }
            }
        }),
    changeType: (tableId, type) =>
        set(state => {
            const current = state.tables[tableId];

            return {
                tables: {
                    ...state.tables,
                    [tableId]: {
                        visibleColumns: current.visibleColumns,
                        layoutType: type
                    }
                }
            };
        }),

    getType: (tableId: string) => {
        return get().tables[tableId]?.layoutType ?? "list";
    }
}));
