import { Modal } from "@/components/composed/modals/Modal";
import { CancelButton } from "@/components/ui/controls/buttons/CancelButton";
import { ConfirmButton } from "@/components/ui/controls/buttons/ConfirmButton";
import { Autocomplete } from "@/components/ui/controls/inputs/Autocomplete";
import { Column, Row } from "@/components/ui/layout/flex";
import { highlightText } from "@/helpers/highlightText";
import { useSearchUsers } from "@/queries/users/users.query";
import { Avatar, Button, Description, Key, Label } from "@heroui/react";
import { useState } from "react";
import { useAssignTechnician } from "../queries/mutation";
import { useModalStore } from "@/store/modals";

export type TicketAssignModalProps = {
    ticketId?: string
}

export const TicketAssignModal = ({ data }: { data?: TicketAssignModalProps }) => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<Key | null>(null);
    const { closeModal } = useModalStore();

    const { data: usersData } = useSearchUsers({ searchValue, roleNames: ["Technician"] });
    const { mutateAsync: assignTechnician } = useAssignTechnician();

    const selectUser = (key: Key | null) => {
        setSelectedValue(key)
    }

    const onConfirm = () => {
        if(!data?.ticketId) return null; 

        assignTechnician({
            id: data?.ticketId,
            technician_id: selectedValue as string,
            status: "in_progress"
        })

        closeModal();
    }



    if (!data?.ticketId) return null;

    return (
        <Modal>
            <Column Start className="gap-4 w-full">
                <Column Start>
                    <Label>Assign technician</Label>
                    <Description>Please select user to assign to ticket.</Description>
                </Column>

                <Autocomplete
                    items={usersData?.items || []}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholder="Select user..."
                    onChange={selectUser}
                    getItemId={(item) => item.id}
                    renderItem={(item) => <AutocompleteUser name={`${item.firstName} ${item.lastName}`} avatar={item.avatarUrl || ""} email={item.email} />}
                />
                <Row CenterEnd className="w-full gap-2">
                    <CancelButton onClick={() => closeModal()} />
                    <ConfirmButton onClick={onConfirm} />
                </Row>
            </Column>

        </Modal>
    )
}

export const AutocompleteUser = ({ name, avatar, email }: { name: string, avatar: string, email: string }) => {
    return (
        <Row CenterBetween className="gap-2 w-full">
            <Row Start className="gap-2">
                <Avatar className="w-6 h-6">
                    <Avatar.Image src={avatar} />
                </Avatar>
                <Label className="font-normal">{name}</Label>
            </Row>
            <Description>{email}</Description>
        </Row>
    )
}