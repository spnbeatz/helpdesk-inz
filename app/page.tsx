"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Grid } from "@/components/ui/layout/Grid";
import { Panel } from "@/components/ui/surfaces/Panel";
import { Title } from "@/components/ui/typography/Title";
import { Description, Label, ScrollShadow } from "@heroui/react";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { StatisticCard } from "@/components/ui/data-display/StatisticCard";
import { useAccess } from "@/providers/access.provider";
import { TicketListItemType } from "@/api/services/tickets.service";
import { getTodayTicketsCount, getHighPriorityCount } from "@/helpers/ticketCounts";
import { TicketsCountByPriorityChart, TicketsTimeLineChart } from "@/components/features/tickets/statistics/charts";
import { getTicketsByPriority } from "@/helpers/tickets";
import { useAuth } from "@/providers/auth.provider";
import { useState } from "react";
import { ProgressBar } from "@heroui/react";
export default function Home() {

  const { user } = useAuth();

  return (
    <Column Start className="w-full h-full gap-4">
      <Title title={`Welcome, ${user?.firstName + " " + user?.lastName}!`} />
      <ScrollShadow className="min-h-0 w-full">
        <Grid cols={5} gap={4} className="w-full">
          <AdminDashboardItems />
        </Grid>
      </ScrollShadow>
    </Column>
  );
}

export const AdminDashboardItems = () => {
  const { hasRole } = useAccess();

  if (!hasRole("Administrator")) return null;
  return (
    <>
      <TotalTicketsCard />
      <OpenTicketsCard />
      <UnassignedTicketsCard />
      <SLAComplianceCard />
      <ActiveTechniciansCard />
      <RequiresAttentionList />
      <TicketsTimeLineChart className="col-span-3 row-span-4" />
      <TechnicianWorkload />
      <TechnicianPerformanceTable />
      <TicketsCountByPriorityChart className="row-span-1 col-span-2 w-full" />


    </>
  )
}

export const TotalTicketsCard = ({
  rightContent,
  onClick
}: {
  rightContent?: React.ReactNode,
  onClick?: () => void
}) => {

  const { data: tickets } = useTicketList({});

  return (
    <StatisticCard
      title="Total tickets"
      onClick={onClick}
      rightContent={rightContent}
      value={tickets?.length.toString()}
      description={getTodayTicketsCount() > 0 ? `+${getTodayTicketsCount()} this day` : "No new tickets today"}
    />
  )
}

export const OpenTicketsCard = ({
  rightContent,
  onClick
}: {
  rightContent?: React.ReactNode,
  onClick?: () => void
}) => {

  const { data: tickets } = useTicketList({ status: "new" });

  return (
    <StatisticCard
      title="Open tickets"
      onClick={onClick}
      rightContent={rightContent}
      value={tickets?.length.toString()}
      description={`${getHighPriorityCount(tickets)} high priority`}
    />
  )
}

export const UnassignedTicketsCard = ({
  rightContent,
  onClick
}: {
  rightContent?: React.ReactNode,
  onClick?: () => void
}) => {
  const { data: tickets } = useTicketList({ technicianId: null });

  const today = getTodayTicketsCount(tickets);

  return (
    <StatisticCard
      title="Unassigned tickets"
      onClick={onClick}
      rightContent={rightContent}
      value={tickets?.length.toString()}
      description={`${today} today's new tickets`}
    />
  )

}

export const AssignedToMeTicketsCard = ({
  rightContent,
  onClick
}: {
  rightContent?: React.ReactNode,
  onClick?: () => void
}) => {
  const { user } = useAuth();
  const { data: tickets } = useTicketList({ technicianId: user?.id });

  const today = getTodayTicketsCount(tickets);

  return (
    <StatisticCard
      title="Assigned to me"
      onClick={onClick}
      rightContent={rightContent}
      value={tickets?.length.toString()}
      description={`${today} assigned today`}
    />
  )
}

export const OverdueTicketsCard = ({
  rightContent,
  onClick
}: {
  rightContent?: React.ReactNode,
  onClick?: () => void
}) => {
  const [dateBefore] = useState(() =>
    new Date(
      Date.now() - 15 * 24 * 60 * 60 * 1000
    ).toISOString()
  );
  const { data: tickets } = useTicketList({ createdBefore: dateBefore, status: "new" })

  return (
    <StatisticCard
      title="Overdue"
      onClick={onClick}
      value={tickets?.length.toString()}
      rightContent={rightContent}
      description={"Open tickets before " + new Date(dateBefore).toDateString()}
    />
  )
}

export const SLAComplianceCard = () => {
  return (
    <StatisticCard
      title="SLA Compliance"
      value="87%"
      description="+4% this month"
    />
  )
}

export const ActiveTechniciansCard = () => {

  // technicy ktorzy maja otwarte zgloszenie
  return (
    <StatisticCard
      title="Active technicians"
      value="56"
      description="67% of all"
    />
  )
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { TableColumn, TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { getTechnicianPerformance, getTechnicianWorkload, TechnicianPerformanceType } from "@/api/services/statistics.service";
import { BasicChip } from "@/components/ui/data-display/BasicChip";
import { PriorityChip } from "@/components/features/tickets/components/TicketInfoChips";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);


export const TicketsByPriorityChart = () => {
  const { data: tickets } = useTicketList({});
  const data = getTicketsByPriority(tickets || []);

  const ticketsByPriorityChartOptions = {
    indexAxis: "x" as const,

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
    <Panel className="row-span-4">
      <Label className="text-black/70 flex flex-row gap-2 items-center">Tickets by priority</Label>
      <div className="h-full">
        <Bar data={data} options={ticketsByPriorityChartOptions} />
      </div>

    </Panel>
  )
}

export const technicianPerformanceColumns: TableColumn<TechnicianPerformanceType>[] = [
  { id: "id", name: "ID" },
  { id: "name", name: "Name" },
  { id: "assigned", name: "Assigned" },
  { id: "resolved", name: "Resolved" },
  { id: "avgResolutionMinutes", name: "Average Resolution (minutes)" },
  { id: "resolutionRate", name: "Resolution Rate" }
]

export const TechnicianPerformanceTable = () => {
  const technicians = getTechnicianPerformance();
  return (
    <Panel className="col-span-3 row-span-2 h-full">
      <Label className="text-black/70 flex flex-row gap-2 items-center">Technician Performance</Label>
      <TableWithPagination
        data={technicians || []}
        columns={technicianPerformanceColumns}
        itemsPerPage={5}
      />
    </Panel>
  )
}

export const RequiresAttentionList = () => {
  const [dateBefore] = useState(() =>
    new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString()
  );

  const { data: tickets } = useTicketList({
    createdBefore: dateBefore,
    status: "new",
    limit: 5
  });

  return (
    <Panel className="row-span-4 col-span-2 flex flex-col min-h-0 overflow-hidden gap-2">
      <Label className="text-black/70 flex items-center gap-2 shrink-0">
        Requires attention
      </Label>

      <ScrollShadow className="flex-1 min-h-0 w-full max-h-[300px]">
        {tickets?.map(ticket => (
          <AttentionTicketItem
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </ScrollShadow>
    </Panel>
  );
};

export const AttentionTicketItem = ({ ticket }: { ticket: TicketListItemType }) => {

  return (
    <Row StartBetween className="rounded-lg shadow-sm bg-white/80 p-4 w-full mb-2">
      <Column Start className="gap-2">
        <Description>{ticket.id}</Description>
        <Label>{ticket.title}</Label>
        <Description>{ticket.status == "new" ? "Unassigned" : "Assigned"}</Description>
      </Column>
      <PriorityChip priority={ticket.priority} />
    </Row>
  )
}

export const TechnicianWorkload = () => {
  const { data: tickets } = useTicketList({})

  const workload = getTechnicianWorkload(tickets || [])

  return (
    <Panel className="col-span-2 row-span-2">
      <Label className="text-black/70 flex items-center gap-2 shrink-0">
        Technician workload
      </Label>
      {
        workload.map((item) => (
          <WorkloadItem item={item} max={workload[0].openTickets} />
        ))
      }
    </Panel>
  )
}

export const WorkloadItem = ({ item, max }: { item: any, max: number }) => {
  return (
    <Row CenterBetween className="py-4 w-full">
      <Description className="w-40">{item.name}</Description>
      <ProgressBar value={item.openTickets} className={"w-80"} maxValue={max} size="lg">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <Description>{item.openTickets}</Description>
    </Row>
  )
}

