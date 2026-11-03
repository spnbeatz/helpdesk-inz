"use client"

import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Column, Row } from "@/components/ui/layout/flex";
import { Title } from "@/components/ui/typography/Title";
import { LuShoppingBag } from "react-icons/lu";
import { useModalStore } from "@/store/modals";
import { OrdersList } from "@/components/features/logistics/components/orders/OrdersList";
import { Select } from "@/components/ui/controls/inputs/Select";
import { useOrdersPageStore } from "@/store/pages/orders.store";
import { OrderStatus } from "@/data/orders_old";

export default function OrdersPage() {

    const { openModal } = useModalStore();
    const { setFilters, filters } = useOrdersPageStore();

    const handleOpenCreateOrderModal = () => {
        openModal("createOrder");
    }

    return (
        <Column Start className="w-full h-full gap-4">
            <Row CenterBetween className="w-full">
                <Title title="Orders" />
                <Row Center className="gap-2">
                    <Select 
                        className="w-[150px]"
                        placeholder="Select status"
                        options={[
                            { id: "all", textValue: "All orders"},
                            { id: "pending", textValue: "Pending"},
                            { id: "declined", textValue: "Declined"},
                            { id: "accepted", textValue: "Accepted"},
                            { id: "in_progress", textValue: "In Progress"},
                            { id: "completed", textValue: "Completed"}
                        ]}
                        defaultValue={filters.status}
                        onChange={(value) => setFilters({status: value as OrderStatus | "all"})}
                    />
                    <IconButton 
                        Icon={LuShoppingBag} 
                        iconColor="#ffffffaa"
                        onClick={handleOpenCreateOrderModal}
                        className="bg-indigo-500/60 text-white/80"
                    >
                            Create order
                    </IconButton>
                </Row>
            </Row>
            <OrdersList />
        </Column>
    )
}




