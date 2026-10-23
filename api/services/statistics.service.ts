
import { ticketsList, TicketType } from "@/data/exampleTicketsList";
import { UserType } from "@/data/users";
import { usersList, userRolesList } from "@/data/users";

export type TechnicianPerformanceType = {
    id: string;
    name: string;
    assigned: number;
    resolved: number;
    avgResolutionMinutes: number;
    resolutionRate: number;
};

export type TicketsChartData = {
    labels: string[];
    newTickets: number[];
    closedTickets: number[];
};

export type TicketsChartRange = {
    from: Date;
    to: Date;
};

export const getTicketsChartData = (
    { from, to }: TicketsChartRange
): TicketsChartData => {
    const tickets: TicketType[] = ticketsList;

    const start = new Date(
        from.getFullYear(),
        from.getMonth(),
        from.getDate()
    );

    const end = new Date(
        to.getFullYear(),
        to.getMonth(),
        to.getDate()
    );

    const diffInDays = Math.round(
        (Date.UTC(
            end.getFullYear(),
            end.getMonth(),
            end.getDate()
        ) - Date.UTC(
            start.getFullYear(),
            start.getMonth(),
            start.getDate()
        )) / 86400000
    ) + 1;

    const groupBy = diffInDays <= 31 ? "day" : "month";

    const labels: string[] = [];
    const newTickets: number[] = [];
    const closedTickets: number[] = [];

    const countTickets = (
        dateField: "created_at" | "resolved_at",
        year: number,
        month: number,
        day?: number
    ) => {
        return tickets.filter(ticket => {
            const value = ticket[dateField];

            if (!value) return false;

            const date = new Date(value);

            return (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                (day === undefined || date.getDate() === day)
            );
        }).length;
    };

    if (groupBy === "day") {
        const current = new Date(start);

        while (current <= end) {
            const year = current.getFullYear();
            const month = current.getMonth();
            const day = current.getDate();

            labels.push(
                current.toLocaleDateString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit"
                })
            );

            newTickets.push(
                countTickets("created_at", year, month, day)
            );

            closedTickets.push(
                countTickets("resolved_at", year, month, day)
            );

            current.setDate(current.getDate() + 1);
        }
    } else {
        const current = new Date(
            start.getFullYear(),
            start.getMonth(),
            1
        );

        while (current <= end) {
            const year = current.getFullYear();
            const month = current.getMonth();

            labels.push(
                current.toLocaleDateString("pl-PL", {
                    month: "short",
                    year: "2-digit"
                })
            );

            newTickets.push(
                countTickets("created_at", year, month)
            );

            closedTickets.push(
                countTickets("resolved_at", year, month)
            );

            current.setMonth(current.getMonth() + 1);
        }
    }

    return {
        labels,
        newTickets,
        closedTickets,
    };
};


export const getTechnicianPerformance = (): TechnicianPerformanceType[] => {
    const tickets = ticketsList;

    const technicianIds = new Set(
        userRolesList
            .filter(role => role.roleId === "ROLE-002")
            .map(role => role.userId)
    );

    const technicians = usersList.filter(user =>
        technicianIds.has(user.id)
    );

    return technicians.map(technician => {
        const assignedTickets = tickets.filter(ticket =>
            ticket.technician_id === technician.id
        );

        const resolvedTickets = assignedTickets.filter(ticket =>
            ticket.status === "closed" &&
            ticket.resolved_at !== null
        );

        const assigned = assignedTickets.length;
        const resolved = resolvedTickets.length;

        const totalMinutes = resolvedTickets.reduce(
            (sum, ticket) =>
                sum + (ticket.resolution_minutes ?? 0),
            0
        );

        return {
            id: technician.id,
            name: `${technician.firstName} ${technician.lastName}`,
            avatarUrl: technician.avatarUrl,
            assigned,
            resolved,
            avgResolutionMinutes: resolved > 0
                ? Math.round(totalMinutes / resolved)
                : 0,
            resolutionRate: assigned > 0
                ? Number(((resolved / assigned) * 100).toFixed(1))
                : 0
        };
    }).sort((a, b) => b.resolved - a.resolved);
};

export const getTechnicianWorkload = (
    tickets: TicketType[],
    limit = 4
) => {
    tickets = ticketsList
    const technicianIds = new Set(
        userRolesList
            .filter(role => role.roleId === "ROLE-002")
            .map(role => role.userId)
    );

    return usersList
        .filter(user => technicianIds.has(user.id))
        .map(user => ({
            technicianId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            avatarUrl: user.avatarUrl,
            openTickets: tickets.filter(ticket =>
                ticket.technician_id === user.id &&
                ticket.status === "new"
            ).length
        }))
        .sort((a, b) => b.openTickets - a.openTickets)
        .slice(0, limit);
};