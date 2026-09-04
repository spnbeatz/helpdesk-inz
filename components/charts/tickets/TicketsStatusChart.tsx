"use client";

import { Card, Label } from "@heroui/react";
import { Doughnut } from "react-chartjs-2";
import { TicketListItemType } from "@/api/services/tickets.service";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { getTicketsByStatus } from "@/helpers/tickets";
import { ticketsList } from "@/data/exampleTicketsList";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export const TicketsStatusChart = ({ticketList} : {ticketList: TicketListItemType[]}) => {
    const data = getTicketsByStatus(ticketList);

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        cutout: "65%",

        plugins: {
            legend: {
                display: true,
                position: "bottom" as const,

                labels: {
                    color: "#a89f91",
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 20,

                    font: {
                        size: 13,
                    },
                },
            },

            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#4a453e",
                bodyColor: "#4a453e",

                borderColor: "#e5dfd5",
                borderWidth: 1,

                padding: 10,

                displayColors: true,
            },
        },

        animation: {
            duration: 500,
        },
    };

    return (
        <Card className="bg-white/60 rounded-lg h-full w-full max-w-[250px] p-8 flex flex-col items-start justify-center gap-4 overflow-hidden">
            <Label className="text-black/70">
                Tickets by status
            </Label>

            <div className="relative w-full flex-1 min-h-0">
                <Doughnut
                    data={data}
                    options={options}
                />
            </div>
        </Card>
    );
};