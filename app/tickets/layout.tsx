"use client"

import { Tooltip, Button } from "@heroui/react"
import { LuArrowUp, LuTrendingUp } from "react-icons/lu"
import { TicketsTimeLineChart } from "@/components/charts/tickets/TicketsTimeLineChart";
import { StatsCard } from "@/components/layout/statsCard";

import { TicketsGrid } from "@/components/ticket/ticketsGrid";
import { TicketsCountByPriority } from "@/components/charts/tickets/TicketsCountByPriority";
import { TicketsScreenTitle } from "@/components/ticket/ticketsScreenTitle";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { Section } from "@/components/layout/section";
import { TicketsStatusChart } from "@/components/charts/tickets/TicketsStatusChart";
import { useTicketList } from "@/queries/tickets/tickets.query";

export default function TicketsLayout({ children }: { children: React.ReactNode }) {

    const { title, description, listFilter, statsVisibility } = useTicketsPageStore();

    const { data: ticketsList = [] } = useTicketList({status: "all"})
    // ZAMIENIC POTEM NA JAKIS ENDPOINT ZE STATYSTYKAMI I WYODREBNIC DO OSOBNEGO KOMPONENTU 
    // WSZYTSKIE STATYSTYKI ZEBY BYLO SRP

    const getTodayTickets = () => {
        return ticketsList.filter(
            ticket =>
                new Date(ticket.created_at).toDateString() === new Date().toDateString()
        ).length;
    }

    // STRONY DAC JAKO RETURN NULL A TITLE PRZENIESC DO LAYOUTU A RESZTA DANYCH TYPU TYTUL BEDZIE W ZUSTAND

    const getAverageTicketsPerDay = () => {
        if (!ticketsList.length) return 0;

        const days = new Set(
            ticketsList.map(ticket =>
                new Date(ticket.created_at).toDateString()
            )
        );

        return (ticketsList.length / days.size).toFixed(2) as unknown as number;
    };

    return (
        <div className="w-full h-full relative flex flex-col items-start justify-start gap-4">
            {children}
            <TicketsScreenTitle
                title={title}
                description={description}
            />
            {statsVisibility &&
                <Section className="shrink-0 w-full">
                    <div className="w-full flex flex-row items-start justify-start gap-2 relative h-[250px] pr-2 shrink-0">
                        <StatsCard
                            title="Total tickets"
                            quantity={ticketsList.length || 0}
                            additionalIcon={
                                <Tooltip delay={0}>
                                    <Button variant="ghost" className={"p-0"}>
                                        <p className="text-xs flex flex-row items-center justify-center"><LuArrowUp className="text-green-500" /> {getTodayTickets()}</p>
                                    </Button>
                                    <Tooltip.Content showArrow placement="bottom">
                                        <Tooltip.Arrow />
                                        <p>Quantity of new tickets this day</p>
                                    </Tooltip.Content>
                                </Tooltip>
                            }
                        />

{/*                         <StatsCard
                            title="Average Day Tickets"
                            quantity={getAverageTicketsPerDay()}
                            additionalIcon={<LuTrendingUp className="text-green-500" />}
                        /> */}

                        <TicketsTimeLineChart/>
                        <TicketsCountByPriority ticketList={ticketsList}/>
                        <TicketsStatusChart ticketList={ticketsList}/>
                    </div>
                </Section>
            }
            <Section className="flex-1 min-h-0">
                <TicketsGrid />
            </Section>



        </div>
    )
}

// caly layout jako strona tylko pages jako tytul strony lub cos w tym stylu
// zeby headery na stronach sie nie ruszaly, tylko jakis scroll pod nim