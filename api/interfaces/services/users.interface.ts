import { PaginatedResponse } from "@/api/types";
import { CustomerType, RoleType, User } from "@/data/users";
import { CustomersPageFilterType } from "@/components/features/customers/types/filters.types";
import { UsersPageFiltersType } from "@/components/features/settings/users/types/filters.types";

export interface IUsersService {
    getCustomer(id?: string): Promise<CustomerType | null | undefined>,

    getCustomersList(
        filter: CustomersPageFilterType
    ): Promise<PaginatedResponse<CustomerType>>,

    getSettingsUsersList(
        filter: UsersPageFiltersType
    ): Promise<PaginatedResponse<User>>

    getRoleList(): Promise<RoleType[]>
}