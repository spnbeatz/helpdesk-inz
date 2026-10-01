"use client"

import { useModalStore } from "@/store/modals";

import { ConfirmationModal } from "./ConfirmationModal";
import { TicketFormModal, TicketFormModalProps } from "@/components/features/tickets/modals/TicketFormModal";

import { ConfirmationModalProps } from "./ConfirmationModal";
import { InventoryItemModal, InventoryItemModalType } from "../../features/logistics/modals/InventoryItemModal";


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
                    case "inventoryItem":
                        return (
                            <InventoryItemModal
                                key={modal.id}
                                data={modal.data as InventoryItemModalType}
                            />
                        )

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