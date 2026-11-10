"use client"

import { useAuth } from "@/providers/auth.provider";
import { useTicketList } from "@/queries/tickets/tickets.query";
import { useState } from "react";
import { useCreateOrderTicket } from "../../../hooks/useCreateOrderTicket";

import { Section } from "@/components/ui/surfaces/Section";
import { Column, Row } from "@/components/ui/layout/flex";
import { Key, Description, Label } from "@heroui/react";
import { Autocomplete } from "@/components/ui/controls/inputs/Autocomplete";

import { SelectedOrderTicket } from "./SelectedOrderTicket";

export const OrderTicketSelector = () => {

    const { user } = useAuth();

    const { selectTicket, selectedTicketId } = useCreateOrderTicket();

    const [searchValue, setSearchValue] = useState<string>("");
    const { data: ticketList = [] } = useTicketList({ searchValue, technicianId: user?.id, status: "new" })

    return (
        <Section title="Assign ticket" className="h-full">
            <Column Start className="w-full h-full gap-4">
                <Autocomplete
                    items={ticketList}
                    selectionMode="single"
                    value={selectedTicketId as Key}
                    onChange={(v: Key | null) => selectTicket(v as string)}
                    triggerText="Search ticket..."
                    placeholder="Search ticket"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    getItemId={(item) => item.id}
                    renderItem={(item) => (
                        <Row CenterBetween className="gap-2 w-full">
                            <Label>{item.title}</Label>
                            <Description>{item.id}</Description>
                        </Row>
                    )}
                />
                <SelectedOrderTicket />
            </Column>
        </Section>
    )
}