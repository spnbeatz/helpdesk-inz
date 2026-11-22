import { Search } from "@/components/ui/controls/inputs/Search"
import { Column, Row } from "@/components/ui/layout/flex"
import { useTableConfigStore } from "@/store/tables/tableConfig.store"
import { ListLayoutSwitch } from "../switch/ListLayoutSwitch"

export type TableViewProps = {
    createButton?: React.ReactNode,
    filterButton?: React.ReactNode,
    settingsButton?: React.ReactNode,
    onSearch?: (value: string) => void,
    leftContent?: React.ReactNode,
    tableId: string,
    table: React.ReactNode,
    grid?: React.ReactNode
}

export const TableView = ({
    createButton,
    filterButton,
    settingsButton,
    onSearch,
    leftContent,
    tableId,
    table,
    grid
}: TableViewProps) => {

    const { changeType, getType } = useTableConfigStore();

    return (
        <Column Start className="w-full h-full min-h-0 gap-2 relative">
            <Row CenterBetween className="w-full">
                {leftContent}
                <Row Center className="gap-2 ml-auto">
                    { table && grid && (
                        <ListLayoutSwitch 
                            value={getType(tableId)}
                            setValue={(type) => changeType(tableId, type)}
                        />
                    )}
                    {onSearch && <Search onSearch={onSearch}/>}
                    {filterButton}
                    {settingsButton}
                    {createButton}
                </Row>
            </Row>
            { getType(tableId) === "list" ? table : grid }
        </Column>
    )
}