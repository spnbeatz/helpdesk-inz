import { TableView } from "@/components/composed/table/TableView";
import { useReportsPageStore } from "../store/page.store";
import { useCallback } from "react";
import { reportsTableId } from "../config/table.config";
import { ReportsListFilterButton } from "./ReportsListFilterButton";
import { ReportsSettingsPopover } from "./ReportsSettingsPopover";
import { ReportsTable } from "./ReportsTable";
import { Label } from "@heroui/react";

export const ReportsTableView = () => {

    const setFilters = useReportsPageStore(state => state.setFilters);

    const onSearch = useCallback((value: string) => {
        setFilters({ searchValue: value })
    }, [setFilters])

    return (
        <TableView 
            leftContent={<Label>Last reports</Label>}
            tableId={reportsTableId}
            onSearch={onSearch}
            filterButton={<ReportsListFilterButton />}
            settingsButton={<ReportsSettingsPopover />}
            table={<ReportsTable/>}
        />
    )
}