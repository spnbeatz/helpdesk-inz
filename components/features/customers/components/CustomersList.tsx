import { TableWithPagination, TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { useCustomersPageStore } from "@/store/pages/customers.store";
import { useSearchCustomers } from "@/queries/customers/customers.query";
import { CustomerType } from "@/data/users";
import { useRouter } from "next/navigation";
import { customerTableColumns } from "../config/customerTable.config";

export const CustomersList = () => {
    const { filters, setFilters, itemsPerPage } =
        useCustomersPageStore();
    
    const router = useRouter();

    const { data: customersData } =
        useSearchCustomers(filters);

    const goToCustomerPage = (customer: CustomerType) => {
        router.push(`/customers/${customer.id}`);
    }

    return (
        <TableWithPagination
            data={customersData?.items ?? []}
            totalItems={customersData?.totalItems || 0}
            page={filters.page || 1}
            setPage={(page) => setFilters({page})}
            onRowClick={goToCustomerPage}
            columns={customerTableColumns}
            itemsPerPage={filters.itemsPerPage || 22}
            searchValue={filters.searchValue}
            sortBy={filters.sortBy}
            sortDir={filters.sortDir}
            sortKeys={["email", "name"]}
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