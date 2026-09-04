"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Card, Label } from "@heroui/react";
import { getTicketsByPriority } from "@/helpers/tickets";
import { ticketsList } from "@/data/exampleTicketsList";
import { TicketListItemType } from "@/api/services/tickets.service";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export const TicketsCountByPriority = ({ ticketList }: { ticketList: TicketListItemType[] }) => {

    const data = getTicketsByPriority(ticketList);

    const options = {
        indexAxis: "y" as const,

        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#4a453e",
                bodyColor: "#4a453e",
                borderColor: "#e5dfd5",
                borderWidth: 1,
                padding: 10,

                displayColors: false,
            },
        },

        scales: {
            x: {
                beginAtZero: true,

                grid: {
                    display: true,
                    color: "rgba(138, 43, 226, 0.1)"
                },

                border: {
                    display: false,
                },

                ticks: {
                    display: true,
                    color: "#a89f91",
                    precision: 5,
                },
            },

            y: {
                grid: {
                    display: false,
                },

                border: {
                    display: false,
                },

                ticks: {
                    color: "#a89f91",
                    font: {
                        size: 13,
                    },
                },
            },
        },
    };

    return (
        <Card className="bg-white/60 rounded-lg h-full p-6 flex flex-col items-start justify-center gap-2 max-w-[400px] w-full">
            <Label className="text-black/70 flex flex-row gap-2 items-center">Tickets counts by priority</Label>
            <div className="w-full h-[80%]">
                <Bar data={data} options={options} />
            </div>

        </Card>
    );
};