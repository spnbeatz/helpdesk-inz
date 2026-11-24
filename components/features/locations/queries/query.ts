import { useQuery } from "@tanstack/react-query";
import { LocationsFiltersType } from "../types/filters.types";
import { locationsService } from "@/api";

export const useLocationList = (filters: LocationsFiltersType) => {
    return useQuery({
        queryKey: ["locations", filters],
        queryFn: () => locationsService.getLocationList(filters)
    })
}