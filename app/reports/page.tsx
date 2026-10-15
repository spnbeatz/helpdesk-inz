"use client"

import { TableWithPagination } from "@/components/ui/data-display/TableWithPagination";
import { Column, Row } from "@/components/ui/layout/flex";
import { Section } from "@/components/ui/surfaces/Section";
import { Title } from "@/components/ui/typography/Title";
import { Button, Description, Label } from "@heroui/react";
import { Search } from "@/components/ui/controls/inputs/Search";
import { useState } from "react";
import { createReportCards } from "@/config/reports";
import { Grid } from "@/components/ui/layout/Grid";
import { LuChevronRight, LuDot } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function ReportsPage() {

    const [searchValue, setSearchValue] = useState<string>("");

    const handleOnSearch = (value: string) => {
        setSearchValue(value)
    }
    return (
        <Column StartBetween className="gap-4 h-full">
            <Row CenterBetween>
                <Title title="Reports" description="You can generate any report and print it!" />
            </Row>
            <Column StartBetween className="w-full h-full gap-4">
                <Section title="Create report">
                    <Grid cols={3} gap={4}>
                        {createReportCards.map((card) => (
                            <CreateReportCard {...card} />
                        ))}
                    </Grid>
                </Section>

                <Column Start className="w-full gap-2">
                    <Section
                        title="Your last reports"
                        rightContent={(
                            <Row Center>
                                <Search
                                    onSearch={handleOnSearch}
                                />
                            </Row>
                        )}
                    >
                        <TableWithPagination
                            data={[]}
                            columns={[
                                { id: "id", name: "ID" },
                                { id: "title", name: "Report Title" },
                                { id: "type", name: "Report Type" },
                                { id: "createdAt", name: "Creation date" },
                            ]}
                            itemsPerPage={5}
                        />
                    </Section>
                </Column>

            </Column>
        </Column>
    )
}

export type CreateReportCardProps = {
    id: string,
    title: string,
    description?: string,
    imageUrl?: string,
    href: string,
    includes: string[],
    color: string
}


export const CreateReportCard = ({ title, description, imageUrl, id, href, includes,color }: CreateReportCardProps) => {
    const router = useRouter();

    return (
        <Column StartBetween className="w-full p-6 bg-white/60 shadow-sm rounded-lg relative gap-2" onClick={() => router.push(href)}>
            <Column Start className="gap-2">
                <Label>{title}</Label>
                <Description >{description}</Description>
            </Column>
            <LuChevronRight className="absolute right-6 top-6" />
            <Grid cols={2} className={`p-2 border-2 w-full rounded-md gap-4`}
                style={{
                    backgroundColor: `color-mix(in oklab, var(--color-${color}-400) 5%, transparent)`,
                    borderColor: `color-mix(in oklab, var(--color-${color}-400) 20%, transparent)`,
                    
                }}
            >
                {includes.map((item) => (
                    <Row CenterStart className="gap-1">
                        <LuDot className="text-muted"/>
                        <Description>{item}</Description>
                    </Row>
                ))}
            </Grid>
        </Column>
    )
}