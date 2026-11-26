import { Button } from "./Button"

export const CancelButton = ({ children, onClick} : { children?: React.ReactNode, onClick: () => void}) => {
    return (
        <Button variant="outline" onClick={onClick}>
            {children ? children : "Cancel"}
        </Button>
    )
}