"use client"
import { Button, Fieldset, FieldGroup, Form } from "@heroui/react";
import { useModalStore } from "@/store/modals";
import { useState, useEffect } from "react";
import { useTicket } from "@/queries/tickets/tickets.query";
import { Input } from "@/components/ui/controls/inputs/Input";
import { Select } from "@/components/ui/controls/inputs/Select";
import { usePriorityList } from "@/queries/priorities/priorities.query";
import { useCategotyList } from "@/queries/categories/categories.query";
import { FileInput } from "@/components/ui/controls/inputs/FileInput";
import { MdAttachFile } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useSaveTicket } from "@/queries/tickets/tickets.mutation";
import { FormErrorMessage } from "@/components/ui/feedback/FormErrorMessage";
import { Modal } from "@/components/composed/modals/Modal";
import { AttachmentsList } from "@/components/ui/data-display/attachments/AttachmentsList";
import { Column, Row } from "@/components/ui/layout/flex";

export type TicketFormModalProps = {
    ticketId?: string,
}

export type TicketFormDataType = {
    id?: string,
    title: string,
    description: string,
    categoryId: string,
    priorityId: string

}

export const TicketFormModal = ({ data }: { data?: TicketFormModalProps }) => {

    const { closeModal, openModal, closeAllModals } = useModalStore();
    const { mutate: saveTicket } = useSaveTicket();

    const { data: ticketFormData } = useTicket(data?.ticketId);
    const { data: priorityList } = usePriorityList();
    const { data: categoryList } = useCategotyList();

    const [initialFormData, setInitialFormData] =
        useState<TicketFormDataType>({
            id: data?.ticketId || undefined,
            title: "",
            description: "",
            categoryId: "",
            priorityId: ""
        });

    const [formData, setFormData] = useState<TicketFormDataType>({
        id: data?.ticketId || undefined,
        title: "",
        description: "",
        categoryId: "",
        priorityId: ""
    });

    const [files, setFiles] = useState<File[]>([]);

    const [error, setError] = useState<string | null>(null);

    const isFormInvalid = () => {
        return (
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.categoryId ||
            !formData.priorityId
        );
    };

    const isFormChanged = () => {
        if (!initialFormData) return false;

        return (
            formData.title !== initialFormData.title ||
            formData.description !== initialFormData.description ||
            formData.categoryId !== initialFormData.categoryId ||
            formData.priorityId !== initialFormData.priorityId
        );
    };

    useEffect(() => {
        if (!ticketFormData) return;

        const data = {
            id: ticketFormData.id,
            title: ticketFormData.title,
            description: ticketFormData.description,
            categoryId: ticketFormData.categoryId,
            priorityId: ticketFormData.priorityId,
        };

        setFormData(data);
        setInitialFormData(data);
    }, [ticketFormData]);

    const changeFormData = (value: string, key: string) => {
        setFormData((prev: TicketFormDataType) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleCancelEditing = () => {
        if (!isFormChanged()) {
            closeModal();
            return;
        }

        openModal("confirmation", {
            title: "Do you want cancel editing ticket without save?",
            confirmAction: () => closeAllModals(),
            iconType: "warning"
        });
    };

    const handleSaveTicket = async () => {
        const result = await saveTicket({ formData, files });

        /*         if(result.error) { 
                    setError(result.error);
                    return;
                }; */

        closeAllModals();
    }

    return (
        <Modal isOpen isDismissable>
            <Form>
                <Fieldset>
                    <Fieldset.Legend className="text-2xl mb-4">{data?.ticketId !== undefined ? "Edit ticket" : "Create ticket"}</Fieldset.Legend>
                    <FormErrorMessage message={error} />
                    <FieldGroup>
                        <Input isRequired name="title"
                            label="Title"
                            placeholder="Enter title of your problem..."
                            value={formData.title}
                            onInput={changeFormData}
                        />
                        <Input isRequired name="description"
                            label="Description"
                            placeholder="Describe your problem..."
                            type="textarea"
                            value={formData.description}
                            onInput={changeFormData}
                        />

                        <Row EndBetween className="w-full flex gap-2 items-stretch">

                            <Column Start className="flex-1 gap-2">
                                <Select
                                    onChange={(value) => changeFormData(value || "", "priorityId")}
                                    isRequired={true}
                                    label="Priority"
                                    placeholder="Select priority"
                                    options={priorityList?.map((priority) => {
                                        return { id: priority.id, textValue: priority.name }
                                    })}
                                    defaultValue={formData.priorityId !== "" ? formData.priorityId : undefined}
                                />
                                <Select
                                    onChange={(value) => changeFormData(value || "", "categoryId")}
                                    isRequired={true}
                                    label="Category"
                                    placeholder="Select category"
                                    options={categoryList?.map((category) => {
                                        return { id: category.id, textValue: category.name }
                                    })}
                                    defaultValue={formData.categoryId !== "" ? formData.categoryId : undefined}
                                />
                            </Column>

                            <FileInput
                                className="w-1/3"
                                onChange={setFiles}
                                accept="image/*,text/*,video/*,.zip,.rar,.7z,.tar,.gz"
                            >
                                <Row>
                                    <MdAttachFile /><LuPlus />
                                </Row>
                                Attach file
                            </FileInput>

                        </Row>
                        {files.length > 0 ? <AttachmentsList files={files} onChange={setFiles} /> : null}
                    </FieldGroup>
                </Fieldset>
            </Form>

            <Row CenterEnd className="w-full mt-4">
                <Button variant="tertiary" onClick={handleCancelEditing} className={"rounded-lg"}> {/* Jeśli nie ma wprowadzonych danych, poprostu closeModal */}
                    Cancel
                </Button>
                <Button className={"rounded-lg bg-sky-700/60"} isDisabled={isFormInvalid()}>
                    Save
                </Button>
            </Row>
        </Modal>
    )
}
