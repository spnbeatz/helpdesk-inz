import { useTicketList } from "../queries/query";
import { useTicketsPageStore } from "../store/page.store";
import { useTicketsSettingsTableConfig } from "../store/table.store";
import { ticketsTableColumns } from "../config/table.config";
import { useModalStore } from "@/store/modals";
import { PaginatedTable } from "@/components/ui/data-display/paginated-table/PaginatedTable";

export const TicketsTable = () => {

    const { filters, setFilters } = useTicketsPageStore();

    const { data: ticketsData } = useTicketList(filters);

    const { visibleColumns } = useTicketsSettingsTableConfig();

    const columns = ticketsTableColumns.filter((column) =>
        visibleColumns.includes(column.id)
    )

    const { openModal } = useModalStore();

    const handleOpenViewModal = (ticketId: string) => {
        openModal("viewTicket", { ticketId })
    }

    return (
        <PaginatedTable 
            data={ticketsData?.items}
            totalItems={ticketsData?.totalItems}
            columns={columns}
            filters={filters}
            setFilters={setFilters}
            onRowClick={(item) => handleOpenViewModal(item.id)}
        />
    )
}