"use client"

import { useState } from "react";
import { useProductsList } from "@/queries/logistics/logistics.query";
import { useCreateOrderProducts } from "../../../hooks/useCreateOrderProducts";

import { Section } from "@/components/ui/surfaces/Section";
import { Column } from "@/components/ui/layout/flex";
import { Autocomplete } from "@/components/ui/controls/inputs/Autocomplete";
import { OrderProductsSelectedList } from "./OrderProductsSelectedList";
import { OrderProductSearchItem } from "./OrderProductSearchItem";

export const OrderProductsSelector = () => {

    const {
        selectProducts,
        selectedProductIds,
    } = useCreateOrderProducts();

    const [searchValue, setSearchValue] = useState("");

    const { data: productList = [] } = useProductsList({
        searchValue
    });


    return (
        <Section title="Select products">
            <Column Start className="w-full gap-4">
                <Autocomplete
                    selectionMode="multiple"
                    value={selectedProductIds}
                    placeholder="Select products"
                    onChange={selectProducts}
                    triggerText="Search products..."
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    items={productList}
                    getItemId={(item) => item.id}
                    renderItem={(item) => (
                        <OrderProductSearchItem product={item} />
                    )}
                />
                <OrderProductsSelectedList />
            </Column>
        </Section>
    );
};