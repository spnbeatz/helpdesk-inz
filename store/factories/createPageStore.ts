import { create, type StateCreator } from "zustand";

export type PageStoreBase<TFilters extends object> = {
    filters: TFilters;
    setFilters: (filters: Partial<TFilters>) => void;
    resetFilters: () => void;
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;
};

type PageStoreOptions<TFilters extends object> = {
    initialFilters: TFilters;
    itemsPerPage?: number;
};

export const createPageStore = <
    TFilters extends object,
    TExtra extends object = Record<never, never>
>(
    options: PageStoreOptions<TFilters>,
    createExtra?: StateCreator<
        PageStoreBase<TFilters> & TExtra,
        [],
        [],
        TExtra
    >
) => {
    type Store = PageStoreBase<TFilters> & TExtra;

    return create<Store>()((set, get, api) => ({
        filters: { ...options.initialFilters },

        setFilters: (newFilters) =>
            set((state) => ({
                filters: {
                    ...state.filters,
                    ...newFilters
                }
            } as Partial<Store>)),

        resetFilters: () =>
            set({
                filters: { ...options.initialFilters }
            } as Partial<Store>),

        itemsPerPage: options.itemsPerPage ?? 20,

        setItemsPerPage: (value) =>
            set({
                itemsPerPage: value
            } as Partial<Store>),

        ...(createExtra?.(set, get, api) ?? {} as TExtra)
    } as Store));
};