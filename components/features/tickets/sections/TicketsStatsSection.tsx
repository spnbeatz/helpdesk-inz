"use client"

import { Section } from "@/components/ui/surfaces/Section";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { TotalTicketsCard } from "@/components/features/tickets/statistics/cards";
import { 
    TicketsCountByPriorityChart,
    TicketsTimeLineChart,
    TicketsStatusChart
 } from "@/components/features/tickets/statistics/charts";
import { Row } from "@/components/ui/layout/flex";

export const TicketsStatsSection = () => {
    const { data: ticketsList = [] } = useTicketList({ status: "all" });
    return (
        <Row CenterBetween className="w-full relative h-62 pr-2 gap-2">
                <TotalTicketsCard ticketsList={ticketsList} />
                <TicketsTimeLineChart />
                <TicketsCountByPriorityChart ticketList={ticketsList} />
                <TicketsStatusChart ticketList={ticketsList} />
        </Row>
    )
}