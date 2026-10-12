import { Tabs, TabsListType } from "@/components/ui/controls/tabs/Tabs"
import { InventoryTab } from "./InventoryTab"
import { TicketsTab } from "./TicketsTab"

const tabs:TabsListType[] = [
    {
        id: "inventory",
        label: "Inventory"
    },
    {
        id: "tickets",
        label: "Tickets"
    }
]

export const CustomerTabs = () => {
    return (
        <Tabs tabs={tabs}>
            <InventoryTab />
            <TicketsTab />
        </Tabs>
    )
}