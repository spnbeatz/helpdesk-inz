"use client"

import { useAuth } from "@/providers/auth.provider"
import { Row } from "../layout/flex"

export type Tabs = {
    name: string,
    value: string
}

export type TabConfig<T extends string> = {
    id: T;
    label: string;
};

type TabSwitchNewProps<T extends string> = {
    tabs: TabConfig<T>[];
    activeTabValue: T;
    onChange: (value: T) => void;
};

export const TabSwitch = <T extends string,>({
    tabs,
    activeTabValue,
    onChange
}: TabSwitchNewProps<T>) => {
    return (
        <div className="p-1 rounded-lg bg-white/40 shadow-sm h-9">
            <Row Center className="h-full">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`
                            h-full px-4 whitespace-nowrap
                            text-black/60 shadow-muted
                            flex justify-center items-center
                            text-xs cursor-pointer
                            transition-colors duration-200
                            ${activeTabValue === tab.id
                                ? "bg-indigo-400/60 rounded-lg text-white font-semibold"
                                : "hover:bg-black/5 rounded-lg"
                            }
                        `}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </Row>
        </div>
    );
};

export const UserSwitch = () => {
    const { activeLoggedUser, setActiveLoggedUser } = useAuth();

    const tabs: TabConfig<string>[] = [
        { label: "Admin", id: "USR-001" },
        { label: "Technician", id: "USR-002" },
        { label: "Manager", id: "USR-004" },
        { label: "User", id: "USR-005" }
    ];

    return (
        <TabSwitch
            tabs={tabs}
            activeTabValue={activeLoggedUser}
            onChange={(value) => setActiveLoggedUser(value)}
        />

    )
}






