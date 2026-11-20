"use client"

import { PaginationBasic } from "../../../ui/data-display/PaginationBasic";
import { Ticket } from "./Ticket";
import { ScrollShadow } from "@heroui/react";
import { Column } from "../../../ui/layout/flex";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { useTicketList } from "@/queries/tickets/tickets.query";

export const TicketsGrid = () => {
    const { filters, setFilters } = useTicketsPageStore();
    const { data: ticketData, isLoading } = useTicketList(filters)

    return (
        <Column
            className={`w-full h-full min-h-0 gap-4`}
        >
            <ScrollShadow
                size={20}
                className="w-full flex-1 min-h-0 pr-2"
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {ticketData?.items.map((ticket) => (
                        <Ticket
                            key={ticket.id}
                            ticket={ticket}
                        />
                    ))}
                </div>
            </ScrollShadow>

            <div className="shrink-0">
                <PaginationBasic
                    page={filters.page || 1}
                    setPage={(page) => setFilters({ page })}
                    totalItems={ticketData?.totalItems || 0}
                    itemsPerPage={filters.itemsPerPage || 15}
                />
            </div>
        </Column>
    );
}