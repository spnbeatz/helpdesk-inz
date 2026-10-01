export const Center = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {children}
        </div>
    )
}