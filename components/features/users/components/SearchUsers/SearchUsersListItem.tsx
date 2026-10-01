import { UserType } from "@/data/users"
import { ListBox } from "@heroui/react"

export const SearchUsersListItem = ({ user }: { user: UserType }) => {
    return (
        <ListBox.Item
            className="flex flex-col items-start justify-center"
            key={user.id}
            id={user.id}
            textValue={`${user.firstName} ${user.lastName}`}
        >
            <p className="text-sm text-black/80">
                {user.firstName} {user.lastName}
            </p>

            <p className="text-xs text-black/60">
                {user.email} | {user.id}
            </p>

            <ListBox.ItemIndicator />
        </ListBox.Item>
    )
}