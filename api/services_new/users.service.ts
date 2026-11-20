import { CustomerType, User } from "@/data/users";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { IUsersService } from "../interfaces/services/users.interface";
import { CustomersPageFilterType } from "@/store/pages/customers.store";
import { PaginatedResponse } from "../types";

import { 
    getCustomer as getCustomer_old,
    searchCustomerList, adminSearchUserList
} from "../services/users.service";
import { UsersPageFiltersType } from "@/store/pages/settings/users.store";

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

}