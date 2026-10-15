import { TableWithPagination, TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { useCustomersPageStore } from "@/store/pages/customers.store";
import { useSearchCustomers } from "@/queries/customers/customers.query";
import { CustomerType } from "@/data/users";
import { useRouter } from "next/navigation";
import { customerTableColumns } from "../config/customerTableColumns";

export const CustomersList = () => {
    const { filters, setFilters, itemsPerPage } =
        useCustomersPageStore();
    
    const router = useRouter();

    const { data: customersList } =
        useSearchCustomers(filters);

    const goToCustomerPage = (customer: CustomerType) => {
        router.push(`/customers/${customer.id}`);
    }

    return (
        <TableWithPagination
            data={customersList ?? []}
            onRowClick={goToCustomerPage}
            columns={customerTableColumns}
            itemsPerPage={itemsPerPage}
            searchValue={filters.searchValue}
            sortBy={filters.sortBy}
            sortDir={filters.sortDir}
            setSort={(column) => {
                setFilters({
                    sortBy: column,
                    sortDir:
                        filters.sortBy === column
                            ? filters.sortDir === "asc"
                                ? "desc"
                                : "asc"
                            : "asc",
                });
            }}
        />
    );
};