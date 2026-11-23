"use client";

import { initialInventoryFilters } from "@/components/features/logistics/inventory/constants/filters.const";
import { OwnedEquipmentListView } from "@/components/features/logistics/owned/components/OwnedEquipmentListView";
import { useInventoryOwnedPageStore } from "@/components/features/logistics/owned/store/page.store";
import { Column } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { useAuth } from "@/providers/auth.provider";
import { useEffect } from "react";

export default function InventoryOwnedPage() {
    const setFilters = useInventoryOwnedPageStore(state => state.setFilters);

    const { user } = useAuth();

    useEffect(() => {
        setFilters({ ...initialInventoryFilters , userId: user?.id })
    }, [user]);

    return (
        <Column Start className="w-full h-full gap-4">

            <Title title="Owned items" />

            <OwnedEquipmentListView />
        </Column>
    )
}