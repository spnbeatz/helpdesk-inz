import { TicketCategoryType } from "@/data/categoryList";
import { IApiClient } from "../interfaces/config/apiClient.interface";
import { ICategoriesService } from "../interfaces/services/categories.inteface";
import { categoryList } from "@/data/categoryList";

export class CategoriesService implements ICategoriesService {

    private endpoint: string = "/tickets/categories";

    constructor(
        private readonly api: IApiClient
    ){}

    async getCategoryList(): Promise<TicketCategoryType[]> {
        return categoryList;
    }

}