import { Section } from "@/components/ui/surfaces/Section";
import { Ticket } from "@/components/features/tickets/components/Ticket";
import { useOrderDetails } from "../../context/OrderDetailsProvider";
import { useTicket } from "@/queries/tickets/tickets.query";
import { TicketListItemType } from "@/api/services/tickets.service";
import { Description, Label } from "@heroui/react";
import { Column, Row } from "@/components/ui/layout/flex";
import { User } from "@/components/features/users/components/User";
import { Grid } from "@/components/ui/layout/Grid";
import { ProductChip } from "./ProductChip";
import { formatRelativeDate } from "@/utils/date..util";

export const OrderDetails = () => {

    const { order } = useOrderDetails();
    const { data: ticket } = useTicket(order?.ticket_id);

    return (
        <Section title="OrderDetails" className="rounded-lg bg-white shadow-sm p-6 col-span-3 row-span-1 gap-4">
            <Column StartBetween className="gap-8 h-full">
                <Grid cols={3} gap={2}>
                    <Column Start className="w-full gap-2">
                        <Label>Requested by</Label>
                        <User
                            source={order?.created_by?.avatarUrl ?? ""}
                            name={order?.created_by?.name}
                            description={formatRelativeDate(order?.created_at || "")}
                        />
                    </Column>

                    {order?.reviewed_by_id && (
                        <Column Start className="w-full gap-2">
                            <Label>Revieved by</Label>
                            <User
                                source={order?.reviewed_by?.avatarUrl ?? ""}
                                name={order?.reviewed_by?.name}
                                description={formatRelativeDate(order.reviewed_at || "")}
                            />
                        </Column>
                    )}
                    <Column Start className="w-full gap-2">
                        <Label>Recipient</Label>
                        <User
                            source={order?.recipient?.avatarUrl ?? ""}
                            name={order?.recipient?.name}
                            description="User"
                        />
                    </Column>
                </Grid>

                <Column Start className="gap-2 w-full">
                    <Label>Reason</Label>
                    <Description className="text-sm">{order?.reason}</Description>
                </Column>
                <Column Start className="gap-2 w-full">
                    <Label>Required items</Label>
                    <Row Start className="w-full flex-wrap gap-2">
                        
                        {order?.items.map((item) => (
                            <ProductChip item={item} />
                        ))}
                    </Row>

                </Column>

                <Column Start className="gap-2 w-full">
                    <Label>Ticket details</Label>
                    {ticket && <Ticket ticket={ticket as TicketListItemType} />}
                </Column>

            </Column>

        </Section>
    )
}
