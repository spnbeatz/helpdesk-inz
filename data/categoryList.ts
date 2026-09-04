export type TicketCategoryType = {
    id: string;
    name: string;
    description?: string;
};

export const categoryList: TicketCategoryType[] = [
    {
        id: "CAT-001",
        name: "Hardware",
        description: "Problems with computers, laptops, monitors and other hardware",
    },
    {
        id: "CAT-002",
        name: "Software",
        description: "Problems with applications and installed software",
    },
    {
        id: "CAT-003",
        name: "Network",
        description: "Internet, Wi-Fi, LAN and network connectivity issues",
    },
    {
        id: "CAT-004",
        name: "Accounts & Access",
        description: "User accounts, passwords, permissions and access",
    },
    {
        id: "CAT-005",
        name: "Email",
        description: "Email, mailbox and email configuration issues",
    },
    {
        id: "CAT-006",
        name: "Printers",
        description: "Printers, scanners and printing problems",
    },
    {
        id: "CAT-007",
        name: "Security",
        description: "Security incidents, suspicious activity and security requests",
    },
    {
        id: "CAT-008",
        name: "System & OS",
        description: "Windows, macOS, Linux and operating system issues",
    },
    {
        id: "CAT-009",
        name: "Configuration",
        description: "Computer and software configuration requests",
    },
    {
        id: "CAT-010",
        name: "Other",
        description: "Issues that do not fit into another category",
    },
];