import { searchCustomerList } from "@/api/services/users.service"
import { CustomersPageFilterType } from "@/store/pages/customers.store"
import { useQuery } from "@tanstack/react-query"

export const useSearchCustomers = (filters: CustomersPageFilterType) => {
    return useQuery({
        queryKey: ["users", filters],
        queryFn: () => searchCustomerList(filters),
        enabled: !!filters
    })
}