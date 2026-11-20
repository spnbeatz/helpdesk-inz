import { PaginatedResponse } from "@/api/types";
import { CustomerType, User } from "@/data/users";
import { CustomersPageFilterType } from "@/store/pages/customers.store";
import { UsersPageFiltersType } from "@/store/pages/settings/users.store";

export interface IUsersService {
    getCustomer(id?: string): Promise<CustomerType | null | undefined>,

    getCustomersList(
        filter: CustomersPageFilterType
    ): Promise<PaginatedResponse<CustomerType>>,

    getSettingsUsersList(
        filter: UsersPageFiltersType
    ): Promise<PaginatedResponse<User>>
}