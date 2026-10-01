import { usersList } from "@/data/users"

export const searchUserList = (searchValue: string) => {
    if(searchValue === "") return [];
    const search = searchValue.trim().toLowerCase();

    return usersList.filter(user => {
        const searchableText = [
            user.firstName,
            user.lastName,
            user.email
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(search);
    })
}
