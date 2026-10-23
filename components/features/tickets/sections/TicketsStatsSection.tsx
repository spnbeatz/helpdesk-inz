"use client"

import { useAccess } from "@/providers/access.provider";
import { Grid } from "@/components/ui/layout/Grid";
import { RoleGuard } from "@/components/misc/RoleGuard";
import { AssignedToMeTicketsCard, OpenTicketsCard, OverdueTicketsCard, TotalTicketsCard, UnassignedTicketsCard } from "@/app/page";
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { initialTicketsFilters } from "@/store/pages/tickets.store";
import { useAuth } from "@/providers/auth.provider";
import { TicketsPageFiltersType } from "@/store/pages/tickets.store";


export const TicketsStatsSection = () => {
    return (
        <Grid cols={5} gap={4} className="w-full">
            <TicketsTechnicianStatistics />
            <TicketsAdministratorStatistics />
            <TicketsManagerStatistics />
            <TicketsUserStatistics />
        </Grid>
    )
}

export const TicketsTechnicianStatistics = () => {

    const { setFilters } = useTicketsPageStore();
    const { user } = useAuth();

    const filter = (filters?: Partial<TicketsPageFiltersType>) => {
        setFilters({...initialTicketsFilters, ...filters});
    }

    const filterAllTickets = () => filter()
    const filterOpenTickets = () => filter({status: "new"});
    const filterUnassignedTickets = () => filter({technicianId: null});
    const filterAssignedTickets = () => filter({technicianId: user?.id})
    const filterOverdueTickets = () => filter({createdBefore: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()})

    return (
        <RoleGuard roles={"Technician"}>
            <TotalTicketsCard onClick={filterAllTickets}/>
            <OpenTicketsCard onClick={filterOpenTickets}/>
            <UnassignedTicketsCard onClick={filterUnassignedTickets}/>
            <AssignedToMeTicketsCard onClick={filterAssignedTickets}/>
            <OverdueTicketsCard onClick={filterOverdueTickets}/>
        </RoleGuard>
    )
}

export const TicketsAdministratorStatistics = () => {

    return (
        <RoleGuard roles={"Administrator"}>
            <></>
        </RoleGuard>
    )
}
export const TicketsManagerStatistics = () => {

    return (
        <RoleGuard roles={"Manager"}>
            <></>
        </RoleGuard>
    )
}
export const TicketsUserStatistics = () => {

    return (
        <RoleGuard roles={"User"}>
            <></>
        </RoleGuard>
    )
}
