
import { userTableColumns } from "../config/userTableColumns";
import { useUsersSettingsTableConfig } from "@/store/pages/settings/users.store";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";
import { useSettingsUserPageStore } from "@/store/pages/settings/users.store";

export const UsersListSettingsPopover = createSettingsPopover(
    useSettingsUserPageStore,
    useUsersSettingsTableConfig,
    userTableColumns
)