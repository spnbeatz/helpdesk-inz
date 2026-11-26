import { Form } from "@/components/composed/form/Form"
import { ticketAttachmentFormConfig } from "../config/form.config";
import { useSaveTicket } from "../queries/mutation";
import { TicketType } from "@/data/exampleTicketsList";
import { TicketListItemType } from "@/api/services/tickets.service";

export const TicketAttachmentsForm = ({ticket} : {ticket: TicketListItemType}) => {

    const { mutateAsync: saveTicket } = useSaveTicket(); 

    const onSubmit = (data: { files: File[]}) => {
        saveTicket({
            formData: { files: data.files },
        })
    }

    return (
        <Form
            config={ticketAttachmentFormConfig}
            onSubmit={onSubmit}
        />
    )
}