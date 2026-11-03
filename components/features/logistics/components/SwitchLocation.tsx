"use client";
;
import { useInventoryPageStore } from "@/store/pages/inventory.store";
import { Row } from "@/components/ui/layout/flex/Row";
import { useAuth } from "@/providers/auth.provider";
import { useInventoryTableConfig } from "@/store/tables/tableConfig.store";
import { Button } from "@/components/ui/controls/buttons/Button";

export const SwitchLocation = () => {
    const { filters, setFilters } = useInventoryPageStore();
    const { user } = useAuth();
    const { addColumn, removeColumn } = useInventoryTableConfig();
    const handleSetLocation = (locationId?: string) => {
    if (locationId) {
        removeColumn("location");
    } else {
        addColumn("location");
    }

    setFilters({ locationId });
};

    return (
        <Row Center className="gap-2">
            <Button 
                variant="outline" 
                isDisabled={filters.locationId === user?.location_id}
                onClick={() => handleSetLocation(user?.location_id)}
            >
                My location
            </Button>
            <Button 
                variant="outline" 
                isDisabled={filters.locationId === undefined || filters.locationId === null}
                onClick={() => handleSetLocation()}
            >
                All locations
            </Button>
        </Row>
    )
}
