"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { CustomersList } from "@/components/features/customers/components/CustomersList";
import { useCustomersPageStore } from "@/store/pages/customers.store";
import { CustomersFilterButton } from "@/components/features/customers/components/CustomersFilterButton";
import { CustomersSettingsPopover } from "@/components/features/customers/components/CustomersSettingsPopover";
import { TableView } from "@/components/composed/table/TableView";
import { customersTableId } from "@/components/features/customers/config/customerTable.config";
import { useCallback } from "react";

export default function CustomersPage() {

    const setFilters = useCustomersPageStore(state => state.setFilters);

    const onSearch = useCallback((value: string) => {
        setFilters({searchValue: value})
    },[setFilters])

    return (
        <Column StartBetween className="gap-4 h-full">
            <Title
                title={"Customers & Technicians"}
                description={"Here you can find contact to any person or interact depends on role"}
            />
            <TableView 
                tableId={customersTableId}
                onSearch={onSearch}
                filterButton={<CustomersFilterButton />}
                settingsButton={<CustomersSettingsPopover/>}
                table={<CustomersList />}
            />
        </Column>
    )
}
