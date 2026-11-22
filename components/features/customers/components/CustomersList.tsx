
import { useCustomersPageStore } from "@/store/pages/customers.store";
import { useSearchCustomers } from "@/queries/customers/customers.query";
import { useRouter } from "next/navigation";
import { customerTableColumns } from "../config/customerTable.config";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";

export const CustomersList = () => {
    const { filters, setFilters } =
        useCustomersPageStore();
    
    const router = useRouter();

    const { data: customersData } =
        useSearchCustomers(filters);

    const goToCustomerPage = (customerId: string) => {
        router.push(`/customers/${customerId}`);
    }

    return (
        <PaginatedTable 
            data={customersData?.items}
            totalItems={customersData?.totalItems}
            filters={filters}
            setFilters={setFilters}
            columns={customerTableColumns}
            onRowClick={(item) => goToCustomerPage(item.id)}
        />
    )
};