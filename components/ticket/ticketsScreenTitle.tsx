import { background } from "@/styles"
import { Button, Description, Label, Separator, SearchField, Popover, TextField } from "@heroui/react"
import { LuPlus, LuFilter, LuSettings, LuChartLine, LuSlash } from "react-icons/lu"
import { TicketsPageFiltersType, useTicketsPageStore } from "@/store/pages/tickets.store"
import { useModalStore } from "@/store/modals"
import { IconType } from "react-icons"
import { TicketType } from "@/data/exampleTicketsList"
import { Select, SelectOptionsType } from "../layout/select"
import { usePriorityList } from "@/queries/priorities/priorities.query"
import { useCategotyList } from "@/queries/categories/categories.query"
import { useState, useEffect } from "react"

export const TicketsScreenTitle = ({ title, description }: { title?: string, description?: string }) => {
    const { setStatsVisibility, statsVisibility } = useTicketsPageStore();
    const { openModal } = useModalStore();

    const handleCreateTicket = () => {
        openModal("ticketForm");
    }
    return (
        <div className="flex flex-col items-start justify-center w-full pr-2">
            <div className="w-full flex flex-row items-start justify-start">
                <div className="w-full flex flex-col items-start justify-center">
                    <Label className="text-2xl">
                        {title}
                    </Label>
                    <Description>
                        {description}
                    </Description>
                </div>
                <div className="flex flex-row items-start justify-between gap-2">
                    <TicketsSearch />
                    <IconButton Icon={LuChartLine} onClick={setStatsVisibility}>
                        {!statsVisibility && <LuSlash className="absolute" />}
                    </IconButton>
                    
                    <TicketListFilterButton />
                    <Button className={"rounded-lg shadow-sm p-0 overflow-hidden"} onClick={handleCreateTicket}>
                        <div className={`w-full h-full ${background.bluepurplegradient}`}>
                            <div className="w-full h-full bg-white/30 flex flex-row items-center justify-center px-4 gap-2 rounded-lg ">
                                New Ticket <LuPlus />
                            </div>
                        </div>

                    </Button>
                    <IconButton Icon={LuSettings} />

                </div>
            </div>

            {/* <Separator className={`mt-6 ${background.bluepurplegradient} opacity-20`} /> */}
        </div>
    )
}

export const TicketListFilterButton = () => {

    const { setFilters, otherFilters } = useTicketsPageStore();
    const { data: priorityList } = usePriorityList();
    const { data: categoryList } = useCategotyList();

    const sortTypes: SelectOptionsType[] = [{
        textValue: "Title",
        id: "title"
    }, {
        textValue: "Created Date",
        id: "created_at"
    }]; // do rozszerzenia

    const sortDirections: SelectOptionsType[] = [{
        textValue: "Ascending",
        id: "asc"
    }, {
        textValue: "Descending",
        id: "desc"
    }];

    const handleChange = (value: string, key: string) => {
        setFilters(key, value);
    }

    return (
        <Popover>
            <IconButton Icon={LuFilter} />
            <Popover.Content className={"rounded-lg min-w-[300px] bg-white/90"}>
                <Popover.Dialog className="flex flex-col items-start justify-center gap-2">
                    <Popover.Heading className="text-lg text-black/70">
                        List filters
                    </Popover.Heading>
                    <Select
                        options={sortTypes}
                        label="Sort by"
                        defaultValue={otherFilters.sortBy}
                        placeholder="Select sort key"
                        name="sortBy"
                        onChange={handleChange}
                    />
                    <Select
                        options={sortDirections}
                        label="Sort direction"
                        defaultValue={otherFilters.sortDir}
                        placeholder="Select sort direction"
                        name="sortDir"
                        onChange={handleChange}
                    />
                    <Select
                        name="priorityId"
                        isRequired={true}
                        label="Priority"
                        placeholder="Select priority"
                        options={priorityList?.map((priority) => {
                            return { id: priority.id, textValue: priority.name }
                        })}
                        onChange={handleChange}
                    />
                    <Select
                        name="categoryId"
                        isRequired={true}
                        label="Category"
                        placeholder="Select category"
                        options={categoryList?.map((category) => {
                            return { id: category.id, textValue: category.name }
                        })}
                        onChange={handleChange}
                    />
                </Popover.Dialog>
            </Popover.Content>
        </Popover>

    )
}

export const IconButton = ({
    Icon,
    onClick,
    variant = "outline",
    children,
    className
}: {
    Icon: IconType,
    onClick?: () => void,
    variant?: "outline" | "danger" | "danger-soft" | "ghost" | "primary" | "secondary" | "tertiary" | undefined,
    children?: React.ReactNode,
    className?: string
}) => {
    return (
        <Button
            onClick={onClick}
            className={`rounded-lg shadow-sm px-3 relative ${className}`}
            variant={variant}>
            <Icon className="text-black/70" />
            {children}
        </Button>
    )

}

export const TicketsSearch = () => {
    const { setFilters } = useTicketsPageStore();

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters("searchValue", searchValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue, setFilters]);

    const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
};

    return (
        <SearchField>
            <SearchField.Group className="rounded-lg bg-white/50">
                <SearchField.SearchIcon />

                <SearchField.Input
                    className="w-[280px]"
                    placeholder="Search..."
                    onInput={handleOnInput}
                />

                <SearchField.ClearButton />
            </SearchField.Group>
        </SearchField>
    );
};