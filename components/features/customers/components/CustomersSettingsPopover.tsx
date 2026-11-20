import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";
import { useCustomersPageStore } from "@/store/pages/customers.store"

export const CustomersSettingsPopover = createSettingsPopover(
    useCustomersPageStore
)