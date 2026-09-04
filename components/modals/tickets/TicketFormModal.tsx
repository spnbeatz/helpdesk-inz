"use client"
import { Modal, Button, Label, Fieldset, FieldGroup, Form, TextField, FieldError, Description } from "@heroui/react";
import { ticketsList } from "@/data/exampleTicketsList";
import { useModalStore } from "@/store/modals";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useTicket } from "@/queries/tickets/tickets.query";
import { Input } from "@/components/layout/input";
import { Select } from "@/components/layout/select";
import { usePriorityList } from "@/queries/priorities/priorities.query";
import { useCategotyList } from "@/queries/categories/categories.query";
import { FileInput } from "@/components/layout/fileInput";
import { MdAttachFile } from "react-icons/md";
import { LuPlus, LuImage, LuFile, LuVideo, LuX, LuArchive, LuMessageSquare, LuMessageSquareWarning } from "react-icons/lu";
import { useSaveTicket } from "@/queries/tickets/tickets.mutation";
import { FormErrorMessage } from "@/components/layout/formErrorMessage";

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
        const result = await saveTicket({formData, files});

/*         if(result.error) { 
            setError(result.error);
            return;
        }; */

        closeAllModals();
    }

    return (
        <Modal isOpen>
            <Modal.Backdrop isDismissable={false}>
                <Modal.Container size="lg">
                    <Modal.Dialog className="rounded-lg bg-white/80 backdrop-blur-md">
                        <Modal.Body>

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
                                        <div className="w-full flex flex-row items-end justify-between gap-2 items-stretch">
                                            <div className="flex-1 flex flex-col items-start justify-start gap-2">
                                                <Select
                                                    name="priorityId"
                                                    onChange={changeFormData}
                                                    isRequired={true}
                                                    label="Priority"
                                                    placeholder="Select priority"
                                                    options={priorityList?.map((priority) => {
                                                        return { id: priority.id, textValue: priority.name }
                                                    })}
                                                    defaultValue={formData.priorityId !== "" ? formData.priorityId : undefined}
                                                />
                                                <Select
                                                    name="categoryId"
                                                    onChange={changeFormData}
                                                    isRequired={true}
                                                    label="Category"
                                                    placeholder="Select category"
                                                    options={categoryList?.map((category) => {
                                                        return { id: category.id, textValue: category.name }
                                                    })}
                                                    defaultValue={formData.categoryId !== "" ? formData.categoryId : undefined}
                                                />
                                            </div>
                                            <FileInput
                                                className="w-1/3"
                                                onChange={setFiles}
                                                accept="image/*,text/*,video/*,.zip,.rar,.7z,.tar,.gz"
                                            >
                                                <div className="flex flex-row">
                                                    <MdAttachFile /><LuPlus />
                                                </div>
                                                Attach file
                                            </FileInput>
                                        </div>
                                        {files.length > 0 ? <AttachmentsList files={files} onChange={setFiles} /> : null}
                                    </FieldGroup>
                                </Fieldset>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="w-full flex flex-row items-center justify-end">
                            <Button variant="tertiary" onClick={handleCancelEditing} className={"rounded-lg"}> {/* Jeśli nie ma wprowadzonych danych, poprostu closeModal */}
                                Cancel
                            </Button>
                            <Button className={"rounded-lg bg-sky-700/60"} isDisabled={isFormInvalid()}>
                                Save
                            </Button>

                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}

export const AttachmentsList = ({
    files,
    onChange
}: {
    files: File[],
    onChange: Dispatch<SetStateAction<File[]>>
}) => {

    const removeFile = (fileToRemove: File) => {
        onChange((prev: File[]) => prev.filter((file: File) => file !== fileToRemove));
    };

    const getFileTypeIcon = (file: File) => {
        const iconClasses = "text-xl text-black/60"
        switch (true) {
            case file.type.startsWith("image/"):
                return <LuImage className={iconClasses} />

            case file.type.startsWith("video/"):
                return <LuVideo className={iconClasses} />

            case file.type.startsWith("text/"):
                return <LuFile className={iconClasses} />
            case [
                "application/zip",
                "application/x-rar-compressed",
                "application/vnd.rar",
                "application/x-7z-compressed",
                "application/x-tar",
                "application/gzip"
            ].includes(file.type):
                return <LuArchive className={iconClasses} />
            default:
                return <LuArchive className={iconClasses} />;
        }
    };
    return (
        <div className="w-full flex flex-col items-start justify-center gap-2">
            <div className="flex flex-row items-baseline-last justify-start gap-2">
                <Label className="text-black/70">Attachments</Label>
                <Description className="text-black/50">{"(Accept files: images, text files, videos, archives)"}</Description>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-start items-start gap-2">
                {
                    files.map((file: File) => {
                        return (
                            <div className="p-4 flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm bg-white/60 relative group">
                                {getFileTypeIcon(file)}
                                <p className="text-xs text-black/60">{file.name}</p>
                                <Button variant="ghost" onClick={() => removeFile(file)}
                                    className={"text-xs w-[15px] h-[15px] absolute top-2 right-2 px-1 opacity-0 duration-200 group-hover:opacity-100"}>
                                    <LuX color="red" />
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}