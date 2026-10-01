import { Dispatch, SetStateAction } from "react";
import { Label, Description, Button, } from "@heroui/react";
import { Row, Column } from "../../layout/flex";
import { AttachmentListItem } from "./AttachmentListItem";

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

    return (
        <Column StartCenter className="w-full gap-2">
            <Row Start className="items-baseline-last gap-2">
                <Label className="text-black/70">Attachments</Label>
                <Description className="text-black/50">{"(Accept files: images, text files, videos, archives)"}</Description>
            </Row>
            <Row Start className="flex-wrap gap-2">
                {files.map((file: File) => (
                    <AttachmentListItem file={file} onRemoveItem={removeFile} />
                ))}
            </Row>
        </Column>

    )
}