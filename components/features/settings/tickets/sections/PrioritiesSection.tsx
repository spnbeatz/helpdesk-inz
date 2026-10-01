"use client"

import { Card } from "@/components/ui/surfaces/Card";
import { usePriorityList } from "@/queries/priorities/priorities.query";
import { AddButton } from "@/components/ui/controls/buttons/addButton";
import { Row } from "@/components/ui/layout/flex/Row";
import { Title } from "@/components/ui/typography/Title";
import { BasicTable } from "@/components/ui/data-display/BasicTable";
import { useState } from "react";
import { Selection } from "@heroui/react";

export const PrioritiesSection = () => {

    const { data: priorities } = usePriorityList();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    return (
        <Card id="priorities" className=" w-full">
            <Row CenterBetween className="w-full">
                <Title
                    title="Ticket priorities settings"
                    variant="section"
                    description="You can assign any problem to specific priority"
                />
                <Row Center>
                    <AddButton label="Add New Priority" />
                </Row>
            </Row>

            <BasicTable 
                maxHeight={200}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                selectionMode="multiple"
                columns={["ID", "Name", "Color"]}
                keys={["id", "name", "color"]}
                rows={priorities}
            />
        </Card>
    )
}