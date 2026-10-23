"use client"

import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { CustomersList } from "@/components/features/customers/components/CustomersList";
import { Search } from "@/components/ui/controls/inputs/Search";
import { useCustomersPageStore } from "@/store/pages/customers.store";

export default function CustomersPage() {

    const { setFilters } = useCustomersPageStore();

    return (
        <Column StartBetween className="gap-4 h-full">
            <Row StartBetween className="w-full">
                <Title
                    title={"Customers & Technicians"}
                    description={"Here you can find contact to any person or interact depends on role"}
                />
                <Row Center className="gap-2">
                    <Search onSearch={(v) => setFilters({searchValue: v})}/>
                </Row>
            </Row>
            <CustomersList />
        </Column>
    )
}
