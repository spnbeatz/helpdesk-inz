"use client";

import { useState } from "react";
import { Key, Autocomplete, SearchField } from "@heroui/react";
import { SearchUsersList } from "./SearchUsersList";
import { Column } from "@/components/ui/layout/flex";

type SearchUserProps = {
    onSelect: (userIds: string[] | null) => void;
    placeholder?: string
};

export const SearchUser = ({
    placeholder,
    onSelect,
}: SearchUserProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    const handleChange = (keys: Key[] | null) => {
        setSelectedKeys(keys ?? []);

        onSelect(
            keys?.map(String) ?? null
        );
    };



    return (
        <Column Start className="w-full gap-2">
            <h4 className="mb-2 font-medium">
                Users
            </h4>

            <Autocomplete
                aria-label="search-users"
                value={selectedKeys}
                selectionMode="multiple"
                onChange={handleChange}
                placeholder={placeholder || "Select User"}
                variant="primary"
                fullWidth
                allowsEmptyCollection

            >
                <Autocomplete.Trigger className={"rounded-lg"}>
                    <Autocomplete.Value className={"text-xs"} />
                    <Autocomplete.ClearButton />
                    <Autocomplete.Indicator />
                </Autocomplete.Trigger>

                <Autocomplete.Popover>
                    <Autocomplete.Filter
                        inputValue={searchValue}
                        onInputChange={setSearchValue}
                    >
                        <SearchField autoFocus aria-label="search">
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input placeholder="Search users..." />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>

                        <SearchUsersList searchValue={searchValue} />

                    </Autocomplete.Filter>
                </Autocomplete.Popover>
            </Autocomplete>
        </Column>

    );
};