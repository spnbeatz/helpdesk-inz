import { Form } from "@/components/composed/form/Form"
import { useCategotyList } from "@/queries/categories/categories.query";
import { useTicket } from "../queries/query";
import { FilterOption } from "@/components/composed/filters/types";
import { mapCategoryListToSelectOptions, mapPriorityListToSelectOptions } from "../helpers/map";
import { addFormFieldOptions, fillFormValues } from "@/components/composed/form/helpers";
import { ticketCreateFormConfig } from "../config/form.config";
import { TicketFormDataType } from "../types/form.types";
import { usePriorityList } from "@/queries/priorities/priorities.query";
import { useSaveTicket } from "../queries/mutation";
import { useAuth } from "@/providers/auth.provider";
import { useModalStore } from "@/store/modals";
import { useEffect } from "react";

export const TicketForm = ({ticketId} : {ticketId?: string}) => {

    const { data: ticketFormData, isLoading } = useTicket(ticketId);
    const { data: categoryList } = useCategotyList();
    const { data: priorityList } = usePriorityList();
    const { mutateAsync: saveTicket } = useSaveTicket();
    const { user } = useAuth();
    const { openModal, closeModal } = useModalStore();

    useEffect(() => {
        console.log(ticketId, "ticketId");
    }, [ticketId])

    if (ticketId && isLoading) return <p>Loading...</p>;

    const categoryOption: FilterOption[] = mapCategoryListToSelectOptions(categoryList);
    const priorityOption: FilterOption[] = mapPriorityListToSelectOptions(priorityList)

    let config = addFormFieldOptions(ticketCreateFormConfig, {
        categoryId: categoryOption,
        priorityId: priorityOption
    });

    config = fillFormValues(config, ticketFormData);
    config = {...config, submitButtonText: ticketId ? "Save ticket" : "Create ticket"}

    const onSubmit = async (data: TicketFormDataType) => {
        if(ticketId){
            await saveTicket({ formData: {...data, id: ticketId} })
            closeModal();
        } else {
            if(!user) return;
            await saveTicket({ formData: { ...data, customer_id: user.id }});
            closeModal();
        } 
    }

    return (
        <Form 
            config={config}
            onSubmit={onSubmit}
        >
        </Form>
    )
}