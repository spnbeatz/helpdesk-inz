import { OrderHistoryType, OrderStatus } from "@/data/orders/types";
import { ORDER_DECLINED_PATH, ORDER_NORMAL_PATH, ORDER_STATUS_LABELS } from "../../../constants/order.constants";
import { Column, Row } from "@/components/ui/layout/flex";
import { Label } from "@heroui/react";
import { OrderStatusProgressDetails } from "./OrderStatusProgressDetails";

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

    const path = isDone("declined")
        ? ORDER_DECLINED_PATH
        : ORDER_NORMAL_PATH;

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
                        className={`gap-4 ${!isLast ? "min-h-25" : "min-h-10"}`}
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
                            <Label className={`text-black/60 ${!done && "font-normal"}`}>{ORDER_STATUS_LABELS[status]}</Label>
                            {currentStatusDetails && <OrderStatusProgressDetails statusDetails={currentStatusDetails} />}
                        </Column>
                    </Row>
                );
            })}
        </Column >
    );
};