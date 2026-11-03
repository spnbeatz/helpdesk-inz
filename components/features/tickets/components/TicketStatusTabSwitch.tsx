"use client";

import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { TabSwitch, Tabs } from "../../../ui/controls/TabSwitch";

export const TicketStatusTabSwitch = () => {

    const { filters, setFilters } = useTicketsPageStore();

    const tabs: Tabs[] = [
        { name: "All tickets", value: "all" },
        { name: "New tickets", value: "new" },
        { name: "Closed tickets", value: "closed" }
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