import { useEffect, useState } from "react";
import { SearchField } from "@heroui/react";

type SearchProps = {
    onSearch: (value: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(searchValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue, onSearch]);

    const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    return (
        <SearchField aria-label="search">
            <SearchField.Group className="rounded-lg bg-white/50">
                <SearchField.SearchIcon />

                <SearchField.Input
                    aria-label="searchinput"
                    className="w-[280px]"
                    placeholder="Search..."
                    onInput={handleOnInput}
                />

                <SearchField.ClearButton />
            </SearchField.Group>
        </SearchField>
    );
};