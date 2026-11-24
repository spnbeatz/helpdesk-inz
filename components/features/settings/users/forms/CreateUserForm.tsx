import { useRoleList } from "../queries/query";
import { FilterOption } from "@/components/composed/filters/types";
import { mapLocationListToSelectOptions, mapRoleListToSelectOptions } from "../helpers/map";
import { useLocationList } from "@/components/features/locations/queries/query";
import { createUserFormConfig } from "../config/form.config";
import { Form } from "@/components/composed/form/Form";
import { addFormFieldOptions } from "@/components/composed/form/helpers";
import { UserCreateDataType } from "../types/form.types";

export const CreateUserForm = () => {

    const { data: roleList } = useRoleList();
    const { data: locationList } = useLocationList({ type: "warehouse" });

    const roleOptions: FilterOption[] = mapRoleListToSelectOptions(roleList);
    const locationOptions: FilterOption[] = mapLocationListToSelectOptions(locationList);

    const config = addFormFieldOptions(createUserFormConfig, {
        roleId: roleOptions,
        locationId: locationOptions
    });

    const onSubmit = (data: UserCreateDataType) => {
        console.log(data, "user create data");
    };

    return (
        <Form
            config={config}
            onSubmit={onSubmit}
        />
    )
}