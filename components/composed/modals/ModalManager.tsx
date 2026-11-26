"use client"

import { useModalStore } from "@/store/modals";

import dynamic from "next/dynamic";

export const ConfirmationModal = dynamic(() =>
    import("./ConfirmationModal").then(mod => mod.ConfirmationModal)
);

export const TicketFormModal = dynamic(() =>
    import("@/components/features/tickets/modals/TicketFormModal")
        .then(mod => mod.TicketFormModal)
);

export const TicketAssignModal = dynamic(() =>
    import("@/components/features/tickets/modals/TicketAssignModal")
        .then(mod => mod.TicketAssignModal)
);

export const InventoryItemModal = dynamic(() =>
    import("../../features/logistics/inventory/modals/InventoryItemModal")
        .then(mod => mod.InventoryItemModal)
);

export const TicketViewModal = dynamic(() =>
    import("@/components/features/tickets/modals/TicketViewModal")
        .then(mod => mod.TicketViewModal)
);

export const CustomerInfoModal = dynamic(() =>
    import("@/components/features/customers/modals/CustomerInfoModal")
        .then(mod => mod.CustomerInfoModal)
);

export const CreateOrderModal = dynamic(() =>
    import("@/components/features/logistics/orders/modals/CreateOrderModal")
        .then(mod => mod.CreateOrderModal)
);

export const OrderViewModal = dynamic(() =>
    import("@/components/features/logistics/orders/modals/OrderViewModal")
        .then(mod => mod.OrderViewModal)
);

export const ApproveOrderModal = dynamic(() =>
    import("@/components/features/logistics/orders/modals/ApproveOrderModal")
        .then(mod => mod.ApproveOrderModal)
);

export const DeclineOrderModal = dynamic(() =>
    import("@/components/features/logistics/orders/modals/DeclineOrderModal")
        .then(mod => mod.DeclineOrderModal)
);

export const CreateUserModal = dynamic(() =>
    import("@/components/features/settings/users/modals/CreateUserModal")
        .then(mod => mod.CreateUserModal)
);

import { TicketFormModalProps } from "@/components/features/tickets/modals/TicketFormModal";

import { ConfirmationModalProps } from "./ConfirmationModal";
import { InventoryItemModalType } from "../../features/logistics/inventory/modals/InventoryItemModal";
import { TicketViewModalProps } from "@/components/features/tickets/modals/TicketViewModal";
import { CustomerInfoModalType } from "@/components/features/customers/modals/CustomerInfoModal";
import { CreateOrderModalType } from "@/components/features/logistics/orders/modals/CreateOrderModal";
import { OrderViewModalType } from "@/components/features/logistics/orders/modals/OrderViewModal";
import { ModalDataType } from "./types";
import { TicketAttachmentsModal, TicketAttachmentsModalProps } from "@/components/features/tickets/modals/TicketAttachmentsModal";
import { TicketAssignModalProps } from "@/components/features/tickets/modals/TicketAssignModal";


export const ModalManager = () => {
    const modals = useModalStore(state => state.modals);

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
                        );
                    case "createOrder":
                        return (
                            <CreateOrderModal
                                key={modal.id}
                                data={modal.data as CreateOrderModalType}
                            />
                        )
                    case "viewOrder":
                        return (
                            <OrderViewModal
                                key={modal.id}
                                data={modal.data as OrderViewModalType}
                            />
                        )

                    case "approveOrder":
                        return (
                            <ApproveOrderModal
                                key={modal.id}
                                data={modal.data as ModalDataType}
                            />
                        )
                    case "declineOrder":
                        return (
                            <DeclineOrderModal
                                key={modal.id}
                                data={modal.data as ModalDataType}
                            />
                        )
                    case "createUser":
                        return (
                            <CreateUserModal key={modal.id} />
                        )
                    case "ticketAttachments":
                        return (
                            <TicketAttachmentsModal 
                                key={modal.id}
                                data={modal.data as TicketAttachmentsModalProps}
                            />
                        )

                    case "assignTechnician":
                        return (
                            <TicketAssignModal 
                                key={modal.id}
                                data={modal.data as TicketAssignModalProps}
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