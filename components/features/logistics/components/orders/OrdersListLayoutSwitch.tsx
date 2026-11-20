import { ListLayoutSwitch } from "@/components/composed/switch/ListLayoutSwitch"
import { useOrdersTableConfig } from "@/store/pages/orders.store";

export const OrdersListLayoutSwitch = () => {

    const { layoutType, changeType} = useOrdersTableConfig();


    return (
        <ListLayoutSwitch 
            value={layoutType}
            setValue={changeType}
        />
    )
}