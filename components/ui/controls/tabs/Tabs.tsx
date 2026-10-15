import { Tabs as HTabs, Orientation } from "@heroui/react";

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
            <HTabs.ListContainer className="bg-white/60 max-w-100">
                <HTabs.List>
                    {props.tabs.map((tab) => {
                        return (
                            <HTabs.Tab className={`${props.orientation === "vertical" && "justify-start items-center"}`} id={tab.id}>
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

export const TabsIndicator = () => <HTabs.Indicator className="bg-indigo-200/60 text-white/60!"/>

export const Tab = (props: TabProps) => {
    return (
        <HTabs.Panel className="px-4 w-full h-full" id={props.id}>
            {props.children}
        </HTabs.Panel>
    )
}