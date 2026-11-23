export type ReportType =
    | "tickets"
    | "resolution.time"
    | "technician.performance"
    | "sla.report"
    | "backlog.report"
    | "category.report";

export type ReportStatus =
    | "pending"
    | "processing"
    | "completed"
    | "failed";

export type ReportFormat = "pdf" | "xlsx" | "csv";

export type Report = {
    id: string;
    name: string;

    type: ReportType;
    status: ReportStatus;
    format: ReportFormat;

    created_by_id: string;
    created_at: string;

    completed_at?: string | null;

    file_url?: string | null;
    file_size?: number | null;

    error_message?: string | null;
}

export type ReportListItemType = Report & {
    created_by_name?: string,
    created_by_avatar?: string
};

