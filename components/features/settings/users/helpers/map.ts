import { FilterOption } from "@/components/composed/filters/types";
import { LocationType } from "@/data/locations";
import { RoleType } from "@/data/users";

export const mapRoleListToSelectOptions = (roleList?: RoleType[]): FilterOption[] => {
    return roleList?.map((role) => ({
        label: role.name,
        value: role.id
    })) || []
}

export const mapLocationListToSelectOptions = (locationList?: LocationType[]): FilterOption[] => {
    return locationList?.map((location) => ({
        label: location.city,
        value: location.id
    })) || []
}