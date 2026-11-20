import { ListLayoutSwitch } from "@/components/composed/switch/ListLayoutSwitch"
import { useTicketsSettingsTableConfig } from "@/store/pages/tickets.store"

export const TicketsListLayoutSwitch = () => {

    const { layoutType, changeType} = useTicketsSettingsTableConfig();


    return (
        <ListLayoutSwitch 
            value={layoutType}
            setValue={changeType}
        />
    )
}