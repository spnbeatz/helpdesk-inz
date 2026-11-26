import { ListBox, EmptyState } from "@heroui/react";
import { useSearchUsers } from "@/queries/users/users.query";
import { SearchUsersListItem } from "./SearchUsersListItem";
import { RoleNameType } from "../../types/role.types";

export const SearchUsersList = ({ searchValue, role } : { searchValue: string, role?: RoleNameType }) => {

    const { data: users } = useSearchUsers({searchValue, roleNames: [role || "User"]});

    return (
        <ListBox
            renderEmptyState={() => (
                <EmptyState>No results found</EmptyState>
            )}
        >
            {users?.items.map((user) => <SearchUsersListItem key={`searchuserslist-${user.id}`} user={user} />)}
        </ListBox>
    )
}