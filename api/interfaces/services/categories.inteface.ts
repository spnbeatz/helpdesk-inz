import { TicketCategoryType } from "@/data/categoryList";

export interface ICategoriesService {
    getCategoryList(): Promise<TicketCategoryType[]>
}