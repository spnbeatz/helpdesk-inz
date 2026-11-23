import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";
import { useReportsPageStore } from "../store/page.store";
import { useReportsTableConfig } from "../store/table.store";
import { reportsTableColumns } from "../config/table.config";

export const ReportsSettingsPopover = createSettingsPopover(
    useReportsPageStore,
    useReportsTableConfig,
    reportsTableColumns
)