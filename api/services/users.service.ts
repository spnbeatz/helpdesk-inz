import { locations } from "@/data/locations";
import { usersList, CustomerType, customersList, users } from "@/data/users";
import { CustomersPageFilterType } from "@/store/pages/customers.store";
import { PaginatedResponse } from "../types";
import { createPaginatedData, searchResults, sortResults } from "../utils";
import { UsersPageFiltersType } from "@/store/pages/settings/users.store";
import { User } from "@/data/users";

export const searchUserList = (searchValue: string) => {
    if (searchValue === "") return [];
    const search = searchValue.trim().toLowerCase();

    return usersList.filter(user => {
        const searchableText = [
            user.firstName,
            user.lastName,
            user.email
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(search);
    })


}

export const adminSearchUserList = (filters: UsersPageFiltersType): PaginatedResponse<User> => {
    let result = [...users];

    result = searchResults<User>(
        result,
        filters.searchValue,
        ["firstName", "lastName", "email"]
    )

    result = sortResults<User>(result, filters.sortBy, filters.sortDir);

    const data = createPaginatedData<User>(
        result,
        { itemsPerPage: filters.itemsPerPage, page: filters.page }
    );

    return data;

}

export const searchCustomerList = (filters: CustomersPageFilterType): PaginatedResponse<CustomerType> => {
    let result = [...customersList];

    result = searchResults<CustomerType>(
        result,
        filters.searchValue,
        ["name", "email", "position"]
    );

    result = sortResults<CustomerType>(
        result,
        filters.sortBy,
        filters.sortDir
    );

    const data = createPaginatedData<CustomerType>(
        result,
        { itemsPerPage: filters.itemsPerPage, page: filters.page }
    )

    return data;


}

export const getCustomer = (customerId?: string | null) => {
    if (!customerId) return null;
    return customersList.find((customer) => customer.id === customerId);
}
