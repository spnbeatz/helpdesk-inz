-- Helpdesk / MySQL 8.0+ / Tickets
-- Additive extension; no DROP / DELETE of existing users, orders, equipment.
-- Source: exampleTicketsList.ts / 60 seed records.
-- Generated timestamps frozen for 2026-10-30 12:00:00 Europe/Warsaw.
-- IMPORTANT: Original TS generator produces local naive timestamps; DATETIME stores those local values, not UTC.
-- If orders were imported earlier with their dynamic dates, the timestamps might not exactly match these frozen ticket timestamps.
-- Prerequisites: helpdesk.users (24 records). Priority/category IDs remain text identifiers because their dictionary tables were not supplied.
USE `helpdesk`;
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `ticket_categories` (
    `id` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_ticket_categories_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ticket_categories` (`id`, `name`, `description`) VALUES
('CAT-001', 'Hardware', 'Problems with computers, laptops, monitors and other hardware'),
('CAT-002', 'Software', 'Problems with applications and installed software'),
('CAT-003', 'Network', 'Internet, Wi-Fi, LAN and network connectivity issues'),
('CAT-004', 'Accounts & Access', 'User accounts, passwords, permissions and access'),
('CAT-005', 'Email', 'Email, mailbox and email configuration issues'),
('CAT-006', 'Printers', 'Printers, scanners and printing problems'),
('CAT-007', 'Security', 'Security incidents, suspicious activity and security requests'),
('CAT-008', 'System & OS', 'Windows, macOS, Linux and operating system issues'),
('CAT-009', 'Configuration', 'Computer and software configuration requests'),
('CAT-010', 'Other', 'Issues that do not fit into another category')
ON DUPLICATE KEY UPDATE
    `name` = VALUES(`name`),
    `description` = VALUES(`description`);

-- Optional: after confirming tickets.category_id has compatible VARCHAR type
-- and all its values reference ticket_categories.id, add the foreign key:
-- ALTER TABLE `tickets`
--     ADD CONSTRAINT `fk_tickets_category`
--     FOREIGN KEY (`category_id`) REFERENCES `ticket_categories` (`id`)
--     ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` VARCHAR(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `priority_id` VARCHAR(50) NOT NULL,
  `status` ENUM('new','closed') NOT NULL DEFAULT 'new',
  `category_id` VARCHAR(20) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `resolved_at` DATETIME NULL,
  `resolution_minutes` INT UNSIGNED NULL,
  `technician_id` VARCHAR(20) NULL,
  `customer_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_tickets_technician` (`technician_id`),
  KEY `idx_tickets_customer` (`customer_id`),
  KEY `idx_tickets_status_created` (`status`, `created_at`),
  KEY `idx_tickets_category` (`category_id`),
  KEY `idx_tickets_priority` (`priority_id`),
  CONSTRAINT `fk_tickets_technician` FOREIGN KEY (`technician_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tickets_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

START TRANSACTION;
INSERT INTO `tickets` (`id`,`title`,`description`,`priority_id`,`status`,`category_id`,`created_at`,`updated_at`,`resolved_at`,`resolution_minutes`,`technician_id`,`customer_id`) VALUES
  ('TCK-0001', 'Problem z logowaniem do systemu', 'Użytkownik otrzymuje komunikat o nieprawidłowym haśle mimo używania poprawnych danych.', '231e1dd11ds', 'new', 'CAT-004', '2026-10-20 17:15:00', '2026-10-20 21:44:00', NULL, NULL, NULL, 'USR-001'),
  ('TCK-0002', 'Brak dostępu do drukarki', 'Drukarka sieciowa przestała być widoczna na komputerze użytkownika.', '231e1dd11d1', 'new', 'CAT-006', '2026-10-08 13:32:00', '2026-10-08 18:48:00', NULL, NULL, 'USR-002', 'USR-004'),
  ('TCK-0003', 'Komputer bardzo wolno działa', 'Komputer uruchamia się przez kilka minut i aplikacje reagują z dużym opóźnieniem.', '231e1dd11d1', 'new', 'CAT-001', '2026-10-16 13:44:00', '2026-10-16 13:57:00', NULL, NULL, 'USR-001', 'USR-002'),
  ('TCK-0004', 'Reset hasła użytkownika', 'Użytkownik nie pamięta hasła do konta firmowego.', '231e1dd11dz', 'closed', 'CAT-004', '2026-10-11 08:27:00', '2026-10-14 01:04:00', '2026-10-14 01:04:00', 3877, 'USR-003', 'USR-007'),
  ('TCK-0005', 'Brak połączenia z VPN', 'Połączenie VPN kończy się błędem podczas próby uwierzytelnienia.', '231e1dd11ds', 'new', 'CAT-003', '2026-10-06 15:43:00', '2026-10-06 21:09:00', NULL, NULL, NULL, 'USR-003'),
  ('TCK-0006', 'Outlook nie synchronizuje poczty', 'Nowe wiadomości nie pojawiają się w aplikacji Outlook.', '231e1dd11d1', 'closed', 'CAT-005', '2026-10-30 08:53:00', '2026-10-30 12:00:00', '2026-10-30 12:00:00', 187, 'USR-002', 'USR-005'),
  ('TCK-0007', 'Błąd podczas aktualizacji systemu', 'Aktualizacja systemu Windows zatrzymuje się na 75 procentach.', '231e1dd11ds', 'new', 'CAT-008', '2026-10-14 14:06:00', '2026-10-14 14:49:00', NULL, NULL, 'USR-001', 'USR-008'),
  ('TCK-0008', 'Brak dźwięku w komputerze', 'Głośniki są wykrywane, ale system nie odtwarza żadnego dźwięku.', '231e1dd11dz', 'closed', 'CAT-001', '2026-10-12 09:17:00', '2026-10-13 13:36:00', '2026-10-13 13:36:00', 1699, 'USR-003', 'USR-006'),
  ('TCK-0009', 'Nie działa skaner', 'Skaner nie jest wykrywany przez aplikację do skanowania dokumentów.', '231e1dd11d1', 'new', 'CAT-006', '2026-10-21 13:58:00', '2026-10-21 18:23:00', NULL, NULL, NULL, 'USR-009'),
  ('TCK-0010', 'Problem z połączeniem Wi-Fi', 'Laptop traci połączenie z siecią Wi-Fi co kilka minut.', '231e1dd11ds', 'closed', 'CAT-003', '2026-10-16 11:53:00', '2026-10-18 15:02:00', '2026-10-18 15:02:00', 3069, 'USR-002', 'USR-001'),
  ('TCK-0011', 'Instalacja programu księgowego', 'Potrzebna instalacja oraz konfiguracja programu na nowym stanowisku.', '231e1dd11d1', 'new', 'CAT-009', '2026-10-23 08:16:00', '2026-10-23 12:29:00', NULL, NULL, NULL, 'USR-010'),
  ('TCK-0012', 'Zawieszający się komputer', 'Komputer zawiesza się podczas pracy z dużymi plikami Excel.', '231e1dd11ds', 'closed', 'CAT-001', '2026-10-02 08:41:00', '2026-10-03 02:48:00', '2026-10-03 02:48:00', 1087, 'USR-001', 'USR-004'),
  ('TCK-0013', 'Brak uprawnień do folderu', 'Użytkownik nie może otworzyć firmowego folderu znajdującego się na serwerze.', '231e1dd11d1', 'new', 'CAT-004', '2026-10-08 16:14:00', '2026-10-08 17:27:00', NULL, NULL, 'USR-003', 'USR-002'),
  ('TCK-0014', 'Monitor nie wyświetla obrazu', 'Monitor pokazuje komunikat No Signal po uruchomieniu komputera.', '231e1dd11ds', 'closed', 'CAT-001', '2026-10-19 16:01:00', '2026-10-21 17:01:00', '2026-10-21 17:01:00', 2940, 'USR-002', 'USR-011'),
  ('TCK-0015', 'Konfiguracja nowego użytkownika', 'Utworzenie konta, konfiguracja poczty oraz dostępów do systemów firmowych.', '231e1dd11dz', 'new', 'CAT-004', '2026-10-05 12:26:00', '2026-10-05 12:36:00', NULL, NULL, NULL, 'USR-012'),
  ('TCK-0016', 'Błąd aplikacji CRM', 'Aplikacja CRM zamyka się podczas otwierania profilu klienta.', '231e1dd11ds', 'new', 'CAT-002', '2026-10-05 12:29:00', '2026-10-05 15:33:00', NULL, NULL, 'USR-001', 'USR-003'),
  ('TCK-0017', 'Problemy z kamerą internetową', 'Kamera nie jest dostępna w Microsoft Teams.', '231e1dd11d1', 'closed', 'CAT-001', '2026-10-10 13:19:00', '2026-10-10 13:49:00', '2026-10-10 13:49:00', 30, 'USR-003', 'USR-005'),
  ('TCK-0018', 'Brak miejsca na dysku', 'Dysk systemowy jest prawie całkowicie zapełniony.', '231e1dd11d1', 'new', 'CAT-001', '2026-10-02 14:37:00', '2026-10-02 16:10:00', NULL, NULL, NULL, 'USR-007'),
  ('TCK-0019', 'Nie działa mikrofon', 'Mikrofon jest wykrywany przez system, ale nie przekazuje dźwięku.', '231e1dd11dz', 'closed', 'CAT-001', '2026-10-12 12:08:00', '2026-10-12 18:08:00', '2026-10-12 18:08:00', 360, 'USR-002', 'USR-009'),
  ('TCK-0020', 'Błąd podczas drukowania PDF', 'Dokumenty PDF nie są poprawnie wysyłane do drukarki.', '231e1dd11d1', 'new', 'CAT-006', '2026-10-08 15:26:00', '2026-10-08 15:41:00', NULL, NULL, 'USR-001', 'USR-006'),
  ('TCK-0021', 'Nie można połączyć się z serwerem', 'Aplikacja zgłasza błąd połączenia z serwerem plików.', '231e1dd11ds', 'new', 'CAT-003', '2026-10-07 13:39:00', '2026-10-07 16:38:00', NULL, NULL, NULL, 'USR-008'),
  ('TCK-0022', 'Aktualizacja sterowników', 'Prośba o aktualizację sterowników karty graficznej.', '231e1dd11dz', 'closed', 'CAT-008', '2026-10-29 13:03:00', '2026-10-30 12:00:00', '2026-10-30 12:00:00', 1377, 'USR-003', 'USR-010'),
  ('TCK-0023', 'Błąd autoryzacji użytkownika', 'Użytkownik zostaje wylogowany po kilku sekundach od zalogowania.', '231e1dd11ds', 'new', 'CAT-004', '2026-10-15 10:01:00', '2026-10-15 14:47:00', NULL, NULL, 'USR-002', 'USR-001'),
  ('TCK-0024', 'Konfiguracja drukarki sieciowej', 'Dodanie nowej drukarki sieciowej na kilku stanowiskach.', '231e1dd11d1', 'closed', 'CAT-006', '2026-10-30 08:15:00', '2026-10-30 12:00:00', '2026-10-30 12:00:00', 225, 'USR-001', 'USR-011'),
  ('TCK-0025', 'Nie działa aplikacja Teams', 'Microsoft Teams nie uruchamia się po ostatniej aktualizacji.', '231e1dd11d1', 'new', 'CAT-002', '2026-10-16 16:13:00', '2026-10-16 22:10:00', NULL, NULL, NULL, 'USR-004'),
  ('TCK-0026', 'Podejrzane wiadomości e-mail', 'Użytkownik otrzymuje dużą liczbę wiadomości wyglądających na phishing.', '231e1dd11ds', 'closed', 'CAT-007', '2026-10-29 12:58:00', '2026-10-30 12:00:00', '2026-10-30 12:00:00', 1382, 'USR-003', 'USR-012'),
  ('TCK-0027', 'Zmiana uprawnień użytkownika', 'Zmiana dostępu użytkownika do wybranych zasobów firmowych.', '231e1dd11dz', 'new', 'CAT-004', '2026-10-14 11:36:00', '2026-10-14 14:10:00', NULL, NULL, 'USR-002', 'USR-002'),
  ('TCK-0028', 'Laptop przegrzewa się', 'Laptop bardzo mocno się nagrzewa i wyłącza podczas większego obciążenia.', '231e1dd11ds', 'new', 'CAT-001', '2026-10-26 12:48:00', '2026-10-26 17:08:00', NULL, NULL, NULL, 'USR-005'),
  ('TCK-0029', 'Problem z synchronizacją kalendarza', 'Wydarzenia dodane w telefonie nie pojawiają się w kalendarzu Outlook.', '231e1dd11d1', 'closed', 'CAT-005', '2026-10-26 09:28:00', '2026-10-27 21:12:00', '2026-10-27 21:12:00', 2144, 'USR-001', 'USR-006'),
  ('TCK-0030', 'Instalacja nowego stanowiska', 'Przygotowanie komputera, monitora, drukarki oraz podstawowego oprogramowania.', '231e1dd11dz', 'closed', 'CAT-009', '2026-10-19 09:01:00', '2026-10-20 10:21:00', '2026-10-20 10:21:00', 1520, 'USR-002', 'USR-010'),
  ('TCK-0031', 'Nie działa logowanie do VPN', 'Po wpisaniu danych logowania klient VPN zwraca błąd uwierzytelniania.', '231e1dd11ds', 'new', 'CAT-003', '2026-10-13 14:32:00', '2026-10-13 15:05:00', NULL, NULL, NULL, 'USR-003'),
  ('TCK-0032', 'Brak dostępu do dysku sieciowego', 'Użytkownik nie widzi zamapowanego dysku sieciowego po uruchomieniu komputera.', '231e1dd11d1', 'new', 'CAT-003', '2026-10-19 14:16:00', '2026-10-19 15:03:00', NULL, NULL, 'USR-001', 'USR-007'),
  ('TCK-0033', 'Problem z aktualizacją antywirusa', 'Oprogramowanie antywirusowe nie może pobrać najnowszych aktualizacji baz.', '231e1dd11ds', 'closed', 'CAT-007', '2026-10-19 10:16:00', '2026-10-19 21:40:00', '2026-10-19 21:40:00', 684, 'USR-003', 'USR-009'),
  ('TCK-0034', 'Konfiguracja drugiego monitora', 'Użytkownik potrzebuje pomocy przy podłączeniu i konfiguracji dodatkowego monitora.', '231e1dd11dz', 'closed', 'CAT-001', '2026-10-14 12:16:00', '2026-10-16 08:39:00', '2026-10-16 08:39:00', 2663, 'USR-002', 'USR-004'),
  ('TCK-0035', 'Poczta nie dochodzi do odbiorców', 'Wiadomości wysyłane z firmowego konta pozostają w skrzynce nadawczej.', '231e1dd11ds', 'new', 'CAT-005', '2026-10-13 13:27:00', '2026-10-13 15:14:00', NULL, NULL, NULL, 'USR-011'),
  ('TCK-0036', 'Błąd aplikacji magazynowej', 'Aplikacja magazynowa wyświetla błąd podczas próby zapisania dokumentu.', '231e1dd11d1', 'closed', 'CAT-002', '2026-10-15 12:10:00', '2026-10-18 09:17:00', '2026-10-18 09:17:00', 4147, 'USR-001', 'USR-010'),
  ('TCK-0037', 'Klawiatura przestaje działać', 'Klawiatura losowo przestaje reagować i wymaga ponownego podłączenia.', '231e1dd11dz', 'new', 'CAT-001', '2026-10-15 08:46:00', '2026-10-15 09:32:00', NULL, NULL, NULL, 'USR-006'),
  ('TCK-0038', 'Brak dostępu do systemu HR', 'Użytkownik otrzymuje komunikat o braku wymaganych uprawnień.', '231e1dd11d1', 'new', 'CAT-004', '2026-10-23 15:48:00', '2026-10-23 20:28:00', NULL, NULL, 'USR-003', 'USR-001'),
  ('TCK-0039', 'Komputer nie uruchamia się', 'Po naciśnięciu przycisku zasilania komputer nie reaguje.', '231e1dd11ds', 'closed', 'CAT-001', '2026-10-12 16:25:00', '2026-10-15 06:05:00', '2026-10-15 06:05:00', 3700, 'USR-002', 'USR-008'),
  ('TCK-0040', 'Problem z formatowaniem dokumentu', 'Dokument Word wyświetla nieprawidłowe formatowanie po otwarciu.', '231e1dd11dz', 'closed', 'CAT-002', '2026-10-07 15:41:00', '2026-10-08 03:36:00', '2026-10-08 03:36:00', 715, 'USR-001', 'USR-005'),
  ('TCK-0041', 'Brak dostępu do serwera plików', 'Kilku użytkowników nie może połączyć się z serwerem plików.', '231e1dd11ds', 'new', 'CAT-003', '2026-10-22 11:45:00', '2026-10-22 15:22:00', NULL, NULL, NULL, 'USR-012'),
  ('TCK-0042', 'Nie działa czytnik kart', 'Czytnik kart nie jest wykrywany przez komputer.', '231e1dd11d1', 'closed', 'CAT-001', '2026-10-25 10:08:00', '2026-10-28 05:16:00', '2026-10-28 05:16:00', 4028, 'USR-003', 'USR-002'),
  ('TCK-0043', 'Problem z aplikacją Teams', 'Połączenia w Microsoft Teams są przerywane po kilku minutach.', '231e1dd11d1', 'new', 'CAT-002', '2026-10-13 15:38:00', '2026-10-13 17:48:00', NULL, NULL, 'USR-002', 'USR-003'),
  ('TCK-0044', 'Konfiguracja poczty na telefonie', 'Potrzebna konfiguracja firmowej skrzynki pocztowej na urządzeniu mobilnym.', '231e1dd11dz', 'closed', 'CAT-005', '2026-10-15 11:15:00', '2026-10-17 07:02:00', '2026-10-17 07:02:00', 2627, 'USR-001', 'USR-007'),
  ('TCK-0045', 'Błąd drukarki sieciowej', 'Drukarka jest widoczna w systemie, ale dokumenty pozostają w kolejce.', '231e1dd11d1', 'new', 'CAT-006', '2026-10-23 17:11:00', '2026-10-23 20:09:00', NULL, NULL, NULL, 'USR-004'),
  ('TCK-0046', 'Nie działa skrót klawiaturowy', 'Wybrane skróty klawiaturowe przestały działać po aktualizacji systemu.', '231e1dd11dz', 'closed', 'CAT-008', '2026-10-13 09:54:00', '2026-10-14 22:32:00', '2026-10-14 22:32:00', 2198, 'USR-002', 'USR-006'),
  ('TCK-0047', 'Błąd synchronizacji OneDrive', 'Pliki nie synchronizują się pomiędzy komputerem a chmurą.', '231e1dd11d1', 'new', 'CAT-002', '2026-10-14 11:41:00', '2026-10-14 14:54:00', NULL, NULL, 'USR-003', 'USR-010'),
  ('TCK-0048', 'Podejrzane logowanie do konta', 'Użytkownik otrzymał powiadomienie o logowaniu z nieznanego urządzenia.', '231e1dd11ds', 'new', 'CAT-007', '2026-10-29 09:59:00', '2026-10-29 11:30:00', NULL, NULL, NULL, 'USR-011'),
  ('TCK-0049', 'Konfiguracja nowego laptopa', 'Przygotowanie laptopa dla nowego pracownika wraz z wymaganym oprogramowaniem.', '231e1dd11d1', 'closed', 'CAT-009', '2026-10-07 10:26:00', '2026-10-08 02:29:00', '2026-10-08 02:29:00', 963, 'USR-001', 'USR-005'),
  ('TCK-0050', 'Problem z połączeniem Bluetooth', 'Laptop nie wykrywa bezprzewodowych słuchawek Bluetooth.', '231e1dd11dz', 'closed', 'CAT-001', '2026-10-13 13:09:00', '2026-10-15 05:51:00', '2026-10-15 05:51:00', 2442, 'USR-002', 'USR-009'),
  ('TCK-0051', 'Nie można otworzyć pliku Excel', 'Program Excel wyświetla błąd podczas próby otwarcia konkretnego dokumentu.', '231e1dd11d1', 'new', 'CAT-002', '2026-10-24 17:00:00', '2026-10-24 22:42:00', NULL, NULL, NULL, 'USR-002'),
  ('TCK-0052', 'Brak internetu w biurze', 'Stanowisko nie ma dostępu do internetu mimo poprawnego połączenia z routerem.', '231e1dd11ds', 'new', 'CAT-003', '2026-10-19 10:17:00', '2026-10-19 13:20:00', NULL, NULL, 'USR-003', 'USR-008'),
  ('TCK-0053', 'Problem z kamerą w laptopie', 'Wbudowana kamera przestała działać po aktualizacji sterowników.', '231e1dd11dz', 'closed', 'CAT-001', '2026-10-26 09:04:00', '2026-10-26 10:59:00', '2026-10-26 10:59:00', 115, 'USR-001', 'USR-003'),
  ('TCK-0054', 'Błąd certyfikatu bezpieczeństwa', 'Przeglądarka wyświetla ostrzeżenie dotyczące certyfikatu podczas wejścia do aplikacji.', '231e1dd11ds', 'new', 'CAT-007', '2026-10-23 11:25:00', '2026-10-23 15:56:00', NULL, NULL, NULL, 'USR-012'),
  ('TCK-0055', 'Zmiana nazwy komputera', 'Potrzebna zmiana nazwy komputera zgodnie ze standardem firmowym.', '231e1dd11dz', 'closed', 'CAT-009', '2026-10-15 15:20:00', '2026-10-18 09:43:00', '2026-10-18 09:43:00', 3983, 'USR-002', 'USR-001'),
  ('TCK-0056', 'Błąd podczas logowania do CRM', 'Użytkownik zostaje przekierowany na stronę logowania po każdej próbie otwarcia CRM.', '231e1dd11d1', 'new', 'CAT-002', '2026-10-28 10:21:00', '2026-10-28 10:52:00', NULL, NULL, 'USR-003', 'USR-006'),
  ('TCK-0057', 'Brak miejsca na serwerze', 'Na serwerze plików kończy się dostępne miejsce na dane.', '231e1dd11ds', 'new', 'CAT-003', '2026-10-19 17:06:00', '2026-10-19 18:52:00', NULL, NULL, NULL, 'USR-007'),
  ('TCK-0058', 'Instalacja aktualizacji Windows', 'Komputer wymaga instalacji zaległych aktualizacji systemowych.', '231e1dd11dz', 'closed', 'CAT-008', '2026-10-30 10:18:00', '2026-10-30 12:00:00', '2026-10-30 12:00:00', 102, 'USR-001', 'USR-004'),
  ('TCK-0059', 'Problem z synchronizacją kontaktów', 'Kontakty z firmowej książki adresowej nie synchronizują się z telefonem.', '231e1dd11d1', 'closed', 'CAT-005', '2026-10-16 17:16:00', '2026-10-19 06:03:00', '2026-10-19 06:03:00', 3647, 'USR-002', 'USR-010'),
  ('TCK-0060', 'Awaria stacji dokującej', 'Stacja dokująca przestała wykrywać monitor oraz urządzenia USB.', '231e1dd11ds', 'new', 'CAT-001', '2026-10-12 16:47:00', '2026-10-12 17:58:00', NULL, NULL, NULL, 'USR-005')
ON DUPLICATE KEY UPDATE `id` = `id`;
COMMIT;

-- Verify: SELECT COUNT(*) FROM `tickets`; -- expected 60
-- Verify foreign-key integrity:
-- SELECT COUNT(*) FROM tickets t LEFT JOIN users u ON u.id=t.customer_id WHERE u.id IS NULL; -- expected 0
