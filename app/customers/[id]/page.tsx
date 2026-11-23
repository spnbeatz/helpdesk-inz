"use client"

import { Row, Column } from "@/components/ui/layout/flex";
import { Avatar, Description } from "@heroui/react";
import { useCustomer } from "@/components/features/customers/queries/query";
import { BackButton } from "@/components/ui/controls/buttons/BackButton";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/surfaces/Section";
import { LuBuilding, LuDot, LuMail, LuPhone } from "react-icons/lu";
import { CustomerTabs } from "@/components/features/customers/components/CustomerTabs";
import { useEffect } from "react";
import { useInventoryOwnedPageStore } from "@/components/features/logistics/owned/store/page.store";
import { initialInventoryFilters } from "@/components/features/logistics/inventory/constants/filters.const";

export default function CustomerInfoPage() {
    const params = useParams<{ id: string }>();
    const { data: customer } = useCustomer(params.id);

    const setFilters = useInventoryOwnedPageStore(state => state.setFilters);

    useEffect(() => {
        setFilters({ ...initialInventoryFilters, userId: params.id })
    }, [params]);

    if (!customer) return null;
    return (
        <Column Start className="w-full h-full gap-4">
            <Row CenterBetween className="w-full">
                <Row Center className="gap-4">
                    <BackButton />
                    <Row Center className="gap-4">
                        <Avatar className="w-9 h-9 rounded-lg">
                            <Avatar.Image src={"https://tse1.explicit.bing.net/th/id/OIP.UirWc-_agU3sLXPag8vCUQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"} alt={customer?.name.slice(0, 1)} />
                        </Avatar>
                        <Column StartCenter>
                            <div className="text-xl text-black/70 font-semibold">{customer?.name}</div>
                            <Row Center className="gap-1 text-xs text-black/50">{customer.position} <LuDot /> {customer.locationName}</Row>
                        </Column>

                    </Row>

                </Row>
                <Row Center className="gap-4">
                    <Row CenterStart className="gap-2 text-sm rounded-lg shadow-sm px-3 py-1 bg-white/60"><LuBuilding />Department</Row>
                    <a
                        href={`mailto:${customer.email}`}
                    >
                        <Row CenterStart className="gap-2 text-sm rounded-lg shadow-sm px-3 py-1 bg-white/60">
                            <LuMail />{customer.email}
                        </Row>
                    </a>
                    <Row CenterStart className="gap-2 text-sm rounded-lg shadow-sm px-3 py-1 bg-white/60" ><LuPhone />{customer.phone}</Row>
                </Row>
            </Row>
            <CustomerTabs />
        </Column>
    )
}