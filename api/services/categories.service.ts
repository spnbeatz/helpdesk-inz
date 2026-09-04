import { categoryList, TicketCategoryType } from "@/data/categoryList"

export const getCategoryList = (): TicketCategoryType[] => {
    return categoryList;
}