"use client";

import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { TabConfig, TabSwitch } from "../../../ui/controls/TabSwitch";

export const TicketStatusTabSwitch = () => {

    const { filters, setFilters } = useTicketsPageStore();

    const tabs: TabConfig<string>[] = [
        { label: "All tickets", id: "all" },
        { label: "New tickets", id: "new" },
        { label: "Closed tickets", id: "closed" }
    ]

    const handleChangeValue = (value: string) => {
        setFilters({ status: value as "all" | "new" | "closed" })
    }

    return <TabSwitch
        activeTabValue={filters.status || "all"}
        onChange={handleChangeValue}
        tabs={tabs}
    />
}