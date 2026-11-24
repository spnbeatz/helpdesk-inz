import { FormConfig } from "@/components/composed/form/types";
import { TicketFormDataType } from "../types/form.types";

export const ticketCreateFormConfig: FormConfig<TicketFormDataType> = {
    title: "Create ticket",
    submitButtonText: "Create",
    fields: [
        {
            name: "id",
            type: "hidden"
        },
        {
            name: 'title',
            label: "Title",
            type: "input",
            isRequired: true
        },{
            name: 'description',
            label: 'Description',
            type: "textarea",
            isRequired: true
        },
        {
            name: "categoryId",
            label: "Select category",
            type: "select",
            isRequired: true
        },
        {
            name: "files",
            label: "Attachments",
            description: "(Accept files: images, text files, videos, archives)",
            type: "file",
            accept: "image/*,text/*,video/*,.zip,.rar,.7z,.tar,.gz"
        }
    ]
}