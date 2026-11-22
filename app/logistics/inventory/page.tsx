"use client"

import { Title } from "@/components/ui/typography/Title";
import { useInventoryPageStore } from "@/components/features/logistics/inventory/store/page.store";
import { Column } from "@/components/ui/layout/flex/Column";
import { SwitchLocation } from "@/components/features/logistics/inventory/components/SwitchLocation";
import { useAuth } from "@/providers/auth.provider";
import { useEffect } from "react";
import { ProductList } from "@/components/features/logistics/inventory/components/ProductList";
import { ProductsListSettingsPopover } from "@/components/features/logistics/inventory/components/ProductsListSettingsPopover";
import { ProductsFilterButton } from "@/components/features/logistics/inventory/components/ProductsFilterButton";
import { useCallback } from "react";
import { TableView } from "@/components/composed/table/TableView";
import { inventoryTableId } from "@/components/features/logistics/inventory/config/table.config";
import { ProductAddButton } from "@/components/features/logistics/inventory/components/ProductAddButton";

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
