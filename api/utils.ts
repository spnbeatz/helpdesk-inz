import { PaginationFiltersType } from "@/types/filters.types";
import { PaginatedResponse } from "./types";

export function createPaginatedData<T>(
    results: T[],
    filters: PaginationFiltersType = {}
): PaginatedResponse<T> {
    const page = filters.page ?? 1;
    const itemsPerPage = filters.itemsPerPage ?? 20;

    const startIndex = (page - 1) * itemsPerPage;

    return {
        items: results.slice(startIndex, startIndex + itemsPerPage),
        totalItems: results.length,
        page,
        itemsPerPage
    };
}

type SortDirection = "asc" | "desc";

export function sortResults<T>(
    results: T[],
    sortBy?: keyof T,
    sortDir: SortDirection = "asc"
): T[] {
    if (!sortBy) return results;

    return [...results].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        const comparison = String(aValue).localeCompare(
            String(bValue),
            undefined,
            {
                numeric: true,
                sensitivity: "base"
            }
        );

        return sortDir === "desc" ? -comparison : comparison;
    });
}

export function searchResults<T>(
    results: T[],
    searchValue?: string,
    searchFields: (keyof T)[] = []
): T[] {
    const search = searchValue?.trim().toLowerCase();

    if (!search || searchFields.length === 0) return results;

    return results.filter(item => {
        const searchableText = searchFields
            .map(field => item[field])
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(search);
    });
}