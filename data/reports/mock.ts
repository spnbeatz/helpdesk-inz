import { customersList } from "../users";
import { ReportFormat, ReportListItemType, ReportStatus, ReportType } from "./types";

const getRandomDateInCurrentMonth = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();

    const day = Math.floor(Math.random() * now.getDate()) + 1;

    return new Date(
        year,
        month,
        day,
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60)
    ).toISOString();
};

const getRandomPeriod = () => {
    const now = new Date();

    const dateTo = new Date();
    const dateFrom = new Date(dateTo);

    dateFrom.setDate(
        dateTo.getDate() - Math.floor(Math.random() * 20)
    );

    return {
        date_from: dateFrom.toISOString(),
        date_to: dateTo.toISOString()
    };
};

export const reports: ReportListItemType[] = Array.from(
    { length: 15 },
    (_, index) => {
        const status = ["pending", "processing", "completed", "failed"][
            Math.floor(Math.random() * 4)
        ] as ReportStatus;

        const format = ["pdf", "xlsx", "csv"][
            Math.floor(Math.random() * 3)
        ] as ReportFormat;

        const types: ReportType[] = [
            "tickets",
            "resolution.time",
            "technician.performance",
            "sla.report",
            "backlog.report",
            "category.report"
        ];

        const createdById = `USR-00${Math.floor(Math.random() * 3) + 1}`
        const createdAt = getRandomDateInCurrentMonth();

        const user = customersList.find((user) => user.id === createdById)

        return {
            id: `REP-${String(index + 1).padStart(3, "0")}`,
            name: `Raport ${index + 1}`,
            type: types[Math.floor(Math.random() * types.length)],
            status,
            format,
            created_by_id: createdById,
            created_at: createdAt,
            completed_at: status === "completed"
                ? new Date(new Date(createdAt).getTime() + 15000).toISOString()
                : null,
            file_url: status === "completed"
                ? `/reports/REP-${String(index + 1).padStart(3, "0")}.${format}`
                : null,
            file_size: status === "completed"
                ? Math.floor(Math.random() * 500000) + 50000
                : null,
            error_message: status === "failed"
                ? "Nie udało się wygenerować raportu."
                : null,
            period: getRandomPeriod(),
            created_by_avatar: user?.avatarUrl,
            created_by_name: user?.name
        };
    }
);