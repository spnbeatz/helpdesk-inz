"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { Button, Card, Label } from "@heroui/react";
import { GoDotFill } from "react-icons/go";
import { LuChartLine, LuTickets } from "react-icons/lu";
import { getDefaultRanges } from "@/helpers/tickets";
import { useRangeStatistics } from "@/queries/statistics/statistics.query";
import { TicketsChartRange } from "@/api/services/statistics.service";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ticketsTimeLineChartOptions } from "@/config/charts";
import { Row } from "@/components/ui/layout/flex";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

type DefaultRangeType = "lastMonth" | "lastYear" | "lastWeek" | null

export const TicketsTimeLineChart = ({ className }: { className?: string }) => {

    const [defaultRange, setDefaultRange] = useState<DefaultRangeType>("lastMonth")
    const [range, setRange] = useState<TicketsChartRange>(getDefaultRanges(defaultRange || "lastMonth"));


    const { data: statsData } = useRangeStatistics(range);

    useEffect(() => {
        if (defaultRange) {
            setRange(getDefaultRanges(defaultRange))
        }

    }, [defaultRange])

    const data = {
        labels: statsData?.labels,

        datasets: [
            {
                label: "New tickets",
                data: statsData?.newTickets,

                borderWidth: 2,
                tension: 0.1,
                borderColor: "#87CEEB",
                backgroundColor: "rgba(135, 206, 235, 0.2)",
                pointRadius: 0,
                pointHoverRadius: 5,

                fill: true,
            },
            {
                label: "Closed tickets",
                data: statsData?.closedTickets,

                borderWidth: 2,
                tension: 0.1,
                borderColor: "#8A2BE2",
                backgroundColor: "rgba(138, 43, 226, 0.2)",
                pointRadius: 0,
                pointHoverRadius: 5,

                fill: true,

            }
        ],
    };

    return (
        <Card className={`bg-white/60 rounded-lg w-full h-full flex flex-col items-start justify-between gap-2 p-6 min-w-[500px] ${className}`}>

            <Row CenterBetween className="w-full">
                <Label className="text-black/70 flex flex-row gap-2 items-center"><LuTickets color="blueviolet" />Tickets over time</Label>
                <Row Center className="gap-2">
                    <TimeSwitch selected={defaultRange} onClick={setDefaultRange} />
                    <Button className={"w-5 h-7 bg-white/60 text-black/60 rounded-lg shadow-sm"}>
                        <LuChartLine />
                    </Button>
                </Row>
            </Row>

            <div className="h-[70%] w-full">
                <Line data={data} options={ticketsTimeLineChartOptions} className="w-full h-full" />
            </div>

            <Row Center className="ml-auto gap-2">
                <Row Center className="gap-2">
                    <GoDotFill color="skyblue" />
                    <p className="text-xs text-muted">New tickets</p>
                </Row>
                <Row Center className="gap-2">
                    <GoDotFill color="blueviolet" />
                    <p className="text-xs text-muted">Closed tickets</p>
                </Row>
            </Row>
        </Card>
    );
};

export const TimeSwitch = ({
    selected,
    onClick
}: {
    selected: DefaultRangeType,
    onClick: Dispatch<SetStateAction<DefaultRangeType>>
}) => {

    const buttonClasses = "rounded-lg bg-white/60 text-black/60 text-xs px-2 py-0"

    return (
        <Row Center className="rounded-lg shadow-sm">
            <Button size="sm" onClick={() => onClick("lastYear")} isDisabled={selected === "lastYear"} variant="tertiary" className={buttonClasses + "rounded-r-none"}>Last Year</Button>
            <Button size="sm" onClick={() => onClick("lastMonth")} isDisabled={selected === "lastMonth"} variant="tertiary" className={buttonClasses + "rounded-none"}>Last Month</Button>
            <Button size="sm" onClick={() => onClick("lastWeek")} isDisabled={selected === "lastWeek"} variant="tertiary" className={buttonClasses + "rounded-l-none"}>Last Week</Button>
        </Row>
    )
}