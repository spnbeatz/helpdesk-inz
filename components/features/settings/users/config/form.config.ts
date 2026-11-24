import { FormConfig } from "../../../../composed/form/types";
import { UserActivationDataType, UserCreateDataType } from "../types/form.types";

export const createUserFormConfig: FormConfig<UserCreateDataType> = {
    title: "Create new user",
    description: "New user will be created in the helpdesk system",
    submitButtonText: "Create user",
    fields: [
        {
            type: "input",
            label: "First name",
            name: "firstName",
            isRequired: true
        },
        {
            type: "input",
            label: "Last name",
            name: "lastName",
            isRequired: true
        },
        {
            type: "input",
            label: "Email",
            name: "email",
            isRequired: true,
            inputType: "email"
        },
        {
            type: "select",
            label: "Select location",
            name: "locationId",
            isRequired: true
        },
        {
            type: "select",
            label: "Select role",
            name: "roleId",
            isRequired: true
        }
    ]
}

export const activateUserFormConfig: FormConfig<UserActivationDataType> = {
    title: "Activate user",
    description: "Please enter and confirm new password to activate your account!",
    submitButtonText: "Activate",
    fields: [
        {
            type: "input",
            name: "password",
            label: "Password",
            isRequired: true,
            inputType: "password"
        },
        {
            type: "input",
            name: "confirmPassword",
            label: "Confirm password",
            isRequired: true,
            inputType: "password"
        }
    ]
}