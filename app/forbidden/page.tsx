import { Column } from "@/components/ui/layout/flex";
import { Description, Label } from "@heroui/react";

export default function ForbiddenPage() {
    return (
        <Column Center className="w-full h-full gap-2 relative">
            <Label className="text-[200px] text-indigo-100 absolute font-black ">403</Label>
            <Label className="text-3xl z-10 font-black text-black/80">Access denied</Label>
            <Description className="z-10 text-sm">You don't have permission to access this page.</Description>
        </Column>
    )
}