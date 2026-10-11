export const Divider = ({vertical = false} : {vertical?: boolean}) => {
    return (
        <div className={`${vertical ? "h-full" : "w-full"}`}>
            <div className={`${vertical ? "h-[90%] w-[1px]" : "w-[90%] h-[1px]"} bg-gray-200`}>

            </div>
        </div>
    )
}