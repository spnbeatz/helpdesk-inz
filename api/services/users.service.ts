import { usersList, CustomerType, customersList, users } from "@/data/users";
import { CustomersPageFilterType } from "@/store/pages/customers.store";

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

export const adminSearchUserList = (searchValue: string) => {
    if (searchValue === "") return users;
    const search = searchValue.trim().toLowerCase();

    return users.filter(user => {
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

export const searchCustomerList = (filters: CustomersPageFilterType): CustomerType[] => {
    let result = [...customersList];

    if (filters?.searchValue?.trim()) {
        const search = filters.searchValue.trim().toLowerCase();

        result = customersList.filter(customer => {
            const searchableText = [
                customer.name,
                customer.email,
                customer.position
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(search);
        })

        if (filters?.sortBy) {
            const { sortBy, sortDir = "asc" } = filters;

            result.sort((a, b) => {
                const aValue = a[sortBy];
                const bValue = b[sortBy];

                if (aValue == null && bValue == null) return 0;
                if (aValue == null) return 1;
                if (bValue == null) return -1;

                const comparison = String(aValue).localeCompare(
                    String(bValue),
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

                return sortDir === "desc"
                    ? -comparison
                    : comparison;
            });
        }


    }

    return result;


}

export const getCustomer = (customerId?: string | null) => {
    if(!customerId) return null;
    return customersList.find((customer) => customer.id === customerId);
}
