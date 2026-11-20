import { createContext } from "react";
import { ITicketsTechnicianStatisticsContext } from "../types/technicianStatistics.types";


export const TicketsTechnicianStatisticsContext =
    createContext<ITicketsTechnicianStatisticsContext | undefined>(undefined);