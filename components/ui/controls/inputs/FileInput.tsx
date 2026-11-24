"use client";

import { ChangeEvent, useRef } from "react";
import { Column, Row } from "../../layout/flex";
import { AttachmentListItem } from "../../data-display/attachments/AttachmentListItem";
import { Description, Label } from "@heroui/react";

type FileInputProps = {
    className?: string;
    accept: string;
    name: string;
    value?: File[];
    onChange?: (files: File[]) => void;
    label?: string;
    description?: string;
};

export const FileInput = ({
    className,
    accept,
    name,
    value = [],
    onChange,
    label,
    description
}: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const setSelectedFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []);

        if (!selectedFiles.length) return;

        onChange?.([...value, ...selectedFiles]);

        e.target.value = "";
    };

    const removeFile = (fileToRemove: File) => {
        onChange?.(value.filter(file => file !== fileToRemove));
    };

    return (
        <Column StartCenter className={`w-full gap-2 ${className ?? ""}`}>
            <Row Start className="items-baseline-last gap-2">
                {label && <Label className="text-black/70">{label}</Label>}
                {description && (
                    <Description className="text-black/50">
                        {description}
                    </Description>
                )}
            </Row>

            <Row Start className="flex-wrap gap-2 w-full">
                {value.map((file, index) => (
                    <AttachmentListItem
                        key={`${file.name}-${file.lastModified}-${index}`}
                        file={file}
                        onRemoveItem={removeFile}
                    />
                ))}

                <Column
                    Center
                    className="bg-white/60 hover:bg-white duration-200 cursor-pointer shadow-sm rounded-lg min-w-28 min-h-20"
                    onClick={() => inputRef.current?.click()}
                >
                    <span className="text-sm">+ Add files</span>
                </Column>
            </Row>

            <input
                ref={inputRef}
                name={name}
                type="file"
                accept={accept}
                multiple
                hidden
                onChange={setSelectedFiles}
            />
        </Column>
    );
};