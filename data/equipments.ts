
import {
    LuLaptop,
    LuMonitor,
    LuSmartphone,
    LuTablet,
    LuPrinter,
    LuNetwork,
    LuKeyboard,
    LuPcCase
} from "react-icons/lu";

import type { IconType } from "react-icons";

export const equipmentTypeIcons: Record<EquipmentType, IconType> = {
    laptop: LuLaptop,
    desktop: LuPcCase,
    monitor: LuMonitor,
    phone: LuSmartphone,
    tablet: LuTablet,
    printer: LuPrinter,
    network: LuNetwork,
    accessory: LuKeyboard
};

// Dane mockowe zsynchronizowane z przekazaną listą 115 urządzeń.
// Katalog przechowuje modele; Equipment przechowuje konkretne egzemplarze.
import type { ProductType } from "./products";

export type EquipmentStatus =
    | "available"
    | "reserved"
    | "assigned"
    | "in_repair"
    | "lost"
    | "retired";

export type EquipmentType =
    | "laptop"
    | "desktop"
    | "monitor"
    | "phone"
    | "tablet"
    | "printer"
    | "network"
    | "accessory";

export type Equipment = {
    id: string;
    product_id: string;
    assetTag: string;
    serialNumber: string;
    status: EquipmentStatus;
    assignedTo: string | null;
    location_id: string;
    room: string | null;
    purchaseDate: string;
    warrantyUntil: string | null;
};

export type EquipmentListItem = Equipment & { product: ProductType };

export const equipmentList: Equipment[] = [
    { id: "EQ-001", product_id: "PRD-001", assetTag: "IT-LAP-001", serialNumber: "DL5440-8F29K1", status: "assigned", assignedTo: "USR-001", location_id: "LOC-002", room: null, purchaseDate: "2024-02-15", warrantyUntil: "2027-02-15" },
    { id: "EQ-002", product_id: "PRD-002", assetTag: "IT-LAP-002", serialNumber: "LNV-T14-29X81", status: "assigned", assignedTo: "USR-002", location_id: "LOC-002", room: null, purchaseDate: "2024-04-08", warrantyUntil: "2027-04-08" },
    { id: "EQ-003", product_id: "PRD-003", assetTag: "IT-LAP-003", serialNumber: "HP450-73K29A", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-06-21", warrantyUntil: "2027-06-21" },
    { id: "EQ-004", product_id: "PRD-004", assetTag: "IT-PC-001", serialNumber: "DOP7010-88291", status: "assigned", assignedTo: "USR-003", location_id: "LOC-007", room: null, purchaseDate: "2023-11-12", warrantyUntil: "2026-11-12" },
    { id: "EQ-005", product_id: "PRD-005", assetTag: "IT-PC-002", serialNumber: "LNV-M90Q-1128", status: "in_repair", assignedTo: null, location_id: "LOC-021", room: null, purchaseDate: "2023-08-19", warrantyUntil: "2026-08-19" },
    { id: "EQ-006", product_id: "PRD-006", assetTag: "IT-MON-001", serialNumber: "DELL-P2422-9128", status: "assigned", assignedTo: "USR-001", location_id: "LOC-002", room: null, purchaseDate: "2024-02-15", warrantyUntil: "2027-02-15" },
    { id: "EQ-007", product_id: "PRD-007", assetTag: "IT-MON-002", serialNumber: "LG24-729182", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-03-11", warrantyUntil: "2027-03-11" },
    { id: "EQ-008", product_id: "PRD-008", assetTag: "IT-MON-003", serialNumber: "SAM24-881293", status: "assigned", assignedTo: "USR-004", location_id: "LOC-003", room: null, purchaseDate: "2023-12-03", warrantyUntil: "2026-12-03" },
    { id: "EQ-009", product_id: "PRD-009", assetTag: "IT-PHN-001", serialNumber: "SM-S24-728192", status: "assigned", assignedTo: "USR-005", location_id: "LOC-002", room: null, purchaseDate: "2024-05-17", warrantyUntil: "2026-05-17" },
    { id: "EQ-010", product_id: "PRD-010", assetTag: "IT-PHN-002", serialNumber: "APL15-928172", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-07-02", warrantyUntil: "2025-07-02" },
    { id: "EQ-011", product_id: "PRD-011", assetTag: "IT-TAB-001", serialNumber: "IPAD10-182912", status: "assigned", assignedTo: "USR-006", location_id: "LOC-009", room: null, purchaseDate: "2024-01-22", warrantyUntil: "2025-01-22" },
    { id: "EQ-012", product_id: "PRD-012", assetTag: "IT-PRN-001", serialNumber: "HPM404-821912", status: "assigned", assignedTo: null, location_id: "LOC-002", room: "Biuro", purchaseDate: "2023-05-14", warrantyUntil: "2026-05-14" },
    { id: "EQ-013", product_id: "PRD-013", assetTag: "IT-PRN-002", serialNumber: "BRO-3770-72819", status: "in_repair", assignedTo: null, location_id: "LOC-021", room: null, purchaseDate: "2022-09-18", warrantyUntil: "2025-09-18" },
    { id: "EQ-014", product_id: "PRD-014", assetTag: "IT-NET-001", serialNumber: "CSC350-918273", status: "assigned", assignedTo: null, location_id: "LOC-002", room: "Serwerownia", purchaseDate: "2023-02-10", warrantyUntil: "2026-02-10" },
    { id: "EQ-015", product_id: "PRD-015", assetTag: "IT-LAP-004", serialNumber: "ASB5-728291", status: "lost", assignedTo: "USR-007", location_id: "LOC-002", room: null, purchaseDate: "2023-10-06", warrantyUntil: "2026-10-06" },
    { id: "EQ-016", product_id: "PRD-016", assetTag: "IT-LAP-005", serialNumber: "DL5420-182736", status: "retired", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2020-03-12", warrantyUntil: "2023-03-12" },
    { id: "EQ-017", product_id: "PRD-017", assetTag: "IT-ACC-001", serialNumber: "LOG-K270-001", status: "assigned", assignedTo: "USR-005", location_id: "LOC-002", room: null, purchaseDate: "2024-03-14", warrantyUntil: "2026-03-14" },
    { id: "EQ-018", product_id: "PRD-018", assetTag: "IT-ACC-002", serialNumber: "LOG-M185-002", status: "assigned", assignedTo: "USR-005", location_id: "LOC-002", room: null, purchaseDate: "2024-03-14", warrantyUntil: "2026-03-14" },
    { id: "EQ-019", product_id: "PRD-019", assetTag: "IT-ACC-003", serialNumber: "DEL-KB216-003", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-04-02", warrantyUntil: "2026-04-02" },
    { id: "EQ-020", product_id: "PRD-020", assetTag: "IT-ACC-004", serialNumber: "DEL-MS116-004", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-04-02", warrantyUntil: "2026-04-02" },
    { id: "EQ-021", product_id: "PRD-021", assetTag: "IT-ACC-005", serialNumber: "LOG-MK270-005", status: "assigned", assignedTo: "USR-007", location_id: "LOC-002", room: null, purchaseDate: "2024-05-19", warrantyUntil: "2026-05-19" },
    { id: "EQ-022", product_id: "PRD-022", assetTag: "IT-ACC-006", serialNumber: "JAB-E240-006", status: "assigned", assignedTo: "USR-019", location_id: "LOC-002", room: null, purchaseDate: "2024-06-04", warrantyUntil: "2026-06-04" },
    { id: "EQ-023", product_id: "PRD-022", assetTag: "IT-ACC-007", serialNumber: "JAB-E240-007", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-06-04", warrantyUntil: "2026-06-04" },
    { id: "EQ-024", product_id: "PRD-023", assetTag: "IT-ACC-008", serialNumber: "LOG-C920-008", status: "assigned", assignedTo: "USR-020", location_id: "LOC-002", room: null, purchaseDate: "2024-06-11", warrantyUntil: "2026-06-11" },
    { id: "EQ-025", product_id: "PRD-023", assetTag: "IT-ACC-009", serialNumber: "LOG-C920-009", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-06-11", warrantyUntil: "2026-06-11" },
    { id: "EQ-026", product_id: "PRD-024", assetTag: "IT-ACC-010", serialNumber: "DEL-WD19-010", status: "assigned", assignedTo: "USR-002", location_id: "LOC-002", room: null, purchaseDate: "2024-04-08", warrantyUntil: "2027-04-08" },
    { id: "EQ-027", product_id: "PRD-025", assetTag: "IT-ACC-011", serialNumber: "LNV-DOCK-011", status: "assigned", assignedTo: "USR-003", location_id: "LOC-007", room: null, purchaseDate: "2024-05-12", warrantyUntil: "2027-05-12" },
    { id: "EQ-028", product_id: "PRD-026", assetTag: "IT-ACC-012", serialNumber: "HP-DOCK-012", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-06-18", warrantyUntil: "2027-06-18" },
    { id: "EQ-029", product_id: "PRD-027", assetTag: "IT-ACC-013", serialNumber: "DEL-PSU-013", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-07-01", warrantyUntil: "2026-07-01" },
    { id: "EQ-030", product_id: "PRD-028", assetTag: "IT-ACC-014", serialNumber: "LNV-PSU-014", status: "assigned", assignedTo: "USR-021", location_id: "LOC-003", room: null, purchaseDate: "2024-07-15", warrantyUntil: "2026-07-15" },
    { id: "EQ-031", product_id: "PRD-029", assetTag: "IT-ACC-015", serialNumber: "UGR-HUB-015", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-08-02", warrantyUntil: "2026-08-02" },
    { id: "EQ-032", product_id: "PRD-030", assetTag: "IT-ACC-016", serialNumber: "TPL-HUB-016", status: "assigned", assignedTo: "USR-008", location_id: "LOC-002", room: null, purchaseDate: "2024-08-10", warrantyUntil: "2026-08-10" },
    { id: "EQ-033", product_id: "PRD-031", assetTag: "IT-ACC-017", serialNumber: "UGR-HDMI-017", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-08-22", warrantyUntil: "2026-08-22" },
    { id: "EQ-034", product_id: "PRD-032", assetTag: "IT-ACC-018", serialNumber: "C3D-DP-018", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-08-22", warrantyUntil: "2026-08-22" },
    { id: "EQ-035", product_id: "PRD-033", assetTag: "IT-ACC-019", serialNumber: "BAS-HDMI-019", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-09-03", warrantyUntil: "2026-09-03" },
    { id: "EQ-036", product_id: "PRD-034", assetTag: "IT-ACC-020", serialNumber: "DIG-DP-020", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-09-03", warrantyUntil: "2026-09-03" },
    { id: "EQ-037", product_id: "PRD-035", assetTag: "IT-ACC-021", serialNumber: "ANK-USBC-021", status: "assigned", assignedTo: "USR-006", location_id: "LOC-009", room: null, purchaseDate: "2024-09-14", warrantyUntil: "2026-09-14" },
    { id: "EQ-038", product_id: "PRD-036", assetTag: "IT-ACC-022", serialNumber: "DIG-CAT6-022", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-09-20", warrantyUntil: "2026-09-20" },
    { id: "EQ-039", product_id: "PRD-037", assetTag: "IT-ACC-023", serialNumber: "DIG-CAT6-023", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-09-20", warrantyUntil: "2026-09-20" },
    { id: "EQ-040", product_id: "PRD-038", assetTag: "IT-ACC-024", serialNumber: "KEN-STAND-024", status: "assigned", assignedTo: "USR-019", location_id: "LOC-002", room: null, purchaseDate: "2024-10-01", warrantyUntil: "2026-10-01" },
    { id: "EQ-041", product_id: "PRD-039", assetTag: "IT-ACC-025", serialNumber: "CM-X3-025", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-10-05", warrantyUntil: "2026-10-05" },
    { id: "EQ-042", product_id: "PRD-040", assetTag: "IT-ACC-026", serialNumber: "DEL-BAG-026", status: "assigned", assignedTo: "USR-010", location_id: "LOC-007", room: null, purchaseDate: "2024-10-12", warrantyUntil: "2026-10-12" },
    { id: "EQ-043", product_id: "PRD-041", assetTag: "IT-ACC-027", serialNumber: "HP-BAG-027", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-10-12", warrantyUntil: "2026-10-12" },
    { id: "EQ-044", product_id: "PRD-042", assetTag: "IT-ACC-028", serialNumber: "ANK-PWR-028", status: "assigned", assignedTo: "USR-011", location_id: "LOC-011", room: null, purchaseDate: "2024-10-20", warrantyUntil: "2026-10-20" },
    { id: "EQ-045", product_id: "PRD-043", assetTag: "IT-ACC-029", serialNumber: "UGR-CR-029", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2024-11-02", warrantyUntil: "2026-11-02" },
    { id: "EQ-046", product_id: "PRD-044", assetTag: "IT-ACC-030", serialNumber: "SDK-128-030", status: "assigned", assignedTo: "USR-007", location_id: "LOC-002", room: null, purchaseDate: "2024-11-10", warrantyUntil: "2026-11-10" },
    { id: "EQ-047", product_id: "PRD-045", assetTag: "IT-PRN-003", serialNumber: "TON-HP-003", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-05", warrantyUntil: "2027-01-05" },
    { id: "EQ-048", product_id: "PRD-046", assetTag: "IT-PRN-004", serialNumber: "TON-HP-004", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-05", warrantyUntil: "2027-01-05" },
    { id: "EQ-049", product_id: "PRD-047", assetTag: "IT-PRN-005", serialNumber: "TON-HP-005", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-05", warrantyUntil: "2027-01-05" },
    { id: "EQ-050", product_id: "PRD-048", assetTag: "IT-PRN-006", serialNumber: "TON-HP-006", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-05", warrantyUntil: "2027-01-05" },
    { id: "EQ-051", product_id: "PRD-049", assetTag: "IT-PRN-007", serialNumber: "TON-HP-007", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-05", warrantyUntil: "2027-01-05" },
    { id: "EQ-052", product_id: "PRD-050", assetTag: "IT-PRN-008", serialNumber: "TON-BRO-008", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-12", warrantyUntil: "2027-01-12" },
    { id: "EQ-053", product_id: "PRD-051", assetTag: "IT-PRN-009", serialNumber: "TON-BRO-009", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-12", warrantyUntil: "2027-01-12" },
    { id: "EQ-054", product_id: "PRD-052", assetTag: "IT-PRN-010", serialNumber: "TON-BRO-010", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-12", warrantyUntil: "2027-01-12" },
    { id: "EQ-055", product_id: "PRD-053", assetTag: "IT-PRN-011", serialNumber: "TON-BRO-011", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-01-12", warrantyUntil: "2027-01-12" },
    { id: "EQ-056", product_id: "PRD-054", assetTag: "IT-PRN-012", serialNumber: "INK-CAN-012", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-01", warrantyUntil: "2027-02-01" },
    { id: "EQ-057", product_id: "PRD-055", assetTag: "IT-PRN-013", serialNumber: "INK-CAN-013", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-01", warrantyUntil: "2027-02-01" },
    { id: "EQ-058", product_id: "PRD-056", assetTag: "IT-PRN-014", serialNumber: "INK-EPS-014", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-08", warrantyUntil: "2027-02-08" },
    { id: "EQ-059", product_id: "PRD-057", assetTag: "IT-PRN-015", serialNumber: "INK-EPS-015", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-08", warrantyUntil: "2027-02-08" },
    { id: "EQ-060", product_id: "PRD-058", assetTag: "IT-PRN-016", serialNumber: "INK-EPS-016", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-08", warrantyUntil: "2027-02-08" },
    { id: "EQ-061", product_id: "PRD-059", assetTag: "IT-PRN-017", serialNumber: "INK-EPS-017", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-08", warrantyUntil: "2027-02-08" },
    { id: "EQ-062", product_id: "PRD-060", assetTag: "IT-PRN-018", serialNumber: "TON-SAM-018", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-16", warrantyUntil: "2027-02-16" },
    { id: "EQ-063", product_id: "PRD-061", assetTag: "IT-PRN-019", serialNumber: "TON-XER-019", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-20", warrantyUntil: "2027-02-20" },
    { id: "EQ-064", product_id: "PRD-062", assetTag: "IT-PRN-020", serialNumber: "DRM-BRO-020", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-02-25", warrantyUntil: "2027-02-25" },
    { id: "EQ-065", product_id: "PRD-063", assetTag: "IT-PRN-021", serialNumber: "WST-HP-021", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-03-01", warrantyUntil: "2027-03-01" },
    { id: "EQ-066", product_id: "PRD-064", assetTag: "IT-PRN-022", serialNumber: "PAP-XER-022", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-03-05", warrantyUntil: "2027-03-05" },
    { id: "EQ-067", product_id: "PRD-065", assetTag: "IT-ACC-031", serialNumber: "LOG-MXV-031", status: "assigned", assignedTo: "USR-019", location_id: "LOC-002", room: null, purchaseDate: "2025-03-12", warrantyUntil: "2027-03-12" },
    { id: "EQ-068", product_id: "PRD-066", assetTag: "IT-ACC-032", serialNumber: "KEY-K8-032", status: "assigned", assignedTo: "USR-021", location_id: "LOC-003", room: null, purchaseDate: "2025-03-15", warrantyUntil: "2027-03-15" },
    { id: "EQ-069", product_id: "PRD-067", assetTag: "IT-ACC-033", serialNumber: "SON-720-033", status: "assigned", assignedTo: "USR-010", location_id: "LOC-007", room: null, purchaseDate: "2025-03-20", warrantyUntil: "2027-03-20" },
    { id: "EQ-070", product_id: "PRD-068", assetTag: "IT-ACC-034", serialNumber: "LOG-MUP-034", status: "assigned", assignedTo: null, location_id: "LOC-002", room: "Sala konferencyjna", purchaseDate: "2025-03-28", warrantyUntil: "2027-03-28" },
    { id: "EQ-071", product_id: "PRD-069", assetTag: "IT-ACC-035", serialNumber: "LOG-R500-035", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-04-02", warrantyUntil: "2027-04-02" },
    { id: "EQ-072", product_id: "PRD-070", assetTag: "IT-ACC-036", serialNumber: "ACS-CR-036", status: "assigned", assignedTo: "USR-008", location_id: "LOC-002", room: null, purchaseDate: "2025-04-05", warrantyUntil: "2027-04-05" },
    { id: "EQ-073", product_id: "PRD-071", assetTag: "IT-ACC-037", serialNumber: "TPL-UE306-037", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-04-12", warrantyUntil: "2027-04-12" },
    { id: "EQ-074", product_id: "PRD-072", assetTag: "IT-ACC-038", serialNumber: "TPL-UB500-038", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-04-12", warrantyUntil: "2027-04-12" },
    { id: "EQ-075", product_id: "PRD-073", assetTag: "IT-ACC-039", serialNumber: "UGR-USB-039", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-04-20", warrantyUntil: "2027-04-20" },
    { id: "EQ-076", product_id: "PRD-074", assetTag: "IT-ACC-040", serialNumber: "ANK-735-040", status: "assigned", assignedTo: "USR-011", location_id: "LOC-011", room: null, purchaseDate: "2025-04-28", warrantyUntil: "2027-04-28" },
    { id: "EQ-077", product_id: "PRD-075", assetTag: "IT-ACC-041", serialNumber: "APC-PM5-041", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-02", warrantyUntil: "2027-05-02" },
    { id: "EQ-078", product_id: "PRD-076", assetTag: "IT-ACC-042", serialNumber: "APC-UPS-042", status: "assigned", assignedTo: null, location_id: "LOC-002", room: "Serwerownia", purchaseDate: "2025-05-05", warrantyUntil: "2028-05-05" },
    { id: "EQ-079", product_id: "PRD-077", assetTag: "IT-ACC-043", serialNumber: "CYP-UPS-043", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-05", warrantyUntil: "2028-05-05" },
    { id: "EQ-080", product_id: "PRD-078", assetTag: "IT-ACC-044", serialNumber: "LAN-IEC-044", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-12", warrantyUntil: "2027-05-12" },
    { id: "EQ-081", product_id: "PRD-079", assetTag: "IT-ACC-045", serialNumber: "LAN-CAT6-045", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-12", warrantyUntil: "2027-05-12" },
    { id: "EQ-082", product_id: "PRD-080", assetTag: "IT-ACC-046", serialNumber: "LAN-CAT6-046", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-12", warrantyUntil: "2027-05-12" },
    { id: "EQ-083", product_id: "PRD-081", assetTag: "IT-ACC-047", serialNumber: "LAN-CAT6-047", status: "assigned", assignedTo: "USR-023", location_id: "LOC-002", room: "Serwerownia", purchaseDate: "2025-05-12", warrantyUntil: "2027-05-12" },
    { id: "EQ-084", product_id: "PRD-082", assetTag: "IT-ACC-048", serialNumber: "CSC-CBL-048", status: "assigned", assignedTo: "USR-023", location_id: "LOC-002", room: null, purchaseDate: "2025-05-15", warrantyUntil: "2027-05-15" },
    { id: "EQ-085", product_id: "PRD-083", assetTag: "IT-ACC-049", serialNumber: "CSC-SFP-049", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-20", warrantyUntil: "2028-05-20" },
    { id: "EQ-086", product_id: "PRD-084", assetTag: "IT-ACC-050", serialNumber: "TPL-SFP-050", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-05-20", warrantyUntil: "2028-05-20" },
    { id: "EQ-087", product_id: "PRD-085", assetTag: "IT-ACC-051", serialNumber: "DEL-STAND-051", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-06-01", warrantyUntil: "2027-06-01" },
    { id: "EQ-088", product_id: "PRD-086", assetTag: "IT-ACC-052", serialNumber: "ERG-LX-052", status: "assigned", assignedTo: "USR-019", location_id: "LOC-002", room: null, purchaseDate: "2025-06-05", warrantyUntil: "2028-06-05" },
    { id: "EQ-089", product_id: "PRD-087", assetTag: "IT-ACC-053", serialNumber: "LOG-MAT-053", status: "assigned", assignedTo: "USR-019", location_id: "LOC-002", room: null, purchaseDate: "2025-06-10", warrantyUntil: "2027-06-10" },
    { id: "EQ-090", product_id: "PRD-088", assetTag: "IT-ACC-054", serialNumber: "KEN-MAT-054", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-06-10", warrantyUntil: "2027-06-10" },
    { id: "EQ-091", product_id: "PRD-089", assetTag: "IT-ACC-055", serialNumber: "KEN-LOCK-055", status: "assigned", assignedTo: "USR-002", location_id: "LOC-002", room: null, purchaseDate: "2025-06-15", warrantyUntil: "2027-06-15" },
    { id: "EQ-092", product_id: "PRD-089", assetTag: "IT-ACC-056", serialNumber: "KEN-LOCK-056", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-06-15", warrantyUntil: "2027-06-15" },
    { id: "EQ-093", product_id: "PRD-090", assetTag: "IT-ACC-057", serialNumber: "BEL-HDMI-057", status: "assigned", assignedTo: "USR-008", location_id: "LOC-002", room: null, purchaseDate: "2025-06-20", warrantyUntil: "2027-06-20" },
    { id: "EQ-094", product_id: "PRD-091", assetTag: "IT-ACC-058", serialNumber: "BEL-DP-058", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-06-20", warrantyUntil: "2027-06-20" },
    { id: "EQ-095", product_id: "PRD-092", assetTag: "IT-ACC-059", serialNumber: "APL-LTG-059", status: "assigned", assignedTo: "USR-005", location_id: "LOC-002", room: null, purchaseDate: "2025-07-01", warrantyUntil: "2027-07-01" },
    { id: "EQ-096", product_id: "PRD-093", assetTag: "IT-ACC-060", serialNumber: "APL-20W-060", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-07-01", warrantyUntil: "2027-07-01" },
    { id: "EQ-097", product_id: "PRD-094", assetTag: "IT-ACC-061", serialNumber: "APL-USBC-061", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-07-05", warrantyUntil: "2027-07-05" },
    { id: "EQ-098", product_id: "PRD-095", assetTag: "IT-ACC-062", serialNumber: "ANK-CAR-062", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-07-08", warrantyUntil: "2027-07-08" },
    { id: "EQ-099", product_id: "PRD-096", assetTag: "IT-ACC-063", serialNumber: "MS-MOUSE-063", status: "assigned", assignedTo: "USR-014", location_id: "LOC-002", room: null, purchaseDate: "2025-07-12", warrantyUntil: "2027-07-12" },
    { id: "EQ-100", product_id: "PRD-097", assetTag: "IT-ACC-064", serialNumber: "MS-KB-064", status: "assigned", assignedTo: "USR-014", location_id: "LOC-002", room: null, purchaseDate: "2025-07-12", warrantyUntil: "2027-07-12" },
    { id: "EQ-101", product_id: "PRD-098", assetTag: "IT-ACC-065", serialNumber: "POL-C3210-065", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-07-18", warrantyUntil: "2027-07-18" },
    { id: "EQ-102", product_id: "PRD-099", assetTag: "IT-ACC-066", serialNumber: "MS-CAM-066", status: "assigned", assignedTo: "USR-022", location_id: "LOC-009", room: null, purchaseDate: "2025-07-22", warrantyUntil: "2027-07-22" },
    { id: "EQ-103", product_id: "PRD-100", assetTag: "IT-ACC-067", serialNumber: "BLUE-YETI-067", status: "assigned", assignedTo: "USR-020", location_id: "LOC-002", room: null, purchaseDate: "2025-07-25", warrantyUntil: "2027-07-25" },
    { id: "EQ-104", product_id: "PRD-101", assetTag: "IT-ACC-068", serialNumber: "LOG-Z207-068", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-07-28", warrantyUntil: "2027-07-28" },
    { id: "EQ-105", product_id: "PRD-102", assetTag: "IT-ACC-069", serialNumber: "KEN-PRES-069", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-08-02", warrantyUntil: "2027-08-02" },
    { id: "EQ-106", product_id: "PRD-103", assetTag: "IT-ACC-070", serialNumber: "DIG-VGA-070", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-08-05", warrantyUntil: "2027-08-05" },
    { id: "EQ-107", product_id: "PRD-104", assetTag: "IT-ACC-071", serialNumber: "DIG-DVI-071", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-08-05", warrantyUntil: "2027-08-05" },
    { id: "EQ-108", product_id: "PRD-105", assetTag: "IT-ACC-072", serialNumber: "ST-MDP-072", status: "assigned", assignedTo: "USR-006", location_id: "LOC-009", room: null, purchaseDate: "2025-08-10", warrantyUntil: "2027-08-10" },
    { id: "EQ-109", product_id: "PRD-106", assetTag: "IT-ACC-073", serialNumber: "TRN-RDF5-073", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-08-12", warrantyUntil: "2027-08-12" },
    { id: "EQ-110", product_id: "PRD-107", assetTag: "IT-ACC-074", serialNumber: "WD-1TB-074", status: "assigned", assignedTo: "USR-001", location_id: "LOC-002", room: null, purchaseDate: "2025-08-15", warrantyUntil: "2027-08-15" },
    { id: "EQ-111", product_id: "PRD-108", assetTag: "IT-ACC-075", serialNumber: "SEA-2TB-075", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-08-15", warrantyUntil: "2027-08-15" },
    { id: "EQ-112", product_id: "PRD-109", assetTag: "IT-ACC-076", serialNumber: "SAM-T7-076", status: "assigned", assignedTo: "USR-015", location_id: "LOC-002", room: null, purchaseDate: "2025-08-18", warrantyUntil: "2028-08-18" },
    { id: "EQ-113", product_id: "PRD-110", assetTag: "IT-ACC-077", serialNumber: "ANK-8IN1-077", status: "assigned", assignedTo: "USR-021", location_id: "LOC-003", room: null, purchaseDate: "2025-08-20", warrantyUntil: "2027-08-20" },
    { id: "EQ-114", product_id: "PRD-111", assetTag: "IT-ACC-078", serialNumber: "BAS-USBA-078", status: "available", assignedTo: null, location_id: "LOC-001", room: null, purchaseDate: "2025-08-22", warrantyUntil: "2027-08-22" },
    { id: "EQ-115", product_id: "PRD-112", assetTag: "IT-ACC-079", serialNumber: "BAS-USBC-079", status: "in_repair", assignedTo: null, location_id: "LOC-021", room: null, purchaseDate: "2025-08-25", warrantyUntil: "2027-08-25" },
];


export type EquipmentAssignmentType = {
    id: string;
    equipment_id: string;

    ticket_id: string | null;
    user_id: string | null;
    technician_id: string | null;

    status: "reserved" | "assigned" | "returned" | "cancelled";

    reserved_at: string | null;
    assigned_at: string | null;
    returned_at: string | null;
    cancelled_at: string | null;
};

export type EquipmentAssignmentCreateType = {
    equipment_id: string;
    ticket_id: string;
    user_id: string;
    technician_id: string;
};