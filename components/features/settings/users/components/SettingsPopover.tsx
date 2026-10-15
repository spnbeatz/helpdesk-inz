import { IconButton } from "@/components/ui/controls/buttons/iconButton";
import { Popover } from "@/components/ui/data-display/Popover";
import { Grid } from "@/components/ui/layout/Grid";
import { Section } from "@/components/ui/surfaces/Section";
import { LuSettings } from "react-icons/lu";
import { userTableColumns } from "../config/userTableColumns";
import { useSettingsUserPageStore } from "@/store/pages/settings/users.store";
import { Row } from "@/components/ui/layout/flex";
import { Checkbox } from "@/components/ui/controls/inputs/Checkbox";

export const SettingsPopover = () => {
    const { tableConfig, toggleColumn } = useSettingsUserPageStore();
    return (
        <Popover
            trigger={<IconButton className="bg-white/40" Icon={LuSettings} />}
        >
            <Section title="Visible columns">
                <Grid cols={2} gap={2}>
                    {userTableColumns.map((column) => (
                        <Checkbox
                            key={String(column.id)}
                            isSelected={tableConfig.visibleColumns.includes(column.id)}
                            onChange={() => toggleColumn(column.id)}
                        >
                            {column.name}
                        </Checkbox>
                    ))}
                </Grid>
            </Section>
        </Popover>
    )
}