"use client";

import { Row } from "@/components/ui/layout/flex";
import { FormControl } from "./FormControl";
import { FormProps } from "./types";
import { Button, Description, FieldGroup, Fieldset, Form as HForm } from "@heroui/react";
import { useRef, useState } from "react";
import { useModalStore } from "@/store/modals";

export const Form = <T extends object,>({
    config,
    onSubmit,
    children
}: FormProps<T>) => {

    const formRef = useRef<HTMLFormElement>(null);

    const [files, setFiles] = useState<Record<string, File[]>>({});

    const { closeAllModals, openModal } = useModalStore();


    const handleFilesChange = (name: string, selectedFiles: File[]) => {
        setFiles(prev => ({
            ...prev,
            [name]: selectedFiles
        }));
    };

    const handleSubmitForm = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Record<string, unknown> = {};

        formData.forEach((value, key) => {
            if (value instanceof File) return;

            data[key] = value;
        });

        Object.entries(files).forEach(([key, value]) => {
            data[key] = value;
        });

        onSubmit(data as T);
    };

    const handleCancelForm = () => {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        const hasValues = Array.from(formData.values()).some(value =>
            value.toString().trim().length > 0
        );

        if (hasValues) {
            openModal("confirmation", {
                iconType: "warning",
                title: "Discard changes?",
                confirmAction: () => closeAllModals(),
                confirmButtonText: "Yes"
            })
            return;
        }

        closeAllModals();
    };

    return (
        <HForm onSubmit={handleSubmitForm} ref={formRef}>
            <Fieldset>
                {config.title &&
                    <Fieldset.Legend>{config.title}</Fieldset.Legend>}
                {config.description &&
                    <Description>{config.description}</Description>}

                <FieldGroup>
                    {config.fields.map(field => (
                        <FormControl
                            key={String(field.name)}
                            {...field}
                            onFilesChange={handleFilesChange}
                            files={files}
                        />
                    ))}
                    {children}
                </FieldGroup>
                <Fieldset.Actions>
                    <Row CenterEnd className="w-full gap-2">
                        <Button onClick={handleCancelForm} variant="secondary" className={"rounded-lg shadow-sm text-indigo-400"}>
                            Cancel
                        </Button>
                        <Button type="submit" className={"rounded-lg shadow-sm bg-indigo-400/60"}>
                            {config.submitButtonText}
                        </Button>
                    </Row>

                </Fieldset.Actions>
            </Fieldset>
        </HForm>
    );
};