import { useCustomer } from "@/queries/customers/customers.query";
import { Description } from "@heroui/react";
import { Column } from "@/components/ui/layout/flex";
import { User } from "../../users/components/User";

export const TechnicianInfo = ({ technicianId }: { technicianId: string | null }) => {

    const { data: technicianData } = useCustomer(technicianId);

    if (!technicianData && technicianId === null) return (
        <Description>Not assigned</Description>
    )

    return (
        <Column Start className="gap-2">
            <Description>Assigned to</Description>
            <User
                name={technicianData?.name}
                description="Technician"
                source={technicianData?.avatarUrl}
            />
        </Column>
    )
}