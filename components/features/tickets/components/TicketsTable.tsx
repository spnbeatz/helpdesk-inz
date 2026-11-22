import { useTicketList } from "@/queries/tickets/tickets.query";
import { useTicketsPageStore, useTicketsSettingsTableConfig } from "@/store/pages/tickets.store"
import { ticketsTableColumns } from "../config/ticketsTableColumns.config";
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