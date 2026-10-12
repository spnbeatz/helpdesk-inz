"use client"

import { useModalStore } from "@/store/modals";

import { ConfirmationModal } from "./ConfirmationModal";
import { TicketFormModal, TicketFormModalProps } from "@/components/features/tickets/modals/TicketFormModal";

import { ConfirmationModalProps } from "./ConfirmationModal";
import { InventoryItemModal, InventoryItemModalType } from "../../features/logistics/modals/InventoryItemModal";
import { TicketViewModal, TicketViewModalProps } from "@/components/features/tickets/modals/TicketViewModal";
import { CustomerInfoModal, CustomerInfoModalType } from "@/components/features/customers/modals/CustomerInfoModal";


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
                    case "viewTicket":
                        return (
                            <TicketViewModal
                                key={modal.id}
                                data={modal.data as TicketViewModalProps}
                            />
                        );
                    case "customerInfo":
                        return (
                            <CustomerInfoModal
                                key={modal.id}
                                data={modal.data as CustomerInfoModalType}
                            />
                        )

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