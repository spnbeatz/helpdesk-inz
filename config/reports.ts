import { CreateReportCardProps } from "@/app/reports/page";

export const createReportCards: CreateReportCardProps[] = [
    {
        id: "tickets",
        title: "Tickets Report",
        description:
            "Overview of tickets created during a selected period, including status, priority, category and resolution statistics.",
        href: "/reports/tickets",
        includes: [
            "Total number of tickets",
            "Tickets by status",
            "Tickets by priority",
            "Tickets by category",
            "Tickets created over time",
            "Average response time",
            "Average resolution time",
            "Closure rate",
            "Top technicians",
            "Detailed ticket list"
        ],
        color: "indigo"
    },
    {
        id: "technicians",
        title: "Technician Performance",
        description:
            "Analyze technician workload, resolved tickets, response times and overall support performance.",
        href: "/reports/technicians",
        includes: [
            "Assigned tickets",
            "Resolved tickets",
            "Open tickets",
            "Average response time",
            "Average resolution time",
            "Resolution rate",
            "SLA compliance",
            "Current workload",
            "Technician comparison",
            "Performance ranking"
        ],
        color: "emerald"
    },
    {
        id: "sla",
        title: "SLA Report",
        description:
            "Review SLA compliance, breached deadlines and response or resolution times across tickets.",
        href: "/reports/sla",
        includes: [
            "Overall SLA compliance",
            "Tickets within SLA",
            "SLA breached tickets",
            "Response time compliance",
            "Resolution time compliance",
            "SLA by priority",
            "SLA by category",
            "SLA by technician",
            "Average SLA breach time",
            "SLA trend over time"
        ],
        color: "amber"
    },
    {
        id: "resolution-time",
        title: "Resolution Time Report",
        description:
            "Analyze ticket response and resolution times and identify delays in the support process.",
        href: "/reports/resolution-time",
        includes: [
            "Average response time",
            "Median response time",
            "Average resolution time",
            "Median resolution time",
            "Fastest resolved tickets",
            "Slowest resolved tickets",
            "Resolution time by priority",
            "Resolution time by category",
            "Resolution time by technician",
            "Resolution time trend"
        ],
        color: "red"
    },
    {
        id: "categories",
        title: "Category Report",
        description:
            "Discover the most common types of issues and how ticket categories change over time.",
        href: "/reports/categories",
        includes: [
            "Tickets by category",
            "Category percentage share",
            "Most common category",
            "Least common category",
            "Open tickets by category",
            "Closed tickets by category",
            "Average resolution time by category",
            "Priority distribution by category",
            "Category trend over time",
            "Category comparison"
        ],
        color: "pink"
    },
    {
        id: "backlog",
        title: "Backlog Report",
        description:
            "Review unresolved and aging tickets to identify bottlenecks and overdue support requests.",
        href: "/reports/backlog",
        includes: [
            "Total unresolved tickets",
            "Unassigned tickets",
            "Overdue tickets",
            "Oldest unresolved tickets",
            "Ticket age distribution",
            "Backlog by priority",
            "Backlog by category",
            "Backlog by technician",
            "Average ticket age",
            "Backlog trend over time"
        ],
        color: "blue"
    }
];
