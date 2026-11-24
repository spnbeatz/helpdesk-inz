export type UserCreateDataType = {
    firstName: string,
    lastName: string,
    email: string,
    locationId: string,
    roleId: string
}

export type UserActivationDataType = {
    password: string,
    confirmPassword: string
}