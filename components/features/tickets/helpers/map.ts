import { FilterOption } from "@/components/composed/filters/types";
import { BasicChipColorType } from "@/components/ui/data-display/BasicChip";
import { TicketCategoryType } from "@/data/categoryList";
import { TicketStatusType } from "@/data/exampleTicketsList";
import { TicketPriorityType } from "@/data/priorityList";
import { IconType } from "react-icons";
import { LuCircleCheck, LuClock, LuLoaderCircle } from "react-icons/lu";

export const mapCategoryListToSelectOptions = (categoryList?: TicketCategoryType[]): FilterOption[]  => {
    return categoryList?.map((category) => ({
        label: category.name,
        value: category.id
    })) || []
}

export const mapPriorityListToSelectOptions = (priorityList?: TicketPriorityType[]): FilterOption[] => {
    return priorityList?.map((priority) => ({
        label: priority.name,
        value: priority.id
    })) || []
}

export const ticketStatusMap: Record<TicketStatusType, string> = {
    pending: "Pending",
    in_progress: "In progress",
    resolved: "Resolved"
}

export const ticketStatusColorMap: Record<TicketStatusType, BasicChipColorType> = {
    pending: "yellow",
    in_progress: "normal",
    resolved: "green"
}

export const ticketStatusIconMap: Record<TicketStatusType, IconType> = {
    pending: LuClock,
    in_progress: LuLoaderCircle,
    resolved: LuCircleCheck
}