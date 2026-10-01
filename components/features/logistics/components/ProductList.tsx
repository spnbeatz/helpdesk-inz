import { useState } from "react";
import { Equipment } from "@/data/equipments";
import { useEquipmentList } from "@/queries/logistics/logistics.query";
import { Selection, Table } from "@heroui/react";
import { PaginationBasic } from "../../../ui/data-display/PaginationBasic";
import { Checkbox } from "@heroui/react";
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { highlightText } from "@/helpers/highlightText";
import { useModalStore } from "@/store/modals";
import { Column } from "../../../ui/layout/flex";

type InventoryItem = Equipment & {
    quantity?: number;
};

type InventoryColumn = {
    id: keyof InventoryItem;
    name: string;
};

export const ProductList = () => {

    const [page, setPage] = useState<number>(1);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
    const { filters, setFilters, itemsPerPage } = useInventoryPageStore();
    const { openModal } = useModalStore();

    const { data: productList } = useEquipmentList(filters);

    const getPaginatedProducts = (
        products: (Equipment & {
            quantity?: number;
        })[] | undefined,
        page: number
    ) => {
        if (!products) return [];

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return products.slice(startIndex, endIndex);
    }

    const columns: InventoryColumn[] = [
        { id: "id", name: "ID" },
        { id: "assetTag", name: "Asset Tag" },
        { id: "name", name: "Name" },
        { id: "type", name: "Type" },
        { id: "model", name: "Model" },
        { id: "serialNumber", name: "Serial Number" },
        { id: "status", name: "Status" },

        ...(filters.userId === null
            ? []
            : [{ id: "assignedTo" as keyof InventoryItem, name: "User ID" }]),

        ...(filters.isInventory
            ? [{ id: "quantity" as keyof InventoryItem, name: "Quantity" }]
            : []),
    ];

    const handleOpenItemModal = (productId: string) => {
        openModal("inventoryItem", { productId });
        setSelectedKeys(new Set());
    }

    return (
        <Column className="w-full h-full min-h-0 gap-4 pt-4">
            <Table variant="secondary" className="h-full">
                <Table.ScrollContainer className="flex-1 min-h-0">
                    <Table.Content
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        selectionMode="multiple"
                    >
                        <Table.Header>
                            <Table.Column className={"bg-white/60 py-4"}>
                                <Checkbox aria-label="Select all" slot="selection">
                                    <Checkbox.Content>
                                        <Checkbox.Control>
                                            <Checkbox.Indicator />
                                        </Checkbox.Control>
                                    </Checkbox.Content>
                                </Checkbox>
                            </Table.Column>
                            {columns.map((column) => (
                                <Table.Column
                                    allowsSorting
                                    className={"bg-white/60 py-4"}
                                    isRowHeader={column.id === "name"}
                                    onClick={() => {
                                        setFilters({
                                            sortBy: column.id,
                                            sortDir:
                                                filters.sortBy === column.id
                                                    ? filters.sortDir === "asc"
                                                        ? "desc"
                                                        : "asc"
                                                    : "asc",
                                        });
                                    }}
                                >
                                    <Table.SortableColumnHeader
                                        sortDirection={
                                            filters.sortBy === column.id ?
                                                filters.sortDir === "asc" ? "ascending" : "descending"
                                                :
                                                "descending"
                                        }
                                    >
                                        {column.name}

                                    </Table.SortableColumnHeader>

                                </Table.Column>
                            ))}
                        </Table.Header>
                        <Table.Body items={getPaginatedProducts(productList ?? [], page)}>
                            {(product) => (
                                <Table.Row>
                                    <Table.Collection>
                                        <Table.Cell className="pe-0"
                                            onClick={(e) => e.stopPropagation()}
                                        >
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
                                        {columns.map((column) => (
                                            <Table.Cell key={column.id} 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenItemModal(product.id)
                                            }}>
                                                {highlightText(
                                                    product[column.id as keyof typeof product],
                                                    filters.searchValue
                                                )}
                                            </Table.Cell>
                                        ))}
                                    </Table.Collection>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer>
                    <PaginationBasic
                        page={page}
                        setPage={setPage}
                        totalItems={productList?.length ?? 0}
                        itemsPerPage={itemsPerPage}
                    />
                </Table.Footer>
            </Table>
        </Column>

    )
}