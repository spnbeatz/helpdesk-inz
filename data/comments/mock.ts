import type { Comment, CommentView } from "./type";
import { type UserType, type UserMinType, usersList } from "@/data/users";

import { ticketsList, type TicketType } from "../exampleTicketsList";

export type CommentContentType = "ticket";


const technicians = [
    "USR-001",
    "USR-002",
    "USR-003",
    "USR-015",
    "USR-023",
];

const customerMessages = [
    "Dziękuję za informację.",
    "Problem nadal występuje.",
    "Czy wiadomo już, kiedy problem zostanie rozwiązany?",
    "Dodałem wymagane informacje.",
    "Mogę udostępnić komputer do zdalnej diagnostyki.",
];

const technicianUpdates = [
    "Sprawdzam zgłoszenie i analizuję przyczynę problemu.",
    "Rozpocząłem diagnostykę. Dam znać po ustaleniu przyczyny.",
    "Weryfikuję konfigurację stanowiska.",
    "Sprawdzam ustawienia oraz dostępność wymaganych usług.",
];

const internalNotes = [
    "Do sprawdzenia podczas dalszej diagnostyki.",
    "W razie potrzeby skonsultować problem z administratorem.",
    "Zgłoszenie wymaga weryfikacji konfiguracji użytkownika.",
];

const resolutions = [
    "Problem został rozwiązany. Proszę o sprawdzenie, czy wszystko działa poprawnie.",
    "Wprowadziłem poprawki i zweryfikowałem działanie usługi.",
    "Konfiguracja została poprawiona. Stanowisko działa prawidłowo.",
    "Usunąłem przyczynę problemu i przeprowadziłem test działania.",
];

const confirmations = [
    "Potwierdzam, wszystko działa prawidłowo.",
    "Dziękuję, problem został rozwiązany.",
    "Sprawdziłem ponownie. Mogę już normalnie pracować.",
];

const seedFromId = (id: string): number =>
    Number(id.replace(/\D/g, "")) || 1;

const pick = <T,>(
    items: T[],
    seed: number
): T => items[seed % items.length];

const addMinutes = (
    date: string,
    minutes: number
): string => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);

    return result.toISOString();
};

const createComment = (
    ticket: TicketType,
    index: number,
    senderId: string,
    value: string,
    createdAt: string,
    publicComment = true,
    parentId: string | null = null
): Comment => ({
    id: `COM-${ticket.id.replace("TCK-", "")}-${String(index).padStart(2, "0")}`,
    value,
    sender_id: senderId,
    content_id: ticket.id,
    content_type: "ticket",
    parent_id: parentId,
    created_at: createdAt,
    updated_at: createdAt,
    public: publicComment,
    deleted_at: null,
});

export const generateComments = (
    tickets: TicketType[],
    users: UserType[]
): Comment[] => {
    const comments: Comment[] = [];

    tickets.forEach(ticket => {
        const seed = seedFromId(ticket.id);
        const customerId = ticket.customer_id;

        const technicianId =
            ticket.technician_id &&
                users.some(user => user.id === ticket.technician_id)
                ? ticket.technician_id
                : null;

        let index = 1;

        // 1. Pierwszy komentarz klienta
        const initialComment = createComment(
            ticket,
            index++,
            customerId,
            ticket.description,
            ticket.created_at
        );

        comments.push(initialComment);

        // Ticket bez przypisanego technika
        if (!technicianId) {
            if (seed % 3 !== 0) {
                comments.push(
                    createComment(
                        ticket,
                        index++,
                        customerId,
                        pick(customerMessages, seed + 2),
                        addMinutes(ticket.created_at, 60 + seed % 240),
                        true,
                        initialComment.id
                    )
                );
            }

            return;
        }

        // 2. Odpowiedź technika
        const technicianComment = createComment(
            ticket,
            index++,
            technicianId,
            pick(technicianUpdates, seed),
            addMinutes(ticket.created_at, 20 + seed % 120),
            true,
            initialComment.id
        );

        comments.push(technicianComment);

        // 3. Dodatkowa notatka wewnętrzna
        if (seed % 2 === 0) {
            comments.push(
                createComment(
                    ticket,
                    index++,
                    technicianId,
                    pick(internalNotes, seed + 1),
                    addMinutes(ticket.created_at, 40 + seed % 180),
                    false,
                    technicianComment.id
                )
            );
        }

        // Status: pending
        if (ticket.status === "pending") {
            if (seed % 2 === 1) {
                comments.push(
                    createComment(
                        ticket,
                        index++,
                        customerId,
                        pick(customerMessages, seed + 3),
                        addMinutes(ticket.created_at, 180 + seed % 300),
                        true,
                        technicianComment.id
                    )
                );
            }

            return;
        }

        // 4. Aktualizacja technika dla in_progress
        if (ticket.status === "in_progress") {
            comments.push(
                createComment(
                    ticket,
                    index++,
                    technicianId,
                    pick(technicianUpdates, seed + 2),
                    addMinutes(ticket.created_at, 240 + seed % 300),
                    true,
                    technicianComment.id
                )
            );

            if (seed % 2 === 0) {
                comments.push(
                    createComment(
                        ticket,
                        index++,
                        customerId,
                        pick(customerMessages, seed + 4),
                        addMinutes(ticket.created_at, 360 + seed % 240),
                        true
                    )
                );
            }

            return;
        }

        // Status: resolved
        if (ticket.status === "resolved") {
            const resolvedAt =
                ticket.resolved_at ?? ticket.updated_at;

            comments.push(
                createComment(
                    ticket,
                    index++,
                    technicianId,
                    pick(resolutions, seed),
                    resolvedAt,
                    true,
                    technicianComment.id
                )
            );

            if (seed % 2 === 0) {
                comments.push(
                    createComment(
                        ticket,
                        index++,
                        customerId,
                        pick(confirmations, seed + 1),
                        addMinutes(resolvedAt, 10),
                        true
                    )
                );
            }
        }
    });

    return comments.sort(
        (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
    );
};

const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("pl-PL", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
};

const getUserMin = (user: UserType): UserMinType => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    avatarUrl: user.avatarUrl,
});

export const mapCommentToView = (
    comment: Comment,
    users: UserType[]
): CommentView => {
    const user = users.find(
        user => user.id === comment.sender_id
    );

    const sender: UserMinType = user
        ? getUserMin(user)
        : {
            id: comment.sender_id,
            name: "Nieznany użytkownik",
            avatarUrl: null,
        };

    return {
        ...comment,

        sender,
        senderName: sender.name,
        senderAvatarUrl: sender.avatarUrl,

        isEdited: comment.updated_at !== comment.created_at,
        isDeleted: comment.deleted_at !== null,
        isPublic: comment.public,

        createdAtLabel: formatDate(comment.created_at),
        updatedAtLabel: comment.updated_at ? formatDate(comment.updated_at) : undefined,

        visibilityLabel: comment.public
            ? "Publiczny"
            : "Wewnętrzny",
    };
};

export const mapCommentsToView = (
    comments: Comment[],
    users: UserType[]
): CommentView[] => {
    return comments
        .map(comment => mapCommentToView(comment, users))
        .sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
        );
};

// Surowa lista komentarzy
export const commentsList = generateComments(
    ticketsList,
    usersList
);

// Lista gotowa do wyświetlenia
export const commentsViewList = mapCommentsToView(
    commentsList,
    usersList
);