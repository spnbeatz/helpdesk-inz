"use client"

import { Title } from "@/components/ui/typography/Title";
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { Column } from "@/components/ui/layout/flex/Column";
import { SwitchLocation } from "@/components/features/logistics/components/SwitchLocation";
import { useAuth } from "@/providers/auth.provider";
import { useEffect } from "react";
import { ProductList } from "@/components/features/logistics/components/inventory/ProductList";
import { ProductsListSettingsPopover } from "@/components/features/logistics/components/inventory/ProductsListSettingsPopover";
import { ProductsFilterButton } from "@/components/features/logistics/components/inventory/ProductsFilterButton";
import { useCallback } from "react";
import { TableView } from "@/components/composed/table/TableView";
import { inventoryTableId } from "@/components/features/logistics/config/inventoryTableColumns";
import { ProductAddButton } from "@/components/features/logistics/components/inventory/ProductAddButton";

export default function InventoryPage() {

    const { setFilters } = useInventoryPageStore();
    const { user } = useAuth();

    useEffect(() => setFilters({ locationId: user?.location_id }), []);

    const onSearch = useCallback((value: string) => {
        setFilters({ searchValue: value, page: 1 });
    }, [setFilters]);

    return (
        <Column Start className="w-full h-full gap-4 relative">
            <Title variant="site"
                title="Inventory"
                description="List of available products"
            />
            <TableView 
                tableId={inventoryTableId}
                leftContent={<SwitchLocation />}
                onSearch={onSearch}
                filterButton={<ProductsFilterButton/>}
                settingsButton={<ProductsListSettingsPopover/>}
                createButton={<ProductAddButton />}
                table={<ProductList />}
            />
        </Column>
    )
}
