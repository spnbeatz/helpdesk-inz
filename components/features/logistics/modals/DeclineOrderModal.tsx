"use client"

import { Modal } from "@/components/composed/modals/Modal"
import { ModalDataType } from "@/components/composed/modals/types"
import { Button } from "@/components/ui/controls/buttons/Button"
import { Input } from "@/components/ui/controls/inputs/Input"
import { Column, Row } from "@/components/ui/layout/flex"
import { useModalStore } from "@/store/modals"
import { Description, Label, TextField } from "@heroui/react"
import { useState } from "react"

export const DeclineOrderModal = ({ data }: { data: ModalDataType }) => {
    const [justification, setJustification] = useState<string>("");

    const { closeAllModals, openModal } = useModalStore();

    const canClose = justification.length < 1;

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
                    <Label className="text-2xl text-black/70">Decline order</Label>
                    <Description>Please add decline justification</Description>
                </Column>

                <Input
                    isRequired
                    label="Justification"
                    type="textarea"
                    rows={5}
                    value={justification}
                    onInput={(v) => setJustification(v)}
                    placeholder="Write a justification..."
                />
                <Row CenterEnd className="w-full">
                    <Button variant="ghost" onClick={close}>Cancel</Button>
                    <Button variant="danger" onClick={() => console.log("closed")}>Decline</Button>
                </Row>
            </Column>

        </Modal>
    )
}