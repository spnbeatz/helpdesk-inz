"use client"

import { useModalStore } from "@/store/modals";

import { ConfirmationModal } from "./ConfirmationModal";
import { TicketFormModal } from "./tickets/TicketFormModal";

import { ConfirmationModalProps } from "./ConfirmationModal";
import { TicketFormModalProps } from "./tickets/TicketFormModal";


export const ModalManager = () => {
    const { modals } = useModalStore();

    return (
        <>
            {modals.map((modal) => {
                switch (modal.type) {
                    case "ticketForm":
                        return (
                            <TicketFormModal
                                key={modal.id}
                                data={modal.data as TicketFormModalProps}
                            />
                        );

                    case "confirmation":
                        return (
                            <ConfirmationModal
                                key={modal.id}
                                data={modal.data as ConfirmationModalProps}
                            />
                        );

/*                     case "deleteTicket":
                        return (
                            <DeleteTicketModal
                                key={modal.id}
                                data={modal.data}
                            />
                        ); */

                    default:
                        return null;
                }
            })}
        </>
    );
};