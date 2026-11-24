import { Modal } from "@/components/composed/modals/Modal";
import { CreateUserForm } from "../forms/CreateUserForm";

export const CreateUserModal = () => {
    return (
        <Modal isOpen>
            <CreateUserForm />
        </Modal>
    )
}