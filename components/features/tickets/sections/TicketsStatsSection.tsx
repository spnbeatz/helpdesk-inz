"use client"

import { Section } from "@/components/ui/surfaces/Section";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { TotalTicketsCard } from "@/components/features/tickets/statistics/cards";
import { 
    TicketsCountByPriorityChart,
    TicketsTimeLineChart,
    TicketsStatusChart
 } from "@/components/features/tickets/statistics/charts";

export const TicketsStatsSection = () => {
    const { data: ticketsList = [] } = useTicketList({ status: "all" });
    return (
        <Section className="shrink-0 w-full flex flex-row items-start justify-start gap-2 relative h-[250px] pr-2">
                <TotalTicketsCard ticketsList={ticketsList} />
                <TicketsTimeLineChart />
                <TicketsCountByPriorityChart ticketList={ticketsList} />
                <TicketsStatusChart ticketList={ticketsList} />
        </Section>
    )
}