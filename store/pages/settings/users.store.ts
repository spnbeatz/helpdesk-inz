import { create } from "zustand";
import { User } from "@/data/users";

export type TableConfigType = {
    visibleColumns: (keyof User)[];
};

export type SettingsUsersPageType = {
    tableConfig: TableConfigType;

    setVisibleColumns: (columns: (keyof User)[]) => void;
    toggleColumn: (column: keyof User) => void;
    resetTableConfig: () => void;
};

const defaultVisibleColumns: (keyof User)[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "location",
    "position",
    "createdAt",
    "lastLoginAt",
    "roleNames"
];

export const useSettingsUserPageStore = create<SettingsUsersPageType>(
    (set) => ({
        tableConfig: {
            visibleColumns: defaultVisibleColumns
        },

        setVisibleColumns: (columns) =>
            set((state) => ({
                tableConfig: {
                    ...state.tableConfig,
                    visibleColumns: columns
                }
            })),

        toggleColumn: (column) =>
            set((state) => {
                const isVisible =
                    state.tableConfig.visibleColumns.includes(column);

                return {
                    tableConfig: {
                        ...state.tableConfig,
                        visibleColumns: isVisible
                            ? state.tableConfig.visibleColumns.filter(
                                  (item) => item !== column
                              )
                            : [
                                  ...state.tableConfig.visibleColumns,
                                  column
                              ]
                    }
                };
            }),
        resetTableConfig: () =>
            set({
                tableConfig: {
                    visibleColumns: defaultVisibleColumns
                }
            })
    })
);