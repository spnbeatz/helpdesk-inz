"use client"

import { Grid } from "@/components/ui/layout/Grid";
import { RoleGuard } from "@/components/misc/RoleGuard";
import { TicketsTechnicianStatisticsProvider } from "../providers/technicianStatistics.provider";
import { TechnicianTicketsStatisticsCards } from "../components/TechnicianTicketsStatisticsCards";


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
    return (
        <RoleGuard roles={"Technician"}>
            <TicketsTechnicianStatisticsProvider>
                <TechnicianTicketsStatisticsCards />
            </TicketsTechnicianStatisticsProvider>
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
