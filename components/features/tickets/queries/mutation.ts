import { useMutation } from "@tanstack/react-query";
import { TicketAssignDataType, TicketCloseDataType, TicketFormDataType } from "../types/form.types";
import { useQueryClient } from "@tanstack/react-query";
import { ticketKeys } from "./keys";
import { createTicket, updateTicket } from "@/api/services/tickets.service";
import { ticketsService } from "@/api";
import { useNotificationStore } from "../../notifications/store/index.store";

type SaveTicketDataType = {
    formData: TicketFormDataType;
};

export const useSaveTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formData }: SaveTicketDataType) => {
            return ticketsService.createTicket(formData);
        },
        onSuccess: async (_, { formData }) => {
            await queryClient.invalidateQueries({
                queryKey: ticketKeys.lists()
            });

            if (formData.id) {
                await queryClient.invalidateQueries({
                    queryKey: ticketKeys.detail(formData.id)
                });
            }

            useNotificationStore.getState().success(
                formData.id
                    ? "Ticket has been updated."
                    : "Ticket has been created.",
                "Success"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        },
        onError: async () => {
            useNotificationStore.getState().error(
                "Something went wrong.",
                "Error"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        }
    });
};

export const useDeleteTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ticketId?: string) => {
            return ticketsService.deleteTicket(ticketId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ticketKeys.lists()
            });

            useNotificationStore.getState().success(
                "Ticket has been successfully deleted.",
                "Ticket deleted"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        },
        onError: async () => {
            useNotificationStore.getState().error(
                "Unable to delete the ticket. Please try again.",
                "Delete failed"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        }
    });
};

export const useCloseTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TicketCloseDataType) => {
            return ticketsService.closeTicket(data);
        },
        onSuccess: async (_, data) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ticketKeys.lists()
                }),
                queryClient.invalidateQueries({
                    queryKey: ticketKeys.detail(data.id)
                })
            ]);

            useNotificationStore.getState().success(
                "Ticket has been successfully closed.",
                "Ticket closed"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        },
        onError: async () => {
            useNotificationStore.getState().error(
                "Unable to close the ticket. Please try again.",
                "Close failed"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        }
    });
};

export const useAssignTechnician = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TicketAssignDataType) => {
            return ticketsService.assignTechnician(data);
        },
        onSuccess: async (_, data) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ticketKeys.lists()
                }),
                queryClient.invalidateQueries({
                    queryKey: ticketKeys.detail(data.id)
                })
            ]);

            useNotificationStore.getState().success(
                "Technician has been successfully assigned to the ticket.",
                "Technician assigned"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        },
        onError: async () => {
            useNotificationStore.getState().error(
                "Unable to assign the technician. Please try again.",
                "Assignment failed"
            );

            await queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        }
    });
};