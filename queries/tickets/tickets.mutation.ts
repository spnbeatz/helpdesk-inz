import { useMutation } from "@tanstack/react-query";
import { TicketFormDataType } from "@/components/modals/tickets/TicketFormModal";
import { useQueryClient } from "@tanstack/react-query";
import { ticketKeys } from "./tickets.keys";
import { createTicket, updateTicket } from "@/api/services/tickets.service";

type SaveTicketDataType = {
    formData: TicketFormDataType;
    files: File[];
};

export const useSaveTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formData, files }: SaveTicketDataType) => {
            if (formData.id) {
                return updateTicket(formData, files);
            }

            return createTicket(formData, files);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ticketKeys.lists()
            });
        }
    });
};