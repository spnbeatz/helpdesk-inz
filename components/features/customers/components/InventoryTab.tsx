import { Tab } from "@/components/ui/controls/tabs/Tabs"
import { OwnedEquipmentListView } from "../../logistics/owned/components/OwnedEquipmentListView";

export const InventoryTab = () => {
    return (
        <Tab id="inventory">
            <OwnedEquipmentListView />
        </Tab>
    )
}

// musi byc dostep do selected items jakis a nie wewnatrz table komponenu