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
import { TicketListItemType } from "@/api/services/tickets.service";
import { ticketsCountByPriorityChartOptions } from "@/config/charts";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export const TicketsCountByPriorityChart = ({ ticketList }: { ticketList: TicketListItemType[] }) => {

    const data = getTicketsByPriority(ticketList);

    return (
        <Card className="bg-white/60 rounded-lg h-full p-6 flex flex-col items-start justify-center gap-2 max-w-[400px] w-full">
            <Label className="text-black/70 flex flex-row gap-2 items-center">Tickets counts by priority</Label>
            <div className="w-full h-[80%]">
                <Bar data={data} options={ticketsCountByPriorityChartOptions} />
            </div>

        </Card>
    );
};