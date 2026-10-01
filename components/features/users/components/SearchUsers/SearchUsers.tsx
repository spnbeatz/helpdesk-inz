"use client";

import { useState, useEffect } from "react";
import { useSearchUsers } from "@/queries/users/users.query";
import { Key, Autocomplete, SearchField, ListBox, EmptyState } from "@heroui/react";
import { SearchUsersList } from "./SearchUsersList";

type SearchUserProps = {
    onSelect: (userId: string | null) => void;
};

export const SearchUser = ({
    onSelect,
}: SearchUserProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);

    const handleChange = (key: Key | null) => {
        setSelectedKey(key);
        onSelect(key ? String(key) : null);
    };

    return (
        <Autocomplete
            value={selectedKey}
            onChange={handleChange}
            placeholder="Select User"
            variant="primary"
            fullWidth
            allowsEmptyCollection
        >
            <Autocomplete.Trigger>
                <Autocomplete.Value />
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
            </Autocomplete.Trigger>

            <Autocomplete.Popover>
                <Autocomplete.Filter
                    inputValue={searchValue}
                    onInputChange={setSearchValue}
                >
                    <SearchField autoFocus>
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
    );
};