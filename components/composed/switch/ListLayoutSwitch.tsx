import { TabSwitch } from "@/components/ui/controls/TabSwitch";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Row } from "@/components/ui/layout/flex";
import { IconButton } from "@/components/ui/controls/buttons/iconButton";

export type ListLayoutType = "list" | "grid"

export type ListLayoutSwitchProps = {
    value: ListLayoutType,
    setValue: (value: ListLayoutType) => void
}

export const ListLayoutSwitch = ({ value, setValue }: ListLayoutSwitchProps) => {
    return (
        <Row Center className="rounded-lg bg-white/40 shadow-sm h-9">
            <Row Center className="h-full p-1">
                <IconButton Icon={LuList}
                    iconColor={value === "list" ? "white" : undefined}
                    className={` rounded-md rounded-r-none h-full border-none w-full shadow-none ${value === "list" ? "bg-indigo-400/60" : ""}`}
                    onClick={() => setValue("list")}
                />
                <IconButton Icon={LuLayoutGrid}
                    iconColor={value === "grid" ? "white" : undefined}
                    className={`px-2 h-full w-full border-none rounded-md rounded-l-none shadow-none ${value === "grid" ? "bg-indigo-400/60" : ""}`}
                    onClick={() => setValue("grid")}
                />

            </Row>
        </Row>
    )
}