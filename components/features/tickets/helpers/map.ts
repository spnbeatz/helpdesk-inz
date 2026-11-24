import { FilterOption } from "@/components/composed/filters/types";
import { TicketCategoryType } from "@/data/categoryList";

export const mapCategoryListToSelectOptions = (categoryList?: TicketCategoryType[]): FilterOption[]  => {
    return categoryList?.map((category) => ({
        label: category.name,
        value: category.id
    })) || []
}