
import { userTableColumns } from "../config/table.config";
import { useUsersSettingsTableConfig } from "../store/table.store";
import { createSettingsPopover } from "@/components/composed/settings/createSettingsPopover";
import { useSettingsUserPageStore } from "../store/page.store";

export const UsersListSettingsPopover = createSettingsPopover(
    useSettingsUserPageStore,
    useUsersSettingsTableConfig,
    userTableColumns
)