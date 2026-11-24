import { Form } from "@/components/composed/form/Form"
import { useCategotyList } from "@/queries/categories/categories.query";
import { useTicket } from "../queries/query";
import { FilterOption } from "@/components/composed/filters/types";
import { mapCategoryListToSelectOptions } from "../helpers/map";
import { addFormFieldOptions, fillFormValues } from "@/components/composed/form/helpers";
import { ticketCreateFormConfig } from "../config/form.config";
import { TicketFormDataType } from "../types/form.types";

export const TicketForm = ({ticketId} : {ticketId?: string}) => {

    const { data: ticketFormData } = useTicket(ticketId);
    const { data: categoryList } = useCategotyList();

    const categoryOption: FilterOption[] = mapCategoryListToSelectOptions(categoryList);

    let config = addFormFieldOptions(ticketCreateFormConfig, {
        categoryId: categoryOption
    });

    config = fillFormValues(config, ticketFormData);

    const onSubmit = (data: TicketFormDataType) => {
        console.log(data, "ticket create data");
    }

    return (
        <Form 
            config={config}
            onSubmit={onSubmit}
        >
        </Form>
    )
}