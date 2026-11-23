import { ReportListItemType } from "@/data/reports/types";
import { createTableConfig } from "@/hooks/createTableConfig";
import { reportsDefaultColumns, reportsTableId } from "../config/table.config";

export const useReportsTableConfig = 
    createTableConfig<ReportListItemType>(
        reportsTableId,
        reportsDefaultColumns,
        "list"
    )