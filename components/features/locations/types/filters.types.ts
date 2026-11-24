import { LocationCategoryType } from "@/data/locations"

export type LocationsFiltersType = {
    type?: LocationCategoryType,
    parentId?: string | null
}