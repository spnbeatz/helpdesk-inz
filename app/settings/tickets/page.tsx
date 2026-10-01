import { ScrollShadow } from "@heroui/react";
import { Card } from "@/components/ui/surfaces/Card";
import { Title } from "@/components/ui/typography/Title";
import { CategoriesSection } from "@/components/features/settings/tickets/sections/CategoriesSection";
import { PrioritiesSection } from "@/components/features/settings/tickets/sections/PrioritiesSection";

export default function TicketsSettingsPage() {
    return (
        <ScrollShadow className="h-full space-y-2">
            <Title title="Ticket settings" />
            <Card>
                <Title title="Main settings" variant="section"/>
            </Card>
            <CategoriesSection />
            <PrioritiesSection />
            <Card className="h-140 w-full bg-purple-500 " id="statuses">
                hello
            </Card>
        </ScrollShadow>

    )
}