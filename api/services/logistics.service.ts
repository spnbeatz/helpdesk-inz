import { equipmentList, Equipment } from "@/data/equipments";
import { InventoryPageFiltersType } from "@/store/pages/inventory.store";
import { ProductType, productsList } from "@/data/products";
import { LocationType, locations } from "@/data/locations";

export type EquipmentListItemType = Equipment & {
    product: ProductType;
    location: LocationType | null;
    quantity?: number;
    assignedUser: UserMinType | null
};



export const getEquipmentList = (
    filters: InventoryPageFiltersType = {}
): EquipmentListItemType[] => {
    const productMap = new Map(
        productsList.map(product => [product.id, product])
    );

    const locationMap = new Map(
        locations.map(location => [location.id, location])
    );

    const usersMap = new Map(
        usersList.map(user => [user.id, user])
    );

    // Join Equipment + Product + Location + User
    let result: EquipmentListItemType[] = equipmentList.flatMap(
        equipment => {
            const product = productMap.get(equipment.product_id);

            if (!product) return [];

            const user = equipment.assignedTo
                ? usersMap.get(equipment.assignedTo)
                : undefined;

            return [{
                ...equipment,
                product,
                location: locationMap.get(equipment.location_id) ?? null,
                assignedUser: user
                    ? {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        avatarUrl: user.avatarUrl
                    }
                    : null
            }];
        }
    );

    // Equipment IDs
    if (filters.itemIds?.length) {
        result = result.filter(item =>
            filters.itemIds!.includes(item.id)
        );
    }

    // Assigned user
    if (filters.userId !== undefined) {
        result = result.filter(
            item => item.assignedTo === filters.userId
        );
    }

    // Product type
    if (filters.type) {
        result = result.filter(
            item => item.product.type === filters.type
        );
    }

    // Equipment status
    if (filters.status && filters.status !== "all") {
        result = result.filter(
            item => item.status === filters.status
        );
    }

    // Location
    if (filters.locationId) {
        result = result.filter(
            item => item.location_id === filters.locationId
        );
    }

    // Search
    if (filters.searchValue?.trim()) {
        const search = filters.searchValue.trim().toLowerCase();

        result = result.filter(item => {
            const searchableText = [
                item.id,
                item.product_id,
                item.assetTag,
                item.serialNumber,
                item.product.name,
                item.product.manufacturer,
                item.product.model,
                item.product.type,
                item.location?.name,
                item.location?.city,
                item.room,
                item.assignedUser?.name,
                item.status
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(search);
        });
    }

    // Sort
    if (filters.sortBy) {
        const { sortBy, sortDir = "asc" } = filters;

        const getSortValue = (
            item: EquipmentListItemType
        ): string => {
            switch (sortBy) {
                case "name":
                    return item.product.name;

                case "manufacturer":
                    return item.product.manufacturer;

                case "model":
                    return item.product.model;

                case "type":
                    return item.product.type;

                case "assignedUser":
                    return item.assignedUser?.name ?? "";

                default:
                    return String(
                        item[sortBy as keyof Equipment] ?? ""
                    );
            }
        };

        result.sort((a, b) => {
            const comparison = getSortValue(a).localeCompare(
                getSortValue(b),
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

    return result;
};

export const getInventoryProduct = (productId?: string) => {
    if (!productId) return null;
    const product = equipmentList.find(
        (equipment) => equipment.id === productId
    );

    return product;
};

import { EquipmentType } from "@/data/equipments";
import { UserMinType, usersList } from "@/data/users";

export type ProductsFiltersType = {
    searchValue?: string;
    type?: EquipmentType;
    activeOnly?: boolean;
    productId?: string
};

export const getProduct = (productId: string) => {
    return getProductsList({ productId })[0];
}

export const getProductsList = (
    filters: ProductsFiltersType = {}
): ProductType[] => {
    let result = [...productsList];

    if (filters.activeOnly !== false) {
        result = result.filter(product => product.is_active);
    }

    if (filters.type) {
        result = result.filter(
            product => product.type === filters.type
        );
    }

    if (filters.searchValue?.trim()) {
        const search = filters.searchValue.trim().toLowerCase();

        result = result.filter(product =>
            [
                product.name,
                product.manufacturer,
                product.model,
                product.type
            ]
                .join(" ")
                .toLowerCase()
                .includes(search)
        );
    }

    return result;
};