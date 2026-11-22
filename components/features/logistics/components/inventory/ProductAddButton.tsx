import { AddButton } from "@/components/ui/controls/buttons/addButton"
import { useAccess } from "@/providers/access.provider";

export const ProductAddButton = () => {

    const { hasPermission } = useAccess();

    if(!hasPermission("equipment.create")) return null;

    return (
        <AddButton label="Add new product" />
    )
}