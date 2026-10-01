"use client"

import { AddButton } from "@/components/ui/controls/buttons/addButton";
import { Search } from "@/components/ui/controls/inputs/Search";
import { Title } from "@/components/ui/typography/Title";
import { ProductListFilterButton } from "@/components/features/logistics/components/ProductListFilterButton";
import { ProtectedComponent } from "@/components/misc/ProtectedComponent";
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { Column } from "@/components/ui/layout/flex/Column";
import { Row } from "@/components/ui/layout/flex/Row";
import { ProductListSection } from "@/components/features/logistics/sections/ProductListSection";

export default function InventoryPage() {

    const { setFilters } = useInventoryPageStore();
    
    return (
        <Column Start className="w-full h-full relative">
            <Row CenterBetween className="w-full">
                <Title variant="site"
                    title="Inventory"
                    description="List of available products"
                />
                <Row Center className="gap-2">
                    <Search onSearch={(v) => setFilters({searchValue: v})} />
                    <ProductListFilterButton />
                    <ProtectedComponent roles={["admin", "technician"]}>
                        <AddButton label="Add new product" />
                    </ProtectedComponent>
                </Row>
            </Row>
            <ProductListSection />
        </Column>
    )
}
