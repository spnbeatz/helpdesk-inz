"use client"

import { Modal } from "@/components/composed/modals/Modal"
import { ModalDataType } from "@/components/composed/modals/types"
import { Button } from "@/components/ui/controls/buttons/Button"
import { Input } from "@/components/ui/controls/inputs/Input"
import { Column, Row } from "@/components/ui/layout/flex"
import { useModalStore } from "@/store/modals"
import { Description, Label, TextField } from "@heroui/react"
import { useState } from "react"

export const ApproveOrderModal = ({ data }: { data: ModalDataType }) => {
    const [note, setNote] = useState<string>("");

    const { closeAllModals, openModal } = useModalStore();

    const canClose = note.length < 1;

    const close = () => {
        if(canClose) {
            closeAllModals();
            return
        };
        openModal("confirmation", {
            title: "Discard changes?",
            description: "The changes will not save",
            iconType: "warning",
            confirmAction: () => closeAllModals()
        })
    }

    return (
        <Modal isOpen isDismissable onOpenChange={(isOpen) => {
            close();
        }}>
            <Column Start className="w-full gap-4">
                <Column Start className="gap-2">
                    <Label className="text-2xl text-black/70">Approve order</Label>
                </Column>

                <Input
                    label="Decision note (optional)"
                    type="textarea"
                    rows={5}
                    value={note}
                    onInput={(v) => setNote(v)}
                    placeholder="Write a description..."
                />
                <Row CenterEnd className="w-full">
                    <Button variant="ghost" onClick={close}>Cancel</Button>
                    <Button variant="primary" className={"bg-indigo-400"} onClick={() => console.log("closed")}>Approve</Button>
                </Row>
            </Column>

        </Modal>
    )
}