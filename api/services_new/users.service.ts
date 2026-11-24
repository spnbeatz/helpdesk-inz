import { CustomerType, rolesList, RoleType, User } from "@/data/users";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { IUsersService } from "../interfaces/services/users.interface";
import { CustomersPageFilterType } from "@/components/features/customers/types/filters.types";
import { PaginatedResponse } from "../types";

import { 
    getCustomer as getCustomer_old,
    searchCustomerList, adminSearchUserList
} from "../services/users.service";
import { UsersPageFiltersType } from "@/components/features/settings/users/types/filters.types";

export class UsersService implements IUsersService {

    private endpoint: string = "/customers"

    constructor(
        private readonly api: IApiClient
    ){}

    async getCustomer(id?: string | null): Promise<CustomerType | null | undefined> {
        return getCustomer_old(id);
    }

    async getCustomersList(filter: CustomersPageFilterType): Promise<PaginatedResponse<CustomerType>> {
        return searchCustomerList(filter);
    }

    async getSettingsUsersList(filter: UsersPageFiltersType): Promise<PaginatedResponse<User>> {
        return adminSearchUserList(filter)
    }

    async getRoleList(): Promise<RoleType[]> {
        return rolesList;
    }

}