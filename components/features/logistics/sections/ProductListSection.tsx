import { ProductList } from "@/components/features/logistics/components/ProductList";
import { Section } from "@/components/ui/surfaces/Section";

export const ProductListSection = () => {
    return (
        <Section className="flex-1 min-h-0">
            <ProductList />
        </Section>
    )
}