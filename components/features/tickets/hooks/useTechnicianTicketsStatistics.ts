import { useContext } from "react";
import { TicketsTechnicianStatisticsContext } from "../context/technicianStatistics.context";


export const useTicketsTechnicianStatistics = () => {
    const context = useContext(TicketsTechnicianStatisticsContext);

    if (!context) {
        throw new Error(
            "useTicketsTechnicianStatistics must be used within TicketsTechnicianStatisticsProvider"
        );
    }

    return context;
};