-- MySQL 8.0+ | Helpdesk: orders and order_items
-- ADDITIVE extension of helpdesk_users_roles_permissions.sql; does not DROP existing tables.
-- PREREQUISITES: tables `users`, `tickets` (id, created_at, technician_id), `products` (id).
-- Tickets and products must already contain all referenced TCK-* and PRD-* seed IDs.
-- Seed dates/creators follow the provided TypeScript generator and use ticket data at execution time.
-- Set session time zone UTC so the timestamps follow the JavaScript UTC generator.
USE `helpdesk`;
SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(20) NOT NULL,
  `ticket_id` VARCHAR(20) NOT NULL,
  `reason` TEXT NOT NULL,
  `status` ENUM('pending','declined','accepted','in_progress','completed') NOT NULL DEFAULT 'pending',
  `feedback` TEXT NULL,
  `created_by_id` VARCHAR(20) NOT NULL,
  `reviewed_by_id` VARCHAR(20) NULL,
  `created_at` DATETIME(3) NOT NULL,
  `updated_at` DATETIME(3) NOT NULL,
  `reviewed_at` DATETIME(3) NULL,
  `completed_at` DATETIME(3) NULL,
  PRIMARY KEY (`id`),
  KEY `idx_orders_ticket` (`ticket_id`),
  KEY `idx_orders_creator` (`created_by_id`),
  KEY `idx_orders_reviewer` (`reviewed_by_id`),
  KEY `idx_orders_status_created` (`status`, `created_at`),
  CONSTRAINT `fk_orders_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_orders_created_by` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_orders_reviewed_by` FOREIGN KEY (`reviewed_by_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` VARCHAR(20) NOT NULL,
  `order_id` VARCHAR(20) NOT NULL,
  `product_id` VARCHAR(20) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_order_items_order_product` (`order_id`, `product_id`),
  KEY `idx_order_items_product` (`product_id`),
  CONSTRAINT `chk_order_items_quantity` CHECK (`quantity` > 0),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

START TRANSACTION;
-- A temporary staging table holds the original 40 order seeds.
CREATE TEMPORARY TABLE `_order_seed` (
  `seed_index` INT PRIMARY KEY, `id` VARCHAR(20), `ticket_id` VARCHAR(20),
  `reason` TEXT, `status` VARCHAR(20)
);
INSERT INTO `_order_seed` (`seed_index`, `id`, `ticket_id`, `reason`, `status`) VALUES
  (0, 'ORD-001', 'TCK-0002', 'Wymiana drukarki, która przestała być dostępna w sieci.', 'completed'),
  (1, 'ORD-002', 'TCK-0003', 'Dysk diagnostyczny do odzyskania danych i analizy wolnej pracy komputera.', 'completed'),
  (2, 'ORD-003', 'TCK-0007', 'Nośniki USB do przygotowania instalatorów aktualizacji Windows.', 'declined'),
  (3, 'ORD-004', 'TCK-0008', 'Wymiana niesprawnych głośników stanowiska.', 'completed'),
  (4, 'ORD-005', 'TCK-0009', 'Zastępcze urządzenie wielofunkcyjne na czas naprawy skanera.', 'in_progress'),
  (5, 'ORD-006', 'TCK-0010', 'Adapter sieciowy Ethernet jako obejście niestabilnego Wi-Fi.', 'accepted'),
  (6, 'ORD-007', 'TCK-0012', 'Zewnętrzny SSD do zabezpieczenia danych przed diagnostyką komputera.', 'completed'),
  (7, 'ORD-008', 'TCK-0014', 'Wymiana monitora, który nie odbiera sygnału obrazu.', 'completed'),
  (8, 'ORD-009', 'TCK-0015', 'Nowy laptop dla przygotowywanego stanowiska pracownika.', 'pending'),
  (9, 'ORD-010', 'TCK-0017', 'Kamera internetowa do zastąpienia urządzenia niedziałającego w Teams.', 'completed'),
  (10, 'ORD-011', 'TCK-0018', 'Dysk zewnętrzny do archiwizacji danych przed zwolnieniem miejsca.', 'accepted'),
  (11, 'ORD-012', 'TCK-0019', 'Mikrofon USB do rozwiązania problemu z dźwiękiem.', 'declined'),
  (12, 'ORD-013', 'TCK-0020', 'Toner zapasowy na potrzeby diagnostyki drukowania dokumentów PDF.', 'in_progress'),
  (13, 'ORD-014', 'TCK-0021', 'Switch zamienny do diagnostyki połączeń z serwerem.', 'accepted'),
  (14, 'ORD-015', 'TCK-0024', 'Przewody sieciowe do podłączenia i konfiguracji drukarki.', 'completed'),
  (15, 'ORD-016', 'TCK-0028', 'Podstawki chłodzące do przegrzewających się laptopów.', 'pending'),
  (16, 'ORD-017', 'TCK-0030', 'Dwa monitory do przygotowania nowego stanowiska.', 'completed'),
  (17, 'ORD-018', 'TCK-0030', 'Klawiatury do przygotowania stanowiska.', 'completed'),
  (18, 'ORD-019', 'TCK-0032', 'Przewody CAT6 do odtworzenia połączenia z dyskiem sieciowym.', 'in_progress'),
  (19, 'ORD-020', 'TCK-0034', 'Kabel DisplayPort do uruchomienia drugiego monitora.', 'completed'),
  (20, 'ORD-021', 'TCK-0037', 'Klawiatury bezprzewodowe w miejsce uszkodzonych.', 'pending'),
  (21, 'ORD-022', 'TCK-0039', 'Komputer zastępczy na czas diagnozy jednostki, która nie uruchamia się.', 'in_progress'),
  (22, 'ORD-023', 'TCK-0042', 'Nowy czytnik kart Smart Card do stanowiska.', 'accepted'),
  (23, 'ORD-024', 'TCK-0043', 'Słuchawki USB w celu sprawdzenia jakości rozmów Teams.', 'declined'),
  (24, 'ORD-025', 'TCK-0044', 'Kable do konfiguracji poczty na urządzeniach mobilnych.', 'completed'),
  (25, 'ORD-026', 'TCK-0045', 'Drukarka zastępcza z powodu awarii urządzenia sieciowego.', 'pending'),
  (26, 'ORD-027', 'TCK-0046', 'Klawiatura przewodowa do wyeliminowania awarii skrótów.', 'accepted'),
  (27, 'ORD-028', 'TCK-0049', 'Laptop do konfiguracji nowego stanowiska.', 'in_progress'),
  (28, 'ORD-029', 'TCK-0050', 'Adaptery USB Bluetooth do diagnostyki zrywania połączeń.', 'accepted'),
  (29, 'ORD-030', 'TCK-0052', 'Switch zapasowy w związku z awarią internetu w biurze.', 'pending'),
  (30, 'ORD-031', 'TCK-0053', 'Kamera USB do zastąpienia niedziałającej kamery laptopa.', 'declined'),
  (31, 'ORD-032', 'TCK-0057', 'Dyski zewnętrzne do tymczasowego przeniesienia danych z serwera.', 'accepted'),
  (32, 'ORD-033', 'TCK-0060', 'Stacja dokująca USB-C w miejsce uszkodzonej.', 'pending'),
  (33, 'ORD-034', 'TCK-0060', 'Dodatkowa stacja dokująca dla drugiego stanowiska.', 'pending'),
  (34, 'ORD-035', 'TCK-0002', 'Papier testowy do diagnostyki kolejki drukowania.', 'completed'),
  (35, 'ORD-036', 'TCK-0014', 'Adapter HDMI do diagnostyki połączenia z monitorem.', 'declined'),
  (36, 'ORD-037', 'TCK-0030', 'Zestaw klawiatura i mysz dla nowego pracownika.', 'in_progress'),
  (37, 'ORD-038', 'TCK-0039', 'UPS do zabezpieczenia stanowiska po awarii zasilania.', 'accepted'),
  (38, 'ORD-039', 'TCK-0017', 'Kamera konferencyjna jako alternatywa dla kamery internetowej.', 'pending'),
  (39, 'ORD-040', 'TCK-0028', 'Zasilacz do diagnostyki wyłączania się laptopa.', 'declined');

-- Strict integrity check: fail rather than silently omit any order with a missing ticket.
CREATE TEMPORARY TABLE `_order_seed_validation` (`flag` INT NOT NULL);
INSERT INTO `_order_seed_validation` (`flag`) SELECT NULL FROM `_order_seed` s LEFT JOIN `tickets` t ON t.id = s.ticket_id WHERE t.id IS NULL;

INSERT INTO `orders` (`id`, `ticket_id`, `reason`, `status`, `feedback`, `created_by_id`, `reviewed_by_id`, `created_at`, `updated_at`, `reviewed_at`, `completed_at`)
SELECT x.id, x.ticket_id, x.reason, x.status,
  CASE WHEN x.status = 'declined' THEN CASE MOD(x.seed_index,4)
    WHEN 0 THEN 'W magazynie znajduje się już sprzęt zastępczy.'
    WHEN 1 THEN 'Brak wystarczającego uzasadnienia zakupu.'
    WHEN 2 THEN 'Najpierw należy wykorzystać dostępne wyposażenie.'
    WHEN 3 THEN 'Zakup wymaga dodatkowego potwierdzenia budżetu.'
  END ELSE NULL END,
  CASE WHEN t.technician_id IN ('USR-002','USR-003','USR-015','USR-023') THEN t.technician_id
       ELSE ELT(MOD(x.seed_index,4)+1,'USR-002','USR-003','USR-015','USR-023') END,
  CASE WHEN x.status <> 'pending' THEN 'USR-004' ELSE NULL END,
  LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 30 MINUTE)),
  CASE WHEN x.status = 'completed' THEN LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 72 HOUR))
       WHEN x.status = 'in_progress' THEN LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 24 HOUR))
       WHEN x.status <> 'pending' THEN LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 2 HOUR))
       ELSE LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 30 MINUTE)) END,
  CASE WHEN x.status <> 'pending' THEN LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 2 HOUR)) ELSE NULL END,
  CASE WHEN x.status = 'completed' THEN LEAST(UTC_TIMESTAMP(3), DATE_ADD(t.created_at, INTERVAL 72 HOUR)) ELSE NULL END
FROM `_order_seed` x INNER JOIN `tickets` t ON t.id = x.ticket_id
ON DUPLICATE KEY UPDATE `id` = `id`;

-- 57 order items; product IDs are validated by FK to `products`.
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`) VALUES
  ('OI-001-01', 'ORD-001', 'PRD-012', 1),
  ('OI-001-02', 'ORD-001', 'PRD-064', 2),
  ('OI-002-01', 'ORD-002', 'PRD-107', 1),
  ('OI-002-02', 'ORD-002', 'PRD-109', 1),
  ('OI-003-01', 'ORD-003', 'PRD-044', 2),
  ('OI-004-01', 'ORD-004', 'PRD-101', 1),
  ('OI-005-01', 'ORD-005', 'PRD-013', 1),
  ('OI-005-02', 'ORD-005', 'PRD-045', 1),
  ('OI-006-01', 'ORD-006', 'PRD-071', 1),
  ('OI-007-01', 'ORD-007', 'PRD-109', 1),
  ('OI-008-01', 'ORD-008', 'PRD-006', 1),
  ('OI-008-02', 'ORD-008', 'PRD-031', 1),
  ('OI-009-01', 'ORD-009', 'PRD-003', 1),
  ('OI-009-02', 'ORD-009', 'PRD-019', 1),
  ('OI-009-03', 'ORD-009', 'PRD-020', 1),
  ('OI-010-01', 'ORD-010', 'PRD-023', 1),
  ('OI-011-01', 'ORD-011', 'PRD-107', 1),
  ('OI-012-01', 'ORD-012', 'PRD-100', 1),
  ('OI-013-01', 'ORD-013', 'PRD-045', 2),
  ('OI-013-02', 'ORD-013', 'PRD-064', 2),
  ('OI-014-01', 'ORD-014', 'PRD-014', 1),
  ('OI-015-01', 'ORD-015', 'PRD-036', 3),
  ('OI-015-02', 'ORD-015', 'PRD-064', 1),
  ('OI-016-01', 'ORD-016', 'PRD-039', 2),
  ('OI-017-01', 'ORD-017', 'PRD-007', 2),
  ('OI-017-02', 'ORD-017', 'PRD-019', 2),
  ('OI-017-03', 'ORD-017', 'PRD-021', 1),
  ('OI-018-01', 'ORD-018', 'PRD-019', 2),
  ('OI-019-01', 'ORD-019', 'PRD-036', 2),
  ('OI-020-01', 'ORD-020', 'PRD-034', 1),
  ('OI-020-02', 'ORD-020', 'PRD-036', 1),
  ('OI-021-01', 'ORD-021', 'PRD-017', 2),
  ('OI-022-01', 'ORD-022', 'PRD-004', 1),
  ('OI-022-02', 'ORD-022', 'PRD-020', 1),
  ('OI-023-01', 'ORD-023', 'PRD-070', 1),
  ('OI-023-02', 'ORD-023', 'PRD-027', 1),
  ('OI-024-01', 'ORD-024', 'PRD-098', 1),
  ('OI-025-01', 'ORD-025', 'PRD-092', 2),
  ('OI-025-02', 'ORD-025', 'PRD-031', 1),
  ('OI-026-01', 'ORD-026', 'PRD-012', 1),
  ('OI-026-02', 'ORD-026', 'PRD-076', 1),
  ('OI-027-01', 'ORD-027', 'PRD-019', 1),
  ('OI-028-01', 'ORD-028', 'PRD-002', 1),
  ('OI-029-01', 'ORD-029', 'PRD-072', 2),
  ('OI-029-02', 'ORD-029', 'PRD-024', 1),
  ('OI-030-01', 'ORD-030', 'PRD-014', 1),
  ('OI-031-01', 'ORD-031', 'PRD-099', 1),
  ('OI-032-01', 'ORD-032', 'PRD-108', 2),
  ('OI-033-01', 'ORD-033', 'PRD-026', 1),
  ('OI-034-01', 'ORD-034', 'PRD-024', 1),
  ('OI-035-01', 'ORD-035', 'PRD-064', 5),
  ('OI-035-02', 'ORD-035', 'PRD-026', 1),
  ('OI-036-01', 'ORD-036', 'PRD-031', 2),
  ('OI-037-01', 'ORD-037', 'PRD-021', 1),
  ('OI-038-01', 'ORD-038', 'PRD-076', 1),
  ('OI-039-01', 'ORD-039', 'PRD-068', 1),
  ('OI-040-01', 'ORD-040', 'PRD-027', 1)
ON DUPLICATE KEY UPDATE `id` = `id`;
COMMIT;

-- Expected: 40 orders and 57 order_items on a new database.
SELECT COUNT(*) AS orders_count FROM `orders`;
SELECT COUNT(*) AS order_items_count FROM `order_items`;
