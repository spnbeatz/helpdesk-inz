import { priorityList, TicketPriorityType } from "@/data/priorityList";

export const getPriorityList = (): TicketPriorityType[] => {
    return priorityList;
}