"use client"

import { Card } from "@/components/ui/surfaces/Card";
import { Title } from "@/components/ui/typography/Title";
import { useCategotyList } from "@/queries/categories/categories.query";
import { useState } from "react";
import type { Selection } from "@heroui/react";
import { Row } from "@/components/ui/layout/flex";
import { AddButton } from "@/components/ui/controls/buttons/addButton";
import { BasicTable } from "@/components/ui/data-display/BasicTable";


export const CategoriesSection = () => {

    const { data: categories } = useCategotyList();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    return (
        <Card id="categories" className="w-full">
            <Row CenterBetween className="w-full">
                <Title 
                    title="Ticket categories settings" 
                    variant="section" 
                    description="You can assign any problem to specific category"
                />
                <Row Center>
                    <AddButton label="Add New Category" />
                </Row>
            </Row>

            <BasicTable 
                maxHeight={200}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                selectionMode="multiple"
                columns={["ID", "Name", "Description"]}
                keys={["id", "name", "description"]}
                rows={categories}
            />

        </Card>
    )
}