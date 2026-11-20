import { useTicketList } from "@/queries/tickets/tickets.query";
import { useTicketsPageStore, useTicketsSettingsTableConfig } from "@/store/pages/tickets.store"
import { ticketsTableColumns } from "../config/ticketsTableColumns.config";
import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { useModalStore } from "@/store/modals";
import { useEffect } from "react";

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
        <TableWithPagination
            data={ticketsData?.items || []}
            totalItems={ticketsData?.totalItems || 0}
            columns={columns}
            searchValue={filters.searchValue}
            sortBy={filters.sortBy}
            sortDir={filters.sortDir}
            sortKeys={["title", "description"]}
            itemsPerPage={filters.itemsPerPage || 22}
            page={filters.page || 1}
            setPage={(page) => setFilters({ page })}
            onRowClick={(item) => handleOpenViewModal(item.id)}
        />
    )
}