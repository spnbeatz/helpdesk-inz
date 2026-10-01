import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { usePriorityList } from "@/queries/priorities/priorities.query";
import { useCategotyList } from "@/queries/categories/categories.query";
import { FilterPopoverButton } from "../../../ui/controls/buttons/filterPopoverButton";
import { Select } from "../../../ui/controls/inputs/Select";
import { sortTypes, sortDirections } from "@/data/filters";
import { TicketType } from "@/data/exampleTicketsList";

export const TicketListFilterButton = () => {

    const { setFilters, filters } = useTicketsPageStore();
    const { data: priorityList } = usePriorityList();
    const { data: categoryList } = useCategotyList();

    return (
        <FilterPopoverButton>
            <Select
                options={sortTypes}
                label="Sort by"
                defaultValue={filters.sortBy}
                placeholder="Select sort key"
                onChange={(value) =>
                    setFilters({
                        sortBy: value as keyof TicketType,
                    })
                }
            />
            <Select
                options={sortDirections}
                label="Sort direction"
                defaultValue={filters.sortDir}
                placeholder="Select sort direction"
                onChange={(value) =>
                    setFilters({
                        sortDir: value as "asc" | "desc",
                    })
                }
            />
            <Select
                isRequired
                label="Priority"
                placeholder="Select priority"
                options={priorityList?.map((priority) => ({
                    id: priority.id,
                    textValue: priority.name,
                }))}
                onChange={(value) =>
                    setFilters({
                        priorityId: value ?? undefined,
                    })
                }
            />
            <Select
                isRequired
                label="Category"
                placeholder="Select category"
                options={categoryList?.map((category) => ({
                    id: category.id,
                    textValue: category.name,
                }))}
                onChange={(value) =>
                    setFilters({
                        categoryId: value ?? undefined,
                    })
                }
            />
        </FilterPopoverButton>
    )
}
