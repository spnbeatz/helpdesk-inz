import { ticketsList, TicketType } from "@/data/exampleTicketsList";
import { TicketListItemType } from "./tickets.service";

export type TicketsChartData = {
    labels: string[];
    newTickets: number[];
    closedTickets: number[];
    average: number;
};

export type TicketsChartRange = {
    from: Date;
    to: Date;
};

export const getTicketsChartData = (
    { from, to }: TicketsChartRange
): TicketsChartData => {

    const tickets: TicketType[] = ticketsList;
    const diffInDays =
        Math.ceil(
            (to.getTime() - from.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    const groupBy = diffInDays <= 31 ? "day" : "month";

    const labels: string[] = [];
    const newTickets: number[] = [];
    const closedTickets: number[] = [];

    if (groupBy === "day") {
        const current = new Date(from);

        while (current <= to) {
            const year = current.getFullYear();
            const month = current.getMonth();
            const day = current.getDate();

            labels.push(
                current.toLocaleDateString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                })
            );

            newTickets.push(
                tickets.filter(ticket => {
                    const date = new Date(ticket.created_at);

                    return (
                        ticket.status === "new" &&
                        date.getFullYear() === year &&
                        date.getMonth() === month &&
                        date.getDate() === day
                    );
                }).length
            );

            closedTickets.push(
                tickets.filter(ticket => {
                    const date = new Date(ticket.updated_at);

                    return (
                        ticket.status === "closed" &&
                        date.getFullYear() === year &&
                        date.getMonth() === month &&
                        date.getDate() === day
                    );
                }).length
            );

            current.setDate(current.getDate() + 1);
        }
    }

    if (groupBy === "month") {
        const current = new Date(
            from.getFullYear(),
            from.getMonth(),
            1
        );

        while (current <= to) {
            const year = current.getFullYear();
            const month = current.getMonth();

            labels.push(
                current.toLocaleDateString("pl-PL", {
                    month: "short",
                    year: "2-digit",
                })
            );

            newTickets.push(
                tickets.filter(ticket => {
                    const date = new Date(ticket.created_at);

                    return (
                        ticket.status === "new" &&
                        date.getFullYear() === year &&
                        date.getMonth() === month
                    );
                }).length
            );

            closedTickets.push(
                tickets.filter(ticket => {
                    const date = new Date(ticket.updated_at);

                    return (
                        ticket.status === "closed" &&
                        date.getFullYear() === year &&
                        date.getMonth() === month
                    );
                }).length
            );

            current.setMonth(current.getMonth() + 1);
        }
    }

    const totalTickets =
        newTickets.reduce((sum, value) => sum + value, 0);

    const average =
        totalTickets / diffInDays;

    return {
        labels,
        newTickets,
        closedTickets,
        average: Number(average.toFixed(2)),
    };
};