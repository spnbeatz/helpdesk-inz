import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";
import { useCustomersPageStore } from "../store/page.store";

export const CustomersSettingsPopover = createSettingsPopover(
    useCustomersPageStore
)