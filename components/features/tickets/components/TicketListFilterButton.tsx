import { initialTicketsFilters, useTicketsPageStore } from "@/store/pages/tickets.store";
import { useCategotyList } from "@/queries/categories/categories.query";
import { ticketsFiltersConfig } from "../config/ticketsFilters.config";
import { FilterPopover } from "@/components/composed/filters/FilterPopover";
import { TicketsPageFiltersType, TicketsSortKey } from "@/store/pages/tickets.store";
import { usePriorityList } from "@/queries/priorities/priorities.query";

export const TicketListFilterButton = () => {

    const { setFilters, filters } = useTicketsPageStore();
    const { data: categoryList } = useCategotyList();
    const { data: priorityList } = usePriorityList();

    const categoryOptions = categoryList?.map((category) => ({
        label: category.name,
        value: category.id
    }))

    const priorityOptions = priorityList?.map((priority) => ({
        label: priority.name,
        value: priority.id
    }))

    const filterOptions = {
        categoryId: categoryOptions ?? [],
        priorityId: priorityOptions ?? []
    };

    const filtersConfig = {
        ...ticketsFiltersConfig,
        filters: ticketsFiltersConfig.filters.map((filter) => {
            if (
                filter.type === "date-range" ||
                !(filter.key in filterOptions)
            ) {
                return filter;
            }

            return {
                ...filter,
                options: filterOptions[filter.key as keyof typeof filterOptions]
            };
        })
    };

    return (
        <FilterPopover<
            TicketsSortKey,
            TicketsPageFiltersType
            
        >
            config={filtersConfig}
            filters={filters}
            setFilters={setFilters}
            onClear={() => setFilters(initialTicketsFilters)}
        />
    )
}
