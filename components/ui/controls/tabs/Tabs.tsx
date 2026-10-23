import { Description, Tabs as HTabs, Orientation, Label } from "@heroui/react";
import { Column } from "../../layout/flex";

export type TabsListType = {
    label: string,
    id: string
}

export type TabsProps = {
    tabs: TabsListType[],
    children: React.ReactNode,
    orientation?: Orientation
}

export type TabProps = {
    id: string,
    children: React.ReactNode,
    
}

export const Tabs = (props : TabsProps) => {
    return (
        <HTabs className="w-full h-full" orientation={props.orientation || "horizontal"} variant="primary">
            <HTabs.ListContainer className={`${props.orientation === "vertical" ? "bg-transparent" : "bg-white/60"} max-w-100 max-h-auto`}>
                <HTabs.List>
                    {props.tabs.map((tab) => {
                        return (
                            <HTabs.Tab key={"tab" + tab.id} className={`${props.orientation === "vertical" && "justify-start items-center"}`} id={tab.id}>

                                {tab.label}
                                
                                
                                <TabsIndicator />
                            </HTabs.Tab>
                        )
                    })}
                </HTabs.List>
            </HTabs.ListContainer>
            {props.children}
        </HTabs>
    )
}

export const TabsIndicator = () => <HTabs.Indicator className="bg-indigo-200/60 text-white/60! h-full"/>

export const Tab = (props: TabProps) => {
    return (
        <HTabs.Panel className="px-4 w-full h-full" id={props.id}>
            {props.children}
        </HTabs.Panel>
    )
}