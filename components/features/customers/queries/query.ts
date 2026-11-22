import { CustomersPageFilterType } from "../types/filters.types"
import { useQuery } from "@tanstack/react-query"
import { usersService } from "@/api"

export const useSearchCustomers = (filters: CustomersPageFilterType) => {
    return useQuery({
        queryKey: ["users", filters],
        queryFn: () => usersService.getCustomersList(filters),
        enabled: !!filters
    })
}

export const useCustomer = (customerId?: string | null) => {
    return useQuery({
        queryKey: ["user", customerId],
        queryFn: () => usersService.getCustomer(customerId),
        enabled: !!customerId
    })
}