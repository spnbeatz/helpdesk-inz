import { Button } from "./Button"

export const ConfirmButton = ({ children, onClick} : { children?: React.ReactNode, onClick: () => void}) => {
    return (
        <Button onClick={onClick} className={"bg-indigo-400/60"}>
            {children ? children : "Confirm"}
        </Button>
    )
}