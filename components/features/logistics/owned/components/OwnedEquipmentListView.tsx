import { TableView } from "@/components/composed/table/TableView"
import { inventoryOwnedTableId } from "../config/table.config"
import { OwnedEquipmentFilterButton } from "./OwnedEquipmentFilterButton"
import { OwnedEquipmentList } from "./OwnedEquipmentList"

export const OwnedEquipmentListView = () => {
    return (
        <TableView 
            tableId={inventoryOwnedTableId}
            filterButton={<OwnedEquipmentFilterButton />}
            table={<OwnedEquipmentList />}
        />
    )
}