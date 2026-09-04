import { LuMessageSquareWarning } from "react-icons/lu"

export const FormErrorMessage = ({message} : {message: string | null}) => {

    if(!message) return null;
    
    return (
        <p className=" p-4 rounded-lg bg-red-200 border-red-400 border-1 text-xs text-red-600 flex flex-row items-center gap-2">
            <LuMessageSquareWarning className="text-lg"/> 
            {message}
        </p>
    )
}