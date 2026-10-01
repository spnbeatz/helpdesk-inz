import { ListBox, EmptyState } from "@heroui/react";
import { useSearchUsers } from "@/queries/users/users.query";
import { SearchUsersListItem } from "./SearchUsersListItem";

export const SearchUsersList = ({ searchValue } : { searchValue: string}) => {

    const { data: users } = useSearchUsers(searchValue);

    return (
        <ListBox
            renderEmptyState={() => (
                <EmptyState>No results found</EmptyState>
            )}
        >
            {users?.map((user) => <SearchUsersListItem user={user} />)}
        </ListBox>
    )
}