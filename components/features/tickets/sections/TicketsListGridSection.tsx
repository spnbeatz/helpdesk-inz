import { Section } from "@/components/ui/surfaces/Section";
import { TicketsGrid } from "@/components/features/tickets/components/TicketsGrid";

export const TicketsListGridSection = () => {
    return (
        <Section className="flex-1 min-h-0">
            <TicketsGrid />
        </Section>
    )
}