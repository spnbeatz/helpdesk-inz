import { background } from "@/styles"

export const BasicChip = ({children, color = "normal"} : {children: React.ReactNode | string, color?: "normal" | "danger" | "green" | "yellow" | "white"}) => {
    const getColorClass = () => {
        switch(color){
            case "normal":
                return `${background.bluepurplegradient}`;
            case "danger":
                return "bg-red-500";
            case "green":
                return "bg-green-500";
            case "yellow":
                return "bg-yellow-500";
            case "white":
                return "bg-white"
            default:
                return `${background.bluepurplegradient}`
        }
    }
    return (
        <div className={`overflow-hidden shadow-sm rounded-lg ${getColorClass()}`}>
            <div className="w-full h-full bg-white/80 text-xs px-3 py-[2px]">
                {children}
            </div>
        </div>
    )
}