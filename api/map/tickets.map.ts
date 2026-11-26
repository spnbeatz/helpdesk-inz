import { TicketType } from "@/data/exampleTicketsList";
import { usersList } from "@/data/users";
import { priorityList } from "@/data/priorityList";
import { categoryList } from "@/data/categoryList";



export const mapTickets = (tickets: TicketType[]) => {
    return tickets.map(ticket => {
        return mapTicket(ticket);
    });
} 

export const mapTicket = (ticket: TicketType) => {
        const user = usersList.find(
            user => user.id === ticket.customer_id
        );

        if (!user) {
            throw new Error(
                `Customer not found for ticket ${ticket.id}`
            );
        }

        return {
            ...ticket,

            priority: priorityList.find(
                priority => priority.id === ticket.priorityId
            )?.name,

            category: categoryList.find(
                category => category.id === ticket.categoryId
            )?.name,

            customer: {
                id: user.id,
                email: user.email,
                avatarUrl: user.avatarUrl ?? "",
                name: `${user.firstName} ${user.lastName}`
            }
        };
}