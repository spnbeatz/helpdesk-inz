import { locations, LocationType } from "@/data/locations";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { ILocationsService } from "../interfaces/services/locations.interface";
import { LocationsFiltersType } from "@/components/features/locations/types/filters.types";

export class LocationsService implements ILocationsService {
    private endpoind: string = "/locations"

    constructor(
        private readonly api: IApiClient
    ) { }

    async getLocationList(filters: LocationsFiltersType): Promise<LocationType[]> {
        let result = [...locations];

        if (filters.type) {
            result = result.filter(
                location => location.type === filters.type
            );
        }

        if (filters.parentId !== undefined) {
            result = result.filter(
                location => location.parent_id === filters.parentId
            );
        }

        return result;
    }
}