"use client";

import { useTicketsPageStore } from "../store/page.store";
import { TabConfig, TabSwitch } from "../../../ui/controls/TabSwitch";
import { TicketStatusType } from "@/data/exampleTicketsList";

export const TicketStatusTabSwitch = () => {

    const { filters, setFilters } = useTicketsPageStore();

    const tabs: TabConfig<TicketStatusType | "all">[] = [
        { label: "All tickets", id: "all" },
        { label: "Pending tickets", id: "pending" },
        { label: "In progress tickets", id: "in_progress"},
        { label: "Resolved tickets", id: "resolved" }
    ]

    const handleChangeValue = (value: string) => {
        setFilters({ status: value === "all" ? undefined : value as TicketStatusType })
    }

    return <TabSwitch
        activeTabValue={filters.status || "all"}
        onChange={handleChangeValue}
        tabs={tabs}
    />
}