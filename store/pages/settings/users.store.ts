import { create } from "zustand";

export type SettingsUsersPageType = {
    filters: ""
};


export const useSettingsUserPageStore = create<SettingsUsersPageType>(
    (set) => ({
        filters: ""
    })
);