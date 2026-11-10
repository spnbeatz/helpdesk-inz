import {
    Description,
    EmptyState,
    Autocomplete as HAutocomplete,
    Key,
    ListBox,
    SearchField
} from "@heroui/react";

import { Row } from "../../layout/flex";
import { LuSearch } from "react-icons/lu";
import { Dispatch, ReactNode, SetStateAction } from "react";

type CommonAutoCompleteProps<T> = {
    items: T[];
    getItemId: (item: T) => Key;
    renderItem: (item: T) => ReactNode;

    placeholder?: string;

    triggerText?: string;
    triggerComponent?: ReactNode;

    searchValue?: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
};

type AutoCompleteProps<T> = CommonAutoCompleteProps<T> & (
    | {
        selectionMode: "multiple";
        value?: Key[];
        onChange: (keys: Key[]) => void;
    }
    | {
        selectionMode?: "single";
        value?: Key | null;
        onChange: (value: Key | null) => void;
    }
);

export const Autocomplete = <T,>({
    items,
    getItemId,
    renderItem,
    selectionMode = "single",
    value,
    placeholder,
    onChange,
    triggerText,
    triggerComponent,
    searchValue,
    setSearchValue
}: AutoCompleteProps<T>) => {
    return (
        <HAutocomplete
            className="w-full"
            selectionMode={selectionMode}
            value={value}
            placeholder={placeholder}
            onChange={(keys) => onChange(keys as Key[] & (Key | null))}
        >
            <HAutocomplete.Trigger>
                {triggerComponent ?? (
                    <Row Start className="gap-2">
                        <LuSearch />
                        <Description>{triggerText}</Description>
                    </Row>
                )}
            </HAutocomplete.Trigger>

            <HAutocomplete.Popover>
                <SearchField
                    autoFocus
                    aria-label={triggerText}
                    variant="secondary"
                    name="search"
                >
                    <SearchField.Group>
                        <SearchField.SearchIcon />

                        <SearchField.Input
                            placeholder={triggerText}
                            value={searchValue}
                            onInput={(e) =>
                                setSearchValue(e.currentTarget.value)
                            }
                        />

                        <SearchField.ClearButton />
                    </SearchField.Group>
                </SearchField>

                <ListBox
                    renderEmptyState={() => (
                        <EmptyState>No results found</EmptyState>
                    )}
                >
                    {items.map((item) => {
                        const id = getItemId(item);

                        return (
                            <ListBox.Item
                                key={id}
                                id={id}
                                textValue={String(id)}
                            >
                                {renderItem(item)}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        );
                    })}
                </ListBox>
            </HAutocomplete.Popover>
        </HAutocomplete>
    );
};