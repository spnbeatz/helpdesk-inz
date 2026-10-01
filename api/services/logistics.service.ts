import { equipmentList, Equipment } from "@/data/equipments";
import { InventoryPageFiltersType } from "@/store/pages/inventory.store";

export const getEquipmentList = (filters?: InventoryPageFiltersType) => {
    let result = [...equipmentList];

    if (filters?.userId) {
        result = result.filter(
            equipment => equipment.assignedTo === filters.userId
        );
    }

    if (filters?.type) {
        result = result.filter(
            equipment => equipment.type === filters.type
        );
    }

    if (filters?.status) {
        result = result.filter(
            equipment => equipment.status === filters.status
        );
    }

    if (filters?.searchValue?.trim()) {
        const search = filters.searchValue.trim().toLowerCase();

        result = result.filter(equipment => {
            const searchableText = [
                equipment.assetTag,
                equipment.name,
                equipment.manufacturer,
                equipment.model,
                equipment.serialNumber,
                equipment.location,
                equipment.type,
                equipment.status
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(search);
        });
    }

    // Grupowanie tylko dla inventory
    let finalResult: (Equipment & { quantity?: number })[];

    if (filters?.isInventory) {
        finalResult = Object.values(
            result.reduce<Record<string, Equipment & { quantity: number }>>(
                (acc, equipment) => {
                    const key = [
                        equipment.name,
                        equipment.manufacturer,
                        equipment.model,
                        equipment.type
                    ].join("|");

                    if (!acc[key]) {
                        acc[key] = {
                            ...equipment,
                            quantity: 1
                        };
                    } else {
                        acc[key].quantity++;
                    }

                    return acc;
                },
                {}
            )
        );
    } else {
        finalResult = result;
    }

    // Sortowanie
    if (filters?.sortBy) {
        const { sortBy, sortDir = "asc" } = filters;

        finalResult.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            const comparison = String(aValue).localeCompare(
                String(bValue),
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );

            return sortDir === "desc"
                ? -comparison
                : comparison;
        });
    }

    return finalResult;
};

export const getInventoryProduct = (productId: string) => {
    const product = equipmentList.find(
        (equipment) => equipment.id === productId
    );

    return product;
};