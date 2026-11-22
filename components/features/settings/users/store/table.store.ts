import { User } from "@/data/users";
import { createTableConfig } from "@/hooks/createTableConfig";
import { usersDefaultColumns, usersSettingsTableId } from "../config/table.config";

export const useUsersSettingsTableConfig =
    createTableConfig<User>(
        usersSettingsTableId,
        usersDefaultColumns
    )