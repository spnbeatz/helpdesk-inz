export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: "active" | "inactive" | "blocked";
    department: string;
    position: string;
    location: string;
    avatarUrl: string | null;
    createdAt: string;
    lastLoginAt: string | null;
};

export const usersList: UserType[] = [
    {
        id: "USR-001",
        firstName: "Adam",
        lastName: "Kowalski",
        email: "adam.kowalski@company.pl",
        phone: "+48 501 234 101",
        status: "active",
        department: "IT",
        position: "IT Administrator",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2023-01-12T08:30:00Z",
        lastLoginAt: "2026-09-10T07:42:00Z",
    },
    {
        id: "USR-002",
        firstName: "Michał",
        lastName: "Nowak",
        email: "michal.nowak@company.pl",
        phone: "+48 502 341 221",
        status: "active",
        department: "IT",
        position: "IT Support Specialist",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2023-03-18T10:15:00Z",
        lastLoginAt: "2026-09-11T06:58:00Z",
    },
    {
        id: "USR-003",
        firstName: "Piotr",
        lastName: "Wiśniewski",
        email: "piotr.wisniewski@company.pl",
        phone: "+48 503 672 315",
        status: "active",
        department: "IT",
        position: "Helpdesk Technician",
        location: "Poznań",
        avatarUrl: null,
        createdAt: "2023-06-02T09:20:00Z",
        lastLoginAt: "2026-09-10T15:31:00Z",
    },
    {
        id: "USR-004",
        firstName: "Anna",
        lastName: "Lewandowska",
        email: "anna.lewandowska@company.pl",
        phone: "+48 504 821 443",
        status: "active",
        department: "Sales",
        position: "Sales Manager",
        location: "Kraków",
        avatarUrl: null,
        createdAt: "2023-02-21T11:45:00Z",
        lastLoginAt: "2026-09-10T12:18:00Z",
    },
    {
        id: "USR-005",
        firstName: "Tomasz",
        lastName: "Wójcik",
        email: "tomasz.wojcik@company.pl",
        phone: "+48 505 194 552",
        status: "active",
        department: "Finance",
        position: "Financial Analyst",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2023-08-14T07:50:00Z",
        lastLoginAt: "2026-09-09T09:12:00Z",
    },
    {
        id: "USR-006",
        firstName: "Katarzyna",
        lastName: "Kamińska",
        email: "katarzyna.kaminska@company.pl",
        phone: "+48 506 728 661",
        status: "active",
        department: "HR",
        position: "HR Specialist",
        location: "Gdańsk",
        avatarUrl: null,
        createdAt: "2024-01-09T13:10:00Z",
        lastLoginAt: "2026-09-11T08:03:00Z",
    },
    {
        id: "USR-007",
        firstName: "Paweł",
        lastName: "Zieliński",
        email: "pawel.zielinski@company.pl",
        phone: "+48 507 315 772",
        status: "active",
        department: "Marketing",
        position: "Marketing Specialist",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2024-02-17T10:30:00Z",
        lastLoginAt: "2026-09-08T14:44:00Z",
    },
    {
        id: "USR-008",
        firstName: "Magdalena",
        lastName: "Dąbrowska",
        email: "magdalena.dabrowska@company.pl",
        phone: "+48 508 462 883",
        status: "active",
        department: "Legal",
        position: "Legal Specialist",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2024-03-11T09:05:00Z",
        lastLoginAt: "2026-09-10T10:22:00Z",
    },
    {
        id: "USR-009",
        firstName: "Jakub",
        lastName: "Szymański",
        email: "jakub.szymanski@company.pl",
        phone: "+48 509 583 994",
        status: "active",
        department: "Operations",
        position: "Operations Specialist",
        location: "Wrocław",
        avatarUrl: null,
        createdAt: "2024-04-23T08:40:00Z",
        lastLoginAt: "2026-09-09T16:11:00Z",
    },
    {
        id: "USR-010",
        firstName: "Natalia",
        lastName: "Woźniak",
        email: "natalia.wozniak@company.pl",
        phone: "+48 510 624 105",
        status: "active",
        department: "Sales",
        position: "Account Manager",
        location: "Poznań",
        avatarUrl: null,
        createdAt: "2024-05-06T12:20:00Z",
        lastLoginAt: "2026-09-11T07:35:00Z",
    },
    {
        id: "USR-011",
        firstName: "Krzysztof",
        lastName: "Jankowski",
        email: "krzysztof.jankowski@company.pl",
        phone: "+48 511 735 216",
        status: "active",
        department: "Logistics",
        position: "Logistics Coordinator",
        location: "Łódź",
        avatarUrl: null,
        createdAt: "2024-06-18T14:15:00Z",
        lastLoginAt: "2026-09-10T11:46:00Z",
    },
    {
        id: "USR-012",
        firstName: "Joanna",
        lastName: "Mazur",
        email: "joanna.mazur@company.pl",
        phone: "+48 512 846 327",
        status: "active",
        department: "Administration",
        position: "Office Administrator",
        location: "Kraków",
        avatarUrl: null,
        createdAt: "2024-07-04T08:55:00Z",
        lastLoginAt: "2026-09-10T08:31:00Z",
    },
    {
        id: "USR-013",
        firstName: "Marcin",
        lastName: "Kaczmarek",
        email: "marcin.kaczmarek@company.pl",
        phone: "+48 513 957 438",
        status: "inactive",
        department: "Sales",
        position: "Sales Representative",
        location: "Wrocław",
        avatarUrl: null,
        createdAt: "2023-11-19T10:40:00Z",
        lastLoginAt: "2026-07-21T13:19:00Z",
    },
    {
        id: "USR-014",
        firstName: "Monika",
        lastName: "Król",
        email: "monika.krol@company.pl",
        phone: "+48 514 168 549",
        status: "active",
        department: "Finance",
        position: "Accountant",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2024-08-12T11:25:00Z",
        lastLoginAt: "2026-09-09T07:58:00Z",
    },
    {
        id: "USR-015",
        firstName: "Daniel",
        lastName: "Wieczorek",
        email: "daniel.wieczorek@company.pl",
        phone: "+48 515 279 650",
        status: "active",
        department: "IT",
        position: "System Administrator",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2023-05-27T09:30:00Z",
        lastLoginAt: "2026-09-11T08:19:00Z",
    },
    {
        id: "USR-016",
        firstName: "Aleksandra",
        lastName: "Pawlak",
        email: "aleksandra.pawlak@company.pl",
        phone: "+48 516 381 761",
        status: "blocked",
        department: "Marketing",
        position: "Content Specialist",
        location: "Gdańsk",
        avatarUrl: null,
        createdAt: "2024-09-02T12:05:00Z",
        lastLoginAt: "2026-08-28T09:41:00Z",
    },
    {
        id: "USR-017",
        firstName: "Robert",
        lastName: "Lis",
        email: "robert.lis@company.pl",
        phone: "+48 517 492 872",
        status: "active",
        department: "Operations",
        position: "Operations Manager",
        location: "Łódź",
        avatarUrl: null,
        createdAt: "2023-09-15T08:10:00Z",
        lastLoginAt: "2026-09-10T16:02:00Z",
    },
    {
        id: "USR-018",
        firstName: "Karolina",
        lastName: "Adamczyk",
        email: "karolina.adamczyk@company.pl",
        phone: "+48 518 503 983",
        status: "active",
        department: "HR",
        position: "Recruitment Specialist",
        location: "Poznań",
        avatarUrl: null,
        createdAt: "2024-10-08T09:45:00Z",
        lastLoginAt: "2026-09-11T07:12:00Z",
    },
    {
        id: "USR-019",
        firstName: "Łukasz",
        lastName: "Górski",
        email: "lukasz.gorski@company.pl",
        phone: "+48 519 614 194",
        status: "active",
        department: "Engineering",
        position: "Software Engineer",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2024-11-16T13:35:00Z",
        lastLoginAt: "2026-09-11T08:27:00Z",
    },
    {
        id: "USR-020",
        firstName: "Weronika",
        lastName: "Rutkowska",
        email: "weronika.rutkowska@company.pl",
        phone: "+48 520 725 205",
        status: "active",
        department: "Engineering",
        position: "QA Engineer",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2025-01-13T10:20:00Z",
        lastLoginAt: "2026-09-10T09:47:00Z",
    },
    {
        id: "USR-021",
        firstName: "Mateusz",
        lastName: "Błaszczyk",
        email: "mateusz.blaszczyk@company.pl",
        phone: "+48 521 836 316",
        status: "active",
        department: "Engineering",
        position: "DevOps Engineer",
        location: "Kraków",
        avatarUrl: null,
        createdAt: "2025-02-24T07:45:00Z",
        lastLoginAt: "2026-09-11T08:08:00Z",
    },
    {
        id: "USR-022",
        firstName: "Patrycja",
        lastName: "Sikora",
        email: "patrycja.sikora@company.pl",
        phone: "+48 522 947 427",
        status: "active",
        department: "Administration",
        position: "Administrative Specialist",
        location: "Gdańsk",
        avatarUrl: null,
        createdAt: "2025-03-09T11:10:00Z",
        lastLoginAt: "2026-09-09T12:26:00Z",
    },
    {
        id: "USR-023",
        firstName: "Grzegorz",
        lastName: "Pietrzak",
        email: "grzegorz.pietrzak@company.pl",
        phone: "+48 523 158 538",
        status: "active",
        department: "IT",
        position: "Network Administrator",
        location: "Warszawa",
        avatarUrl: null,
        createdAt: "2023-07-31T08:35:00Z",
        lastLoginAt: "2026-09-11T06:45:00Z",
    },
    {
        id: "USR-024",
        firstName: "Ewa",
        lastName: "Ostrowska",
        email: "ewa.ostrowska@company.pl",
        phone: "+48 524 269 649",
        status: "inactive",
        department: "Legal",
        position: "Legal Assistant",
        location: "Kraków",
        avatarUrl: null,
        createdAt: "2024-02-05T14:50:00Z",
        lastLoginAt: "2026-06-18T10:12:00Z",
    },
];

export type RoleType = {
    id: string;
    name: string;
    description: string;
};

export type UserRoleType = {
    userId: string;
    roleId: string;
};

export type PermissionType = {
    id: string;
    name: string;
    description: string;
};

export type RolePermissionType = {
    roleId: string;
    permissionId: string;
};

export const permissionsList: PermissionType[] = [
    // Tickets
    {
        id: "PERM-001",
        name: "tickets.view",
        description: "View tickets",
    },
    {
        id: "PERM-002",
        name: "tickets.create",
        description: "Create tickets",
    },
    {
        id: "PERM-003",
        name: "tickets.edit",
        description: "Edit tickets",
    },
    {
        id: "PERM-004",
        name: "tickets.delete",
        description: "Delete tickets",
    },
    {
        id: "PERM-005",
        name: "tickets.assign",
        description: "Assign tickets to technicians",
    },
    {
        id: "PERM-006",
        name: "tickets.close",
        description: "Close tickets",
    },

    // Users
    {
        id: "PERM-007",
        name: "users.view",
        description: "View users",
    },
    {
        id: "PERM-008",
        name: "users.create",
        description: "Create users",
    },
    {
        id: "PERM-009",
        name: "users.edit",
        description: "Edit users",
    },
    {
        id: "PERM-010",
        name: "users.delete",
        description: "Delete users",
    },

    // Equipment
    {
        id: "PERM-011",
        name: "equipment.view",
        description: "View equipment",
    },
    {
        id: "PERM-012",
        name: "equipment.create",
        description: "Add equipment",
    },
    {
        id: "PERM-013",
        name: "equipment.edit",
        description: "Edit equipment",
    },
    {
        id: "PERM-014",
        name: "equipment.delete",
        description: "Delete equipment",
    },
    {
        id: "PERM-015",
        name: "equipment.assign",
        description: "Assign equipment to users",
    },

    // Orders
    {
        id: "PERM-016",
        name: "orders.view",
        description: "View orders",
    },
    {
        id: "PERM-017",
        name: "orders.create",
        description: "Create orders",
    },
    {
        id: "PERM-018",
        name: "orders.edit",
        description: "Edit orders",
    },
    {
        id: "PERM-019",
        name: "orders.delete",
        description: "Delete orders",
    },

    // Statistics
    {
        id: "PERM-020",
        name: "statistics.view",
        description: "View helpdesk statistics",
    },

    // Settings
    {
        id: "PERM-021",
        name: "settings.view",
        description: "View system settings",
    },
    {
        id: "PERM-022",
        name: "settings.edit",
        description: "Modify system settings",
    },

    // Roles
    {
        id: "PERM-023",
        name: "roles.view",
        description: "View roles",
    },
    {
        id: "PERM-024",
        name: "roles.create",
        description: "Create roles",
    },
    {
        id: "PERM-025",
        name: "roles.edit",
        description: "Edit roles",
    },
    {
        id: "PERM-026",
        name: "roles.delete",
        description: "Delete roles",
    },
];

export const rolePermissionsList: RolePermissionType[] = [
    // Administrator
    { roleId: "ROLE-001", permissionId: "PERM-001" },
    { roleId: "ROLE-001", permissionId: "PERM-002" },
    { roleId: "ROLE-001", permissionId: "PERM-003" },
    { roleId: "ROLE-001", permissionId: "PERM-004" },
    { roleId: "ROLE-001", permissionId: "PERM-005" },
    { roleId: "ROLE-001", permissionId: "PERM-006" },
    { roleId: "ROLE-001", permissionId: "PERM-007" },
    { roleId: "ROLE-001", permissionId: "PERM-008" },
    { roleId: "ROLE-001", permissionId: "PERM-009" },
    { roleId: "ROLE-001", permissionId: "PERM-010" },
    { roleId: "ROLE-001", permissionId: "PERM-011" },
    { roleId: "ROLE-001", permissionId: "PERM-012" },
    { roleId: "ROLE-001", permissionId: "PERM-013" },
    { roleId: "ROLE-001", permissionId: "PERM-014" },
    { roleId: "ROLE-001", permissionId: "PERM-015" },
    { roleId: "ROLE-001", permissionId: "PERM-016" },
    { roleId: "ROLE-001", permissionId: "PERM-017" },
    { roleId: "ROLE-001", permissionId: "PERM-018" },
    { roleId: "ROLE-001", permissionId: "PERM-019" },
    { roleId: "ROLE-001", permissionId: "PERM-020" },
    { roleId: "ROLE-001", permissionId: "PERM-021" },
    { roleId: "ROLE-001", permissionId: "PERM-022" },
    { roleId: "ROLE-001", permissionId: "PERM-023" },
    { roleId: "ROLE-001", permissionId: "PERM-024" },
    { roleId: "ROLE-001", permissionId: "PERM-025" },
    { roleId: "ROLE-001", permissionId: "PERM-026" },

    // Technician
    { roleId: "ROLE-002", permissionId: "PERM-001" },
    { roleId: "ROLE-002", permissionId: "PERM-002" },
    { roleId: "ROLE-002", permissionId: "PERM-003" },
    { roleId: "ROLE-002", permissionId: "PERM-005" },
    { roleId: "ROLE-002", permissionId: "PERM-006" },
    { roleId: "ROLE-002", permissionId: "PERM-007" },
    { roleId: "ROLE-002", permissionId: "PERM-011" },
    { roleId: "ROLE-002", permissionId: "PERM-012" },
    { roleId: "ROLE-002", permissionId: "PERM-013" },
    { roleId: "ROLE-002", permissionId: "PERM-015" },
    { roleId: "ROLE-002", permissionId: "PERM-016" },
    { roleId: "ROLE-002", permissionId: "PERM-017" },
    { roleId: "ROLE-002", permissionId: "PERM-020" },

    // Manager
    { roleId: "ROLE-003", permissionId: "PERM-001" },
    { roleId: "ROLE-003", permissionId: "PERM-005" },
    { roleId: "ROLE-003", permissionId: "PERM-006" },
    { roleId: "ROLE-003", permissionId: "PERM-007" },
    { roleId: "ROLE-003", permissionId: "PERM-011" },
    { roleId: "ROLE-003", permissionId: "PERM-016" },
    { roleId: "ROLE-003", permissionId: "PERM-020" },
    { roleId: "ROLE-003", permissionId: "PERM-021" },

    // User
    { roleId: "ROLE-004", permissionId: "PERM-001" },
    { roleId: "ROLE-004", permissionId: "PERM-002" },
];

export const userRolesList: UserRoleType[] = [
    {
        userId: "USR-001",
        roleId: "ROLE-001",
    },
    {
        userId: "USR-002",
        roleId: "ROLE-002",
    },
    {
        userId: "USR-003",
        roleId: "ROLE-002",
    },
    {
        userId: "USR-004",
        roleId: "ROLE-003",
    },
    {
        userId: "USR-005",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-006",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-007",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-008",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-009",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-010",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-011",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-012",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-013",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-014",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-015",
        roleId: "ROLE-002",
    },
    {
        userId: "USR-016",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-017",
        roleId: "ROLE-003",
    },
    {
        userId: "USR-018",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-019",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-020",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-021",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-022",
        roleId: "ROLE-004",
    },
    {
        userId: "USR-023",
        roleId: "ROLE-002",
    },
    {
        userId: "USR-024",
        roleId: "ROLE-004",
    },
];

export const rolesList: RoleType[] = [
    {
        id: "ROLE-001",
        name: "Administrator",
        description: "Full access to the helpdesk system",
    },
    {
        id: "ROLE-002",
        name: "Technician",
        description: "Handles tickets and provides technical support",
    },
    {
        id: "ROLE-003",
        name: "Manager",
        description: "Can monitor tickets and team performance",
    },
    {
        id: "ROLE-004",
        name: "User",
        description: "Can create and manage own support tickets",
    },
];