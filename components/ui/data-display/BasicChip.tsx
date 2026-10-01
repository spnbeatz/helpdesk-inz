import { background } from "@/styles"

export const BasicChip = ({children, color = "normal"} : {children: React.ReactNode | string, color?: "normal" | "danger"}) => {
    const getColorClass = () => {
        switch(color){
            case "normal":
                return `${background.bluepurplegradient}`;
            case "danger":
                return "bg-red-500"
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