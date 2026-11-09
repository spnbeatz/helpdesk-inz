import { Section } from "@/components/ui/surfaces/Section";
import { useOrderDetails } from "../../context/OrderDetailsProvider";
import { Column, Row } from "@/components/ui/layout/flex";
import { OrderHistoryType, OrderStatus } from "@/data/orders/types";
import { Description, Label } from "@heroui/react";
import { formatRelativeDate } from "@/utils/date..util";
import { User } from "@/components/features/users/components/User";
import { useCustomer } from "@/queries/customers/customers.query";
import { useEffect } from "react";

export const OrderLifecycle = () => {
    const { order } = useOrderDetails();
    return (
        <Section title="Order lifecycle" className="bg-white rounded-lg shadow-sm 
        p-6 col-span-1 gap-4">
            <Column StartBetween className="h-full w-full">
                <OrderStatusProgress history={order?.history} />
                <WhatIsNextStatus />
            </Column>

        </Section>

    )
}
const statusName: Record<OrderStatus, string> = {
    pending: "Pending",
    accepted: "Accepted",
    in_progress: "In Progress",
    completed: "Completed",
    declined: "Declined"
};

export const OrderStatusProgress = ({
    history
}: {
    history?: OrderHistoryType[]
}) => {
    const isDone = (status: OrderStatus) => {
        return !!history?.some(item => item.new_status === status);
    };

    const getCurrentStatusDetails = (status: OrderStatus): OrderHistoryType | null => {
        return history?.find((item) => item.new_status === status) || null
    }

    const normalPath: OrderStatus[] = [
        "pending",
        "accepted",
        "in_progress",
        "completed"
    ];

    const declinedPath: OrderStatus[] = [
        "pending",
        "declined"
    ];

    const path = isDone("declined")
        ? declinedPath
        : normalPath;

    return (
        <Column StartCenter className="w-full pl-6">

            {path.map((status, index) => {
                const done = isDone(status);
                const isLast = index === path.length - 1;
                const currentStatusDetails = getCurrentStatusDetails(status);

                return (
                    <Row
                        key={status}
                        Start
                        className={`gap-4 ${!isLast ? "min-h-[100px]" : "min-h-[40px]"}`}
                    >

                        <div className="flex flex-col items-center self-stretch">

                            <div
                                className={`
                                    rounded-full shrink-0 w-4 h-4 shadow-sm
                                    ${done
                                        ? " bg-indigo-400/60"
                                        : " bg-gray-400/60"
                                    }
                                `}
                            />

                            {!isLast && (
                                <div
                                    className={`
                                        w-0.5 flex-1 min-h-4 my-2 shadow-sm
                                        ${done
                                            ? "bg-indigo-400/60"
                                            : "bg-gray-400/60"
                                        }
                                    `}
                                />
                            )}
                        </div>

                        <Column Start className="gap-1">
                            <Label className={`text-black/60 ${!done && "font-normal"}`}>{statusName[status]}</Label>
                            {currentStatusDetails && <StatusProgressDetails statusDetails={currentStatusDetails} />}
                        </Column>
                    </Row>
                );
            })}
        </Column >
    );
};

export const StatusProgressDetails = ({ statusDetails }: { statusDetails: OrderHistoryType }) => {
    useEffect(() => console.log(statusDetails), [])
    return (
        <Column Start className="gap-1 ml-4 mb-4">
            <User
                source={statusDetails.changed_by?.avatarUrl || undefined}
                name={statusDetails.changed_by?.name}
                description={formatRelativeDate(statusDetails.created_at)}
                size="small"
            />
            <Description>{statusDetails.comment}</Description>
        </Column>
    )
}

export const WhatIsNextStatus = () => {
    return (
        <Column className="w-full rounded-lg bg-indigo-200  p-2 shadow-sm">
            <Label className="text-indigo-800">{"What's next?"}</Label>
        </Column>
    )
}