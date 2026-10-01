import { Table } from "@heroui/react";
import { Selection, Checkbox } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";

export const BasicTable = ({
    maxHeight,
    selectedKeys,
    selectionMode,
    onSelectionChange,
    columns,
    rows, keys
}: {
    maxHeight?: number,
    selectedKeys?: Selection,
    selectionMode?: "multiple" | "none" | "single",
    onSelectionChange?: Dispatch<SetStateAction<Selection>>,
    columns: string[],
    rows?: any[],
    keys: string[]
}) => {
    return (
        <Table variant="secondary">
            <Table.ScrollContainer style={{ maxHeight }}>
                <Table.Content
                    className="min-w-[600px]"
                    selectedKeys={selectedKeys}
                    selectionMode={selectionMode}
                    onSelectionChange={onSelectionChange}
                >
                    <Table.Header>
                        {selectedKeys && (
                            <Table.Column isRowHeader>
                                <Checkbox aria-label="Select all" slot="selection">
                                    <Checkbox.Content>
                                        <Checkbox.Control>
                                            <Checkbox.Indicator />
                                        </Checkbox.Control>
                                    </Checkbox.Content>
                                </Checkbox>
                            </Table.Column>

                        )}
                        {columns.map((column) => (
                            <Table.Column>{column}</Table.Column>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {rows?.map((row) => (
                            <Table.Row>
                                {selectedKeys && (
                                    <Table.Cell className="pe-0">
                                        <Checkbox
                                            slot="selection"
                                            variant="secondary"
                                        >
                                            <Checkbox.Content>
                                                <Checkbox.Control>
                                                    <Checkbox.Indicator />
                                                </Checkbox.Control>
                                            </Checkbox.Content>
                                        </Checkbox>
                                    </Table.Cell>
                                )}

                                {Object.keys(row).map((key) => {
                                    if (keys.includes(key)) {
                                        return (
                                            <Table.Cell key={key}>
                                                {row[key]}
                                            </Table.Cell>
                                        );
                                    }

                                    return null;
                                })}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    )
}