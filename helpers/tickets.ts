import { TicketType } from "@/data/exampleTicketsList";
import { TicketListItemType } from "@/api/services/tickets.service";

export const getTicketsByPriority = (tickets: TicketListItemType[]) => {
    return {
        labels: ["Low", "Medium", "High"],
        datasets: [
            {
                label: "Tickets",
                data: [
                    tickets.filter(ticket => ticket.priority === "low").length,
                    tickets.filter(ticket => ticket.priority === "medium").length,
                    tickets.filter(ticket => ticket.priority === "high").length,
                ],
                barThickness: 15,
                backgroundColor: "rgba(40, 43, 254, 0.4)"
            },
        ],
    };
};

export const getTicketsByStatus = (tickets: TicketListItemType[]) => {
    return {
        labels: ["New", "Closed"],

        datasets: [
            {
                label: "Tickets",

                data: [
                    tickets.filter(ticket => ticket.status === "new").length,
                    tickets.filter(ticket => ticket.status === "closed").length,
                ],

                backgroundColor: [
                    "rgba(86, 120, 225, 0.85)",  // New
                    "rgba(120, 135, 215, 0.3)",  // Closed
                ],
                borderColor: [
                    "rgba(138, 43, 226, 1)",
                    "rgba(138, 43, 226, 0.5)",
                ],

                borderWidth: 0,

                hoverBackgroundColor: [
                    "rgba(138, 43, 226, 1)",
                    "rgba(138, 43, 226, 0.4)",
                ],

                hoverBorderColor: [
                    "rgba(138, 43, 226, 1)",
                    "rgba(138, 43, 226, 0.7)",
                ],

                hoverOffset: 8,
            },
        ],
    };
};

export const getTicketsADayChartData = (tickets: TicketListItemType[]) => {
    const months = [
        { label: "kwi 26", month: 3, year: 2026 },
        { label: "maj 26", month: 4, year: 2026 },
        { label: "cze 26", month: 5, year: 2026 },
        { label: "lip 26", month: 6, year: 2026 },
        { label: "sie 26", month: 7, year: 2026 },
        { label: "wrz 26", month: 8, year: 2026 },
    ];

    return {
        labels: months.map((month) => month.label),

        datasets: [
            {
                label: "New tickets",
                data: months.map(({ month, year }) =>
                    tickets.filter((ticket) => {
                        const date = new Date(ticket.created_at);

                        return (
                            date.getMonth() === month &&
                            date.getFullYear() === year &&
                            ticket.status === "new"
                        );
                    }).length
                ),
            },
            {
                label: "Closed tickets",
                data: months.map(({ month, year }) =>
                    tickets.filter((ticket) => {
                        const date = new Date(ticket.created_at);

                        return (
                            date.getMonth() === month &&
                            date.getFullYear() === year &&
                            ticket.status === "closed"
                        );
                    }).length
                ),
            },
        ],
    };
};

export const getDefaultRanges = (
    rangeType: "lastMonth" | "lastWeek" | "lastYear"
) => {
    const to = new Date();
    const from = new Date(to);

    switch (rangeType) {
        case "lastWeek":
            from.setDate(from.getDate() - 7);
            break;

        case "lastMonth":
            from.setDate(from.getDate() - 30);
            break;

        case "lastYear":
            from.setDate(from.getDate() - 365);
            break;
    }

    return {
        from,
        to
    };
};