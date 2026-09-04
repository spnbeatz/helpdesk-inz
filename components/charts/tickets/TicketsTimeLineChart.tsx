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
import { getDefaultRanges, getTicketsADayChartData } from "@/helpers/tickets";
import { TicketListItemType } from "@/api/services/tickets.service";
import { useRangeStatistics } from "@/queries/statistics/statistics.query";
import { TicketsChartRange } from "@/api/services/statistics.service";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RowCenter } from "@/components/ticket/Ticket";
import { DateField, RangeCalendar, DateRangePicker } from "@heroui/react";
import { IconButton } from "@/components/ticket/ticketsScreenTitle";
import { LuEye } from "react-icons/lu";

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

export const TicketsTimeLineChart = () => {

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
                tension: 0.35,
                borderColor: "skyblue",
                backgroundColor: "skyblue",
                pointRadius: 0,
                pointHoverRadius: 5,

                fill: false,
            },
            {
                label: "Closed tickets",
                data: statsData?.closedTickets,

                borderWidth: 2,
                tension: 0.35,
                borderColor: "blueviolet",
                backgroundColor: "blueviolet",
                pointRadius: 0,
                pointHoverRadius: 5,

                fill: false,

            },
            {
                label: "Average tickets",
                data: (statsData?.labels ?? []).map(
                    () => statsData?.average ?? 0
                ),
                borderWidth: 2,
                tension: 0.35,
                borderColor: "red",
                backgroundColor: "red",
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: false
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            mode: "index" as const,
            intersect: false,
        },

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },

                border: {
                    display: false,
                },
            },

            y: {
                beginAtZero: true,

                ticks: {
                    precision: 0,
                },

                grid: {
                    display: true,
                },

                border: {
                    display: false,
                },
            },
        },
    };

    return (
        <Card className="bg-white/60 rounded-lg w-full h-full flex flex-col items-start justify-center gap-2 p-6 min-w-[500px]">
            <div className="w-full flex flex-row items-center justify-between">
                <Label className="text-black/70 flex flex-row gap-2 items-center"><LuTickets color="blueviolet" /> New & closed tickets</Label>
                <RowCenter className="gap-2">
                    <TimeSwitch selected={defaultRange} onClick={setDefaultRange} />
                    <Button className={"w-5 h-7 bg-white/60 text-black/60 rounded-lg shadow-sm"}>
                        <LuChartLine />
                    </Button>
                </RowCenter>

            </div>
            <div className="h-[70%] w-full">
                <Line data={data} options={options} className="w-full h-full" />
            </div>

            <div className="ml-auto flex flex-row items-center justify-center gap-2">
                <div className="flex flex-row items-center justify-center gap-2">
                    <GoDotFill color="skyblue" />
                    <p className="text-xs text-muted">New tickets</p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <GoDotFill color="blueviolet" />
                    <p className="text-xs text-muted">Closed tickets</p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <GoDotFill color="red" />
                    <p className="text-xs text-muted">Average tickets</p>
                </div>
            </div>
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
        <RowCenter className="rounded-lg shadow-sm">
            <Button size="sm" onClick={() => onClick("lastYear")} isDisabled={selected === "lastYear"} variant="tertiary" className={buttonClasses + "rounded-r-none"}>Last Year</Button>
            <Button size="sm" onClick={() => onClick("lastMonth")} isDisabled={selected === "lastMonth"} variant="tertiary" className={buttonClasses + "rounded-none"}>Last Month</Button>
            <Button size="sm" onClick={() => onClick("lastWeek")} isDisabled={selected === "lastWeek"} variant="tertiary" className={buttonClasses + "rounded-l-none"}>Last Week</Button>
        </RowCenter>
    )
}

export const DatePickerRange = () => {
    return (
        <DateRangePicker className="w-80" endName="endDate" startName="startDate">
            <DateField.Group className={"bg-red-200 py-0 rounded-lg w-[100px]"}>
                <DateField.Input slot="start">
                    {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateRangePicker.RangeSeparator />
                <DateField.Input slot="end">
                    {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                    <DateRangePicker.Trigger>
                        <DateRangePicker.TriggerIndicator />
                    </DateRangePicker.Trigger>
                </DateField.Suffix>
            </DateField.Group>
            <DateRangePicker.Popover>
                <RangeCalendar aria-label="Trip dates">
                    <RangeCalendar.Header>
                        <RangeCalendar.YearPickerTrigger>
                            <RangeCalendar.YearPickerTriggerHeading />
                            <RangeCalendar.YearPickerTriggerIndicator />
                        </RangeCalendar.YearPickerTrigger>
                        <RangeCalendar.NavButton slot="previous" />
                        <RangeCalendar.NavButton slot="next" />
                    </RangeCalendar.Header>
                    <RangeCalendar.Grid>
                        <RangeCalendar.GridHeader>
                            {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                        </RangeCalendar.GridHeader>
                        <RangeCalendar.GridBody>
                            {(date) => <RangeCalendar.Cell date={date} />}
                        </RangeCalendar.GridBody>
                    </RangeCalendar.Grid>
                    <RangeCalendar.YearPickerGrid>
                        <RangeCalendar.YearPickerGridBody>
                            {({ year }) => <RangeCalendar.YearPickerCell year={year} />}
                        </RangeCalendar.YearPickerGridBody>
                    </RangeCalendar.YearPickerGrid>
                </RangeCalendar>
            </DateRangePicker.Popover>
        </DateRangePicker>
    );
}