import { ReactNode } from "react";

import { useTicketsTechnicianStatistics } from "../hooks/useTechnicianTicketsStatistics";
import { technicianStatisticsCardsConfig, TechnicianStatisticsCardId } from "../config/technicianStatistics.config";


import { StatisticCard } from "@/components/ui/data-display/StatisticCard";

interface Props {
    rightContent?: Partial<
        Record<TechnicianStatisticsCardId, ReactNode>
    >;
}

export const TechnicianTicketsStatisticsCards = ({
    rightContent
}: Props) => {

    const context = useTicketsTechnicianStatistics();

    return (
        <>
            {technicianStatisticsCardsConfig.map(card => {

                const value = context[card.valueKey];
                const onClick = context[card.actionKey];

                return (
                    <StatisticCard
                        key={card.id}
                        title={card.title}
                        value={value?.toString()}
                        description={card.description(context)}
                        onClick={onClick}
                        rightContent={rightContent?.[card.id]}
                    />
                );
            })}
        </>
    );
};