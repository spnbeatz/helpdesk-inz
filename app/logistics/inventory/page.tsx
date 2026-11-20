"use client"

import { AddButton } from "@/components/ui/controls/buttons/addButton";
import { Search } from "@/components/ui/controls/inputs/Search";
import { Title } from "@/components/ui/typography/Title";
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { Column } from "@/components/ui/layout/flex/Column";
import { Row } from "@/components/ui/layout/flex/Row";
import { useAccess } from "@/providers/access.provider";
import { SwitchLocation } from "@/components/features/logistics/components/SwitchLocation";
import { useAuth } from "@/providers/auth.provider";
import { useEffect } from "react";
import { ProductList } from "@/components/features/logistics/components/inventory/ProductList";
import { ProductsListSettingsPopover } from "@/components/features/logistics/components/inventory/ProductsListSettingsPopover";
import { ProductsFilterButton } from "@/components/features/logistics/components/inventory/ProductsFilterButton";
import { useCallback } from "react";

export default function InventoryPage() {

    const { setFilters } = useInventoryPageStore();
    const { hasPermission } = useAccess();
    const { user } = useAuth();

    useEffect(() => setFilters({ locationId: user?.location_id }), []);

    const handleSearch = useCallback((value: string) => {
        setFilters({ searchValue: value, page: 1 });
    }, [setFilters]);

    return (
        <Column Start className="w-full h-full relative">
            <Row CenterBetween className="w-full">
                <Title variant="site"
                    title="Inventory"
                    description="List of available products"
                />
                <Row Center className="gap-2">
                    <SwitchLocation />
                    <Search onSearch={handleSearch} />
                    <ProductsFilterButton />
                    <ProductsListSettingsPopover />
                    {hasPermission("equipment.create") && <AddButton label="Add new product" />}
                </Row>
            </Row>
            <ProductList />
        </Column>
    )
}
