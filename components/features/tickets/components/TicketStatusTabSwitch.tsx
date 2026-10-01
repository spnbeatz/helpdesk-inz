"use client";

import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { TabSwitch, Tabs } from "../../../ui/controls/TabSwitch";

export const TicketStatusTabSwitch = () => {

    const { filters, setFilters, setPageData } = useTicketsPageStore();

    const tabs: Tabs[] = [
        { name: "All tickets", value: "all" },
        { name: "New tickets", value: "new" },
        { name: "Closed tickets", value: "closed" }
    ]

    const handleChangeValue = (value: string) => {
        const pageData = () => {
            switch (value) {
                case "all":
                    return {
                        title: "All Tickets",
                        description: "Here you find all tickets",
                    }
                case "new":
                    return {
                        title: "Unassigned Tickets",
                        description: "Here you find unassigned tickets",
                    }
                case "closed":
                    return {
                        title: "Closed Tickets",
                        description: "Here you find closed tickets",
                    }
                default:
                    return {

                    }
            }
        }
        setPageData(pageData());
        setFilters({ status: value as "all" | "new" | "closed" })
    }

    return <TabSwitch
        activeTabValue={filters.status || "all"}
        onChange={handleChangeValue}
        tabs={tabs}
    />
}