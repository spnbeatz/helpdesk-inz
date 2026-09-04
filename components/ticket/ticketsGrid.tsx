"use client"

import { useEffect, useState } from "react"
import { PaginationBasic } from "../other/PaginationBasic";
import { ticketsList, TicketType } from "@/data/exampleTicketsList";
import { Ticket } from "./Ticket";
import { ScrollShadow } from "@heroui/react";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { TicketListItemType } from "@/api/services/tickets.service";

export const TicketsGrid = () => {
    const [page, setPage] = useState<number>(1);
    const { itemsPerPage, statsVisibility, otherFilters } = useTicketsPageStore();

    const { data: filteredTickets = [], isLoading } = useTicketList(otherFilters);

    useEffect(() => {
        console.log(otherFilters, " other filters");
    },[otherFilters])


    const getPaginatedTickets = (
        tickets: TicketListItemType[],
        page: number
    ) => {
        if(!tickets) return [];
        const sortedTickets = [...tickets].sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return sortedTickets.slice(startIndex, endIndex);
    };


    return (
        <div
            className={`w-full h-full min-h-0 flex flex-col gap-4 ${!statsVisibility ? "pt-4" : ""
                }`}
        >
            <ScrollShadow
                size={20}
                className="w-full flex-1 min-h-0 pr-2"
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {getPaginatedTickets(filteredTickets!, page).map((ticket) => (
                        <Ticket
                            key={ticket.id}
                            ticket={ticket}
                        />
                    ))}
                </div>
            </ScrollShadow>

            <div className="shrink-0">
                <PaginationBasic
                    page={page}
                    setPage={setPage}
                    totalItems={filteredTickets!.length || 0}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
}