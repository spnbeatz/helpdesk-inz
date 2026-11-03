import { background } from "@/styles"
import { Row } from "../layout/flex";

export const BasicChip = ({children, className, onClick, color = "normal"} : {children: React.ReactNode | string, className?: string,  color?: "normal" | "danger" | "green" | "yellow" | "white", onClick?: ()=> void}) => {
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
                return "bg-white/70"
            default:
                return `${background.bluepurplegradient}`
        }
    }
    return (
        <div className={`overflow-hidden shadow-sm rounded-lg ${getColorClass()} ${className}`} onClick={onClick}>
            <Row Center className="w-full h-full bg-white/80 text-xs px-3 py-[2px] gap-1">
                {children}
            </Row>
        </div>
    )
}