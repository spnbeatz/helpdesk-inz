import { Key } from "@heroui/react";
import { useOrdersPageStore } from "@/store/pages/orders.store";

export const useCreateOrderProducts = () => {
    const { createData, setCreateData } = useOrdersPageStore();

    const selectedProductIds = createData.products.map(
        (product) => product.item_id
    );

    const selectProducts = (keys: Key[]) => {
        const selectedIds = keys.map(String);

        const existingProducts = createData.products.filter(
            (product) => selectedIds.includes(product.item_id)
        );

        const newProducts = selectedIds
            .filter(
                (id) =>
                    !createData.products.some(
                        (product) => product.item_id === id
                    )
            )
            .map((item_id) => ({
                item_id,
                quantity: 1,
            }));

        setCreateData({
            products: [...existingProducts, ...newProducts],
        });
    };

    const removeProduct = (productId: string) => {
        setCreateData({
            products: createData.products.filter(
                (product) => product.item_id !== productId
            ),
        });
    };

    const changeQuantity = (
        productId: string,
        quantity: number
    ) => {
        if (!Number.isInteger(quantity) || quantity < 1) {
            return;
        }

        setCreateData({
            products: createData.products.map((product) =>
                product.item_id === productId
                    ? { ...product, quantity }
                    : product
            ),
        });
    };

    return {
        products: createData.products,
        selectedProductIds,
        selectProducts,
        removeProduct,
        changeQuantity,
    };
};