import { useTicketsSettingsTableConfig } from "@/store/pages/tickets.store"
import { TicketsGrid } from "./TicketsGrid";
import { TicketsTable } from "./TicketsTable";

export const TicketsList = () => {

    const { layoutType } = useTicketsSettingsTableConfig();

    return layoutType === "grid" ? (
        <TicketsGrid />
    ) : (
        <TicketsTable />
    )
}