import { create } from "zustand";

type ModalType =
    | "createTicket"
    | "ticketForm"
    | "deleteTicket"
    | "ticketDetails"
    | "confirmation"
    | "inventoryItem";

type Modal = {
    id: string;
    type: ModalType;
    data?: unknown;
};

type ModalStateType = {
    modals: Modal[];

    openModal: (type: ModalType, data?: unknown) => void;
    closeModal: () => void;
    closeAllModals: () => void;
};

export const useModalStore = create<ModalStateType>((set) => ({
    modals: [],

    openModal: (type, data) =>
        set((state) => ({
            modals: [
                ...state.modals,
                {
                    id: crypto.randomUUID(),
                    type,
                    data,
                },
            ],
        })),

    closeModal: () =>
        set((state) => ({
            modals: state.modals.slice(0, -1),
        })),

    closeAllModals: () =>
        set({
            modals: [],
        }),
}));