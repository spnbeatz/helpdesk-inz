import { TableWithPagination, TableColumn } from "@/components/ui/data-display/TableWithPagination";
import { useCustomersPageStore } from "@/store/pages/customers.store";
import { useSearchCustomers } from "@/queries/customers/customers.query";
import { CustomerType } from "@/data/users";
import { useModalStore } from "@/store/modals";
import { useRouter } from "next/navigation";


export const CustomersList = () => {
    const { filters, setFilters, itemsPerPage } =
        useCustomersPageStore();
    
    const router = useRouter();

    const { data: customersList } =
        useSearchCustomers(filters);

    const columns: TableColumn<CustomerType>[] = [
        { id: "id", name: "ID" },
        { id: "name", name: "Name" },
        { id: "location", name: "Location" },
        { id: "email", name: "Email" },
        { id: "phone", name: "Phone" },
        { id: "department", name: "Department" },
        { id: "position", name: "Position" },
    ];

    const goToCustomerPage = (customer: CustomerType) => {
        router.push(`/customers/${customer.id}`);
    }

    return (
        <TableWithPagination
            data={customersList ?? []}
            onRowClick={goToCustomerPage}
            columns={columns}
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