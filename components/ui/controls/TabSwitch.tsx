"use client"

import { useAuth } from "@/providers/auth.provider"
import { Row } from "../layout/flex"

export type Tabs = {
    name: string,
    value: string
}

export const TabSwitch = ({
    tabs,
    activeTabValue,
    onChange
}: {
    tabs: Tabs[],
    activeTabValue: string,
    onChange: (value: string) => void
}) => {
    return (
        <div className=" p-1 rounded-lg bg-white/40 shadow-sm h-[36px]">
            <Row Center className="h-full">
                {tabs.map((tab, index) => {

                    return (
                        <div key={tab.name} className={`
                        h-full px-4 whitespace-nowrap text-black/60
                        shadow-muted flex justify-center items-center text-xs cursor-pointer
                        ${activeTabValue === tab.value ? "bg-indigo-400/60 rounded-lg text-white" : ""}
                        `}
                            onClick={() => onChange(tab.value)}
                        >
                            {tab.name}
                        </div>
                    )
                })}
            </Row>
        </div>
    )
}

export const UserSwitch = () => {
    const { activeLoggedUser, setActiveLoggedUser } = useAuth();
    return (
        <TabSwitch
            tabs={[
                { name: "Admin", value: "USR-001" },
                { name: "Technician", value: "USR-002" },
                { name: "User", value: "USR-005" }
            ]}
            activeTabValue={activeLoggedUser}
            onChange={(value) => setActiveLoggedUser(value)}
        />

    )
}