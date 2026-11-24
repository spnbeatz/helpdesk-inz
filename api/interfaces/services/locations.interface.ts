import { LocationsFiltersType } from "@/components/features/locations/types/filters.types";
import { LocationType } from "@/data/locations";

export interface ILocationsService {
    getLocationList(filters: LocationsFiltersType): Promise<LocationType[]>
}