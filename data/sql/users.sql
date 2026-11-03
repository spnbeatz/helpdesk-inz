-- Helpdesk / MySQL 8.0+ / utf8mb4
-- Database schema and seed data mapped from TypeScript users, locations, roles, permissions.
-- Execute on a NEW schema or review before running: DROP TABLE IF EXISTS deletes existing tables!
-- All source timestamps ending with Z are stored as UTC DATETIME values.
-- Derived arrays (customersList, users) are provided as SQL views, not redundant tables.

CREATE DATABASE IF NOT EXISTS `helpdesk`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `helpdesk`;
SET NAMES utf8mb4;

DROP VIEW IF EXISTS `customers_view`;
DROP VIEW IF EXISTS `users_view`;
DROP TABLE IF EXISTS `role_blocked_routes`;
DROP TABLE IF EXISTS `role_permissions`;
DROP TABLE IF EXISTS `user_roles`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
 `id` VARCHAR(20) NOT NULL,
 `name` VARCHAR(150) NOT NULL,
 `city` VARCHAR(100) NOT NULL,
 `type` ENUM('branch','warehouse') NOT NULL,
 `parent_id` VARCHAR(20) NULL,
 PRIMARY KEY (`id`),
 INDEX `idx_locations_parent` (`parent_id`),
 CONSTRAINT `fk_locations_parent` FOREIGN KEY (`parent_id`) REFERENCES `locations` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
 `id` VARCHAR(20) NOT NULL,
 `first_name` VARCHAR(100) NOT NULL,
 `last_name` VARCHAR(100) NOT NULL,
 `email` VARCHAR(255) NOT NULL,
 `phone` VARCHAR(40) NOT NULL,
 `status` ENUM('active','inactive','blocked') NOT NULL,
 `department` VARCHAR(100) NOT NULL,
 `position` VARCHAR(150) NOT NULL,
 `location_id` VARCHAR(20) NOT NULL,
 `avatar_url` TEXT NULL,
 `created_at` DATETIME NOT NULL,
 `last_login_at` DATETIME NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `uq_users_email` (`email`),
 INDEX `idx_users_location` (`location_id`),
 CONSTRAINT `fk_users_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `roles` (
 `id` VARCHAR(20) NOT NULL,
 `name` VARCHAR(100) NOT NULL,
 `description` TEXT NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `uq_roles_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `permissions` (
 `id` VARCHAR(20) NOT NULL,
 `name` VARCHAR(150) NOT NULL,
 `description` TEXT NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `uq_permissions_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_roles` (
 `user_id` VARCHAR(20) NOT NULL,
 `role_id` VARCHAR(20) NOT NULL,
 PRIMARY KEY (`user_id`,`role_id`),
 INDEX `idx_user_roles_role` (`role_id`),
 CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
 CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `role_permissions` (
 `role_id` VARCHAR(20) NOT NULL,
 `permission_id` VARCHAR(20) NOT NULL,
 PRIMARY KEY (`role_id`,`permission_id`),
 INDEX `idx_role_permissions_permission` (`permission_id`),
 CONSTRAINT `fk_role_permissions_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
 CONSTRAINT `fk_role_permissions_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `role_blocked_routes` (
 `role_id` VARCHAR(20) NOT NULL,
 `route_key` VARCHAR(150) NOT NULL,
 PRIMARY KEY (`role_id`,`route_key`),
 CONSTRAINT `fk_role_blocked_routes_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert parent branch locations before nested warehouses.
INSERT INTO `locations` (`id`, `name`, `city`, `type`, `parent_id`) VALUES
  ('LOC-002', 'Oddział Warszawa', 'Warszawa', 'branch', NULL),
  ('LOC-003', 'Oddział Kraków', 'Kraków', 'branch', NULL),
  ('LOC-005', 'Oddział Wrocław', 'Wrocław', 'branch', NULL),
  ('LOC-007', 'Oddział Poznań', 'Poznań', 'branch', NULL),
  ('LOC-009', 'Oddział Gdańsk', 'Gdańsk', 'branch', NULL),
  ('LOC-011', 'Oddział Łódź', 'Łódź', 'branch', NULL),
  ('LOC-013', 'Oddział Katowice', 'Katowice', 'branch', NULL),
  ('LOC-015', 'Oddział Szczecin', 'Szczecin', 'branch', NULL),
  ('LOC-017', 'Oddział Lublin', 'Lublin', 'branch', NULL),
  ('LOC-019', 'Oddział Rzeszów', 'Rzeszów', 'branch', NULL),
  ('LOC-001', 'Magazyn IT Warszawa', 'Warszawa', 'warehouse', 'LOC-002'),
  ('LOC-004', 'Magazyn IT Kraków', 'Kraków', 'warehouse', 'LOC-003'),
  ('LOC-006', 'Magazyn IT Wrocław', 'Wrocław', 'warehouse', 'LOC-005'),
  ('LOC-008', 'Magazyn IT Poznań', 'Poznań', 'warehouse', 'LOC-007'),
  ('LOC-010', 'Magazyn IT Gdańsk', 'Gdańsk', 'warehouse', 'LOC-009'),
  ('LOC-012', 'Magazyn IT Łódź', 'Łódź', 'warehouse', 'LOC-011'),
  ('LOC-014', 'Magazyn IT Katowice', 'Katowice', 'warehouse', 'LOC-013'),
  ('LOC-016', 'Magazyn IT Szczecin', 'Szczecin', 'warehouse', 'LOC-015'),
  ('LOC-018', 'Magazyn IT Lublin', 'Lublin', 'warehouse', 'LOC-017'),
  ('LOC-020', 'Magazyn IT Rzeszów', 'Rzeszów', 'warehouse', 'LOC-019'),
  ('LOC-021', 'Serwis IT Warszawa', 'Warszawa', 'warehouse', 'LOC-002');

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `status`, `department`, `position`, `location_id`, `avatar_url`, `created_at`, `last_login_at`) VALUES
  ('USR-001', 'Adam', 'Kowalski', 'adam.kowalski@company.pl', '+48 501 234 101', 'active', 'IT', 'IT Administrator', 'LOC-002', 'https://th.bing.com/th/id/OIP._32M20QZ2_4OnsoFzIRfdAHaHa?w=154&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-01-12 08:30:00', '2026-09-10 07:42:00'),
  ('USR-002', 'Michał', 'Nowak', 'michal.nowak@company.pl', '+48 502 341 221', 'active', 'IT', 'IT Support Specialist', 'LOC-002', 'https://th.bing.com/th/id/OIP.vhI6WDCn5wYm7burmn87MgHaGG?w=204&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-03-18 10:15:00', '2026-09-11 06:58:00'),
  ('USR-003', 'Piotr', 'Wiśniewski', 'piotr.wisniewski@company.pl', '+48 503 672 315', 'active', 'IT', 'Helpdesk Technician', 'LOC-007', 'https://th.bing.com/th/id/OIP.KfJyyO5MvvMU86PvnZ5IeAHaHa?w=171&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-06-02 09:20:00', '2026-09-10 15:31:00'),
  ('USR-004', 'Anna', 'Lewandowska', 'anna.lewandowska@company.pl', '+48 504 821 443', 'active', 'Sales', 'Sales Manager', 'LOC-003', 'https://th.bing.com/th/id/OIP.H7pX-M8lF6Xbc8IQs0NoiQHaGH?w=198&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-02-21 11:45:00', '2026-09-10 12:18:00'),
  ('USR-005', 'Tomasz', 'Wójcik', 'tomasz.wojcik@company.pl', '+48 505 194 552', 'active', 'Finance', 'Financial Analyst', 'LOC-002', 'https://th.bing.com/th/id/OIP.ASUkkTjX8b8qdMiT41hcIwHaHa?w=171&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-08-14 07:50:00', '2026-09-09 09:12:00'),
  ('USR-006', 'Katarzyna', 'Kamińska', 'katarzyna.kaminska@company.pl', '+48 506 728 661', 'active', 'HR', 'HR Specialist', 'LOC-009', 'https://th.bing.com/th/id/OIP.0AnR43zWdi414PM4uU6-TwHaFa?w=214&h=183&c=7&r=0&o=7&pid=1.7&rm=3', '2024-01-09 13:10:00', '2026-09-11 08:03:00'),
  ('USR-007', 'Paweł', 'Zieliński', 'pawel.zielinski@company.pl', '+48 507 315 772', 'active', 'Marketing', 'Marketing Specialist', 'LOC-002', 'https://th.bing.com/th/id/OIP.1JvRljDwRFR__zC-KJReJQHaE9?w=274&h=183&c=7&r=0&o=7&pid=1.7&rm=3', '2024-02-17 10:30:00', '2026-09-08 14:44:00'),
  ('USR-008', 'Magdalena', 'Dąbrowska', 'magdalena.dabrowska@company.pl', '+48 508 462 883', 'active', 'Legal', 'Legal Specialist', 'LOC-002', 'https://th.bing.com/th/id/OIP.sZFAZRSt0WQjEBxZJCWfCQHaHa?w=171&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2024-03-11 09:05:00', '2026-09-10 10:22:00'),
  ('USR-009', 'Jakub', 'Szymański', 'jakub.szymanski@company.pl', '+48 509 583 994', 'active', 'Operations', 'Operations Specialist', 'LOC-005', 'https://th.bing.com/th/id/OIP.gD7GPAi1PDYfsUddJDgpOgHaHa?w=170&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2024-04-23 08:40:00', '2026-09-09 16:11:00'),
  ('USR-010', 'Natalia', 'Woźniak', 'natalia.wozniak@company.pl', '+48 510 624 105', 'active', 'Sales', 'Account Manager', 'LOC-007', 'https://th.bing.com/th/id/OIP.KJE-Xx-NwUbIwbNfnEYGpgHaIV?w=152&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2024-05-06 12:20:00', '2026-09-11 07:35:00'),
  ('USR-011', 'Krzysztof', 'Jankowski', 'krzysztof.jankowski@company.pl', '+48 511 735 216', 'active', 'Logistics', 'Logistics Coordinator', 'LOC-011', 'https://th.bing.com/th/id/OIP.0CEOgJYqeuFQIDdBNpCS7AHaHa?w=185&h=184&c=7&r=0&o=7&pid=1.7&rm=3', '2024-06-18 14:15:00', '2026-09-10 11:46:00'),
  ('USR-012', 'Joanna', 'Mazur', 'joanna.mazur@company.pl', '+48 512 846 327', 'active', 'Administration', 'Office Administrator', 'LOC-003', 'https://th.bing.com/th/id/OIP.ru3MDRWFnt4p5cNb9x_r9AHaHa?w=183&h=183&c=7&r=0&o=7&pid=1.7&rm=3', '2024-07-04 08:55:00', '2026-09-10 08:31:00'),
  ('USR-013', 'Marcin', 'Kaczmarek', 'marcin.kaczmarek@company.pl', '+48 513 957 438', 'inactive', 'Sales', 'Sales Representative', 'LOC-005', 'https://th.bing.com/th/id/OIP.ErzwUlEoaIE2DMzmNjm3QgHaEK?w=322&h=186&c=7&r=0&o=7&pid=1.7&rm=3', '2023-11-19 10:40:00', '2026-07-21 13:19:00'),
  ('USR-014', 'Monika', 'Król', 'monika.krol@company.pl', '+48 514 168 549', 'active', 'Finance', 'Accountant', 'LOC-002', 'https://th.bing.com/th/id/OIP.-Rh3ZpioWtNtd1b6v0H45gHaGf?w=184&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2024-08-12 11:25:00', '2026-09-09 07:58:00'),
  ('USR-015', 'Daniel', 'Wieczorek', 'daniel.wieczorek@company.pl', '+48 515 279 650', 'active', 'IT', 'System Administrator', 'LOC-002', 'https://th.bing.com/th/id/OIP.6Ms4HZrTyGoGrFfzzyYO0AHaLH?w=132&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-05-27 09:30:00', '2026-09-11 08:19:00'),
  ('USR-016', 'Aleksandra', 'Pawlak', 'aleksandra.pawlak@company.pl', '+48 516 381 761', 'blocked', 'Marketing', 'Content Specialist', 'LOC-009', 'https://th.bing.com/th/id/OIP.uNjRJCLgQv3Pz5cPDORJ7AHaKK?w=132&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2024-09-02 12:05:00', '2026-08-28 09:41:00'),
  ('USR-017', 'Robert', 'Lis', 'robert.lis@company.pl', '+48 517 492 872', 'active', 'Operations', 'Operations Manager', 'LOC-011', 'https://th.bing.com/th/id/OIP.qPvUF5cEHh2MSx5gXuu8hAHaHa?w=177&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-09-15 08:10:00', '2026-09-10 16:02:00'),
  ('USR-018', 'Karolina', 'Adamczyk', 'karolina.adamczyk@company.pl', '+48 518 503 983', 'active', 'HR', 'Recruitment Specialist', 'LOC-007', 'https://th.bing.com/th/id/OIP.1xmxFYs5VGs5u-1v-S_v_gHaFp?w=243&h=185&c=7&r=0&o=7&pid=1.7&rm=3', '2024-10-08 09:45:00', '2026-09-11 07:12:00'),
  ('USR-019', 'Łukasz', 'Górski', 'lukasz.gorski@company.pl', '+48 519 614 194', 'active', 'Engineering', 'Software Engineer', 'LOC-002', 'https://th.bing.com/th/id/OIP.QfyKr9mFxhryDLOVPTqlSwHaFo?w=208&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2024-11-16 13:35:00', '2026-09-11 08:27:00'),
  ('USR-020', 'Weronika', 'Rutkowska', 'weronika.rutkowska@company.pl', '+48 520 725 205', 'active', 'Engineering', 'QA Engineer', 'LOC-002', 'https://th.bing.com/th/id/OIP.MCHqaZL02mqz1JKqpdioEwHaE8?w=236&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2025-01-13 10:20:00', '2026-09-10 09:47:00'),
  ('USR-021', 'Mateusz', 'Błaszczyk', 'mateusz.blaszczyk@company.pl', '+48 521 836 316', 'active', 'Engineering', 'DevOps Engineer', 'LOC-003', 'https://th.bing.com/th/id/OIP.Hpelb-U7MkYoJXCSfsUL6AHaHa?w=158&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2025-02-24 07:45:00', '2026-09-11 08:08:00'),
  ('USR-022', 'Patrycja', 'Sikora', 'patrycja.sikora@company.pl', '+48 522 947 427', 'active', 'Administration', 'Administrative Specialist', 'LOC-009', 'https://th.bing.com/th/id/OIP.iyOIYoYmEzojo8TH13SUxgHaFj?w=210&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2025-03-09 11:10:00', '2026-09-09 12:26:00'),
  ('USR-023', 'Grzegorz', 'Pietrzak', 'grzegorz.pietrzak@company.pl', '+48 523 158 538', 'active', 'IT', 'Network Administrator', 'LOC-002', 'https://th.bing.com/th/id/OIP.bKP5TlBCQrH1ZMqDeKKvSQHaHa?w=160&h=180&c=7&r=0&o=7&pid=1.7&rm=3', '2023-07-31 08:35:00', '2026-09-11 06:45:00'),
  ('USR-024', 'Ewa', 'Ostrowska', 'ewa.ostrowska@company.pl', '+48 524 269 649', 'inactive', 'Legal', 'Legal Assistant', 'LOC-003', 'https://th.bing.com/th/id/OIP.K1Sy86v-Mj1UlHEcE2NbXQHaEK?w=300&h=185&c=7&r=0&o=7&pid=1.7&rm=3', '2024-02-05 14:50:00', '2026-06-18 10:12:00');

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
  ('ROLE-001', 'Administrator', 'Full access to the helpdesk system'),
  ('ROLE-002', 'Technician', 'Handles tickets and provides technical support'),
  ('ROLE-003', 'Manager', 'Can monitor tickets and team performance'),
  ('ROLE-004', 'User', 'Can create and manage own support tickets');

INSERT INTO `permissions` (`id`, `name`, `description`) VALUES
  ('PERM-001', 'tickets.view', 'View tickets'),
  ('PERM-123', 'tickets.viewAll', 'View all tickets'),
  ('PERM-002', 'tickets.create', 'Create tickets'),
  ('PERM-003', 'tickets.edit', 'Edit tickets'),
  ('PERM-004', 'tickets.delete', 'Delete tickets'),
  ('PERM-005', 'tickets.assign.self', 'Assign unassigned tickets to yourself'),
  ('PERM-027', 'tickets.assign.other', 'Assign unassigned tickets to another technician'),
  ('PERM-028', 'tickets.reassign', 'Transfer assigned tickets to another technician'),
  ('PERM-006', 'tickets.close', 'Close tickets'),
  ('PERM-192', 'tickets.remote', 'Remote resolve'),
  ('PERM-007', 'users.view', 'View users'),
  ('PERM-008', 'users.create', 'Create users'),
  ('PERM-009', 'users.edit', 'Edit users'),
  ('PERM-010', 'users.delete', 'Delete users'),
  ('PERM-011', 'equipment.view', 'View equipment'),
  ('PERM-012', 'equipment.create', 'Add equipment'),
  ('PERM-013', 'equipment.edit', 'Edit equipment'),
  ('PERM-014', 'equipment.delete', 'Delete equipment'),
  ('PERM-015', 'equipment.assign', 'Assign equipment to users'),
  ('PERM-016', 'orders.view', 'View orders'),
  ('PERM-017', 'orders.create', 'Create orders'),
  ('PERM-018', 'orders.edit', 'Edit orders'),
  ('PERM-019', 'orders.delete', 'Delete orders'),
  ('PERM-020', 'statistics.view', 'View helpdesk statistics'),
  ('PERM-021', 'settings.view', 'View system settings'),
  ('PERM-022', 'settings.edit', 'Modify system settings'),
  ('PERM-023', 'roles.view', 'View roles'),
  ('PERM-024', 'roles.create', 'Create roles'),
  ('PERM-025', 'roles.edit', 'Edit roles'),
  ('PERM-026', 'roles.delete', 'Delete roles'),
  ('PERM-029', 'locations.view', 'View company locations'),
  ('PERM-030', 'locations.manage', 'Create, edit and delete locations'),
  ('PERM-031', 'inventory.view.all', 'View inventory across all locations'),
  ('PERM-032', 'inventory.view.branch', 'View inventory in assigned branches'),
  ('PERM-033', 'equipment.reserve', 'Reserve available equipment'),
  ('PERM-034', 'equipment.release', 'Confirm equipment handover to users'),
  ('PERM-035', 'equipment.return', 'Process equipment returns'),
  ('PERM-036', 'equipment.transfer', 'Transfer equipment between locations'),
  ('PERM-037', 'equipment.history', 'View equipment assignment history'),
  ('PERM-038', 'orders.approve', 'Approve or decline equipment orders'),
  ('PERM-039', 'orders.process', 'Start processing approved orders'),
  ('PERM-040', 'orders.complete', 'Complete orders after equipment delivery'),
  ('PERM-041', 'products.view', 'View orderable products catalog'),
  ('PERM-042', 'products.manage', 'Create, edit and deactivate catalog products'),
  ('PERM-043', 'equipment.reservation.cancel', 'Cancel equipment reservations'),
  ('PERM-044', 'equipment.view.own', 'View equipment assigned to yourself');

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
  ('USR-001', 'ROLE-001'),
  ('USR-002', 'ROLE-002'),
  ('USR-003', 'ROLE-002'),
  ('USR-004', 'ROLE-003'),
  ('USR-005', 'ROLE-004'),
  ('USR-006', 'ROLE-004'),
  ('USR-007', 'ROLE-004'),
  ('USR-008', 'ROLE-004'),
  ('USR-009', 'ROLE-004'),
  ('USR-010', 'ROLE-004'),
  ('USR-011', 'ROLE-004'),
  ('USR-012', 'ROLE-004'),
  ('USR-013', 'ROLE-004'),
  ('USR-014', 'ROLE-004'),
  ('USR-015', 'ROLE-002'),
  ('USR-016', 'ROLE-004'),
  ('USR-017', 'ROLE-003'),
  ('USR-018', 'ROLE-004'),
  ('USR-019', 'ROLE-004'),
  ('USR-020', 'ROLE-004'),
  ('USR-021', 'ROLE-004'),
  ('USR-022', 'ROLE-004'),
  ('USR-023', 'ROLE-002'),
  ('USR-024', 'ROLE-004');

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
  ('ROLE-001', 'PERM-001'),
  ('ROLE-001', 'PERM-002'),
  ('ROLE-001', 'PERM-003'),
  ('ROLE-001', 'PERM-004'),
  ('ROLE-001', 'PERM-005'),
  ('ROLE-001', 'PERM-006'),
  ('ROLE-001', 'PERM-007'),
  ('ROLE-001', 'PERM-008'),
  ('ROLE-001', 'PERM-009'),
  ('ROLE-001', 'PERM-010'),
  ('ROLE-001', 'PERM-011'),
  ('ROLE-001', 'PERM-012'),
  ('ROLE-001', 'PERM-013'),
  ('ROLE-001', 'PERM-014'),
  ('ROLE-001', 'PERM-015'),
  ('ROLE-001', 'PERM-016'),
  ('ROLE-001', 'PERM-017'),
  ('ROLE-001', 'PERM-018'),
  ('ROLE-001', 'PERM-019'),
  ('ROLE-001', 'PERM-020'),
  ('ROLE-001', 'PERM-021'),
  ('ROLE-001', 'PERM-022'),
  ('ROLE-001', 'PERM-023'),
  ('ROLE-001', 'PERM-024'),
  ('ROLE-001', 'PERM-025'),
  ('ROLE-001', 'PERM-026'),
  ('ROLE-001', 'PERM-123'),
  ('ROLE-001', 'PERM-192'),
  ('ROLE-001', 'PERM-027'),
  ('ROLE-001', 'PERM-028'),
  ('ROLE-002', 'PERM-001'),
  ('ROLE-002', 'PERM-002'),
  ('ROLE-002', 'PERM-003'),
  ('ROLE-002', 'PERM-005'),
  ('ROLE-002', 'PERM-006'),
  ('ROLE-002', 'PERM-007'),
  ('ROLE-002', 'PERM-011'),
  ('ROLE-002', 'PERM-012'),
  ('ROLE-002', 'PERM-013'),
  ('ROLE-002', 'PERM-015'),
  ('ROLE-002', 'PERM-016'),
  ('ROLE-002', 'PERM-017'),
  ('ROLE-002', 'PERM-020'),
  ('ROLE-002', 'PERM-123'),
  ('ROLE-002', 'PERM-192'),
  ('ROLE-002', 'PERM-028'),
  ('ROLE-003', 'PERM-001'),
  ('ROLE-003', 'PERM-006'),
  ('ROLE-003', 'PERM-007'),
  ('ROLE-003', 'PERM-011'),
  ('ROLE-003', 'PERM-016'),
  ('ROLE-003', 'PERM-020'),
  ('ROLE-003', 'PERM-021'),
  ('ROLE-003', 'PERM-027'),
  ('ROLE-004', 'PERM-001'),
  ('ROLE-004', 'PERM-002'),
  ('ROLE-001', 'PERM-029'),
  ('ROLE-001', 'PERM-030'),
  ('ROLE-001', 'PERM-031'),
  ('ROLE-001', 'PERM-032'),
  ('ROLE-001', 'PERM-033'),
  ('ROLE-001', 'PERM-034'),
  ('ROLE-001', 'PERM-035'),
  ('ROLE-001', 'PERM-036'),
  ('ROLE-001', 'PERM-037'),
  ('ROLE-001', 'PERM-038'),
  ('ROLE-001', 'PERM-039'),
  ('ROLE-001', 'PERM-040'),
  ('ROLE-001', 'PERM-041'),
  ('ROLE-001', 'PERM-042'),
  ('ROLE-001', 'PERM-043'),
  ('ROLE-001', 'PERM-044'),
  ('ROLE-002', 'PERM-029'),
  ('ROLE-002', 'PERM-031'),
  ('ROLE-002', 'PERM-032'),
  ('ROLE-002', 'PERM-033'),
  ('ROLE-002', 'PERM-034'),
  ('ROLE-002', 'PERM-035'),
  ('ROLE-002', 'PERM-037'),
  ('ROLE-002', 'PERM-039'),
  ('ROLE-002', 'PERM-040'),
  ('ROLE-002', 'PERM-041'),
  ('ROLE-002', 'PERM-043'),
  ('ROLE-002', 'PERM-044'),
  ('ROLE-003', 'PERM-029'),
  ('ROLE-003', 'PERM-031'),
  ('ROLE-003', 'PERM-032'),
  ('ROLE-003', 'PERM-036'),
  ('ROLE-003', 'PERM-037'),
  ('ROLE-003', 'PERM-038'),
  ('ROLE-003', 'PERM-041'),
  ('ROLE-003', 'PERM-044'),
  ('ROLE-004', 'PERM-044');

INSERT INTO `role_blocked_routes` (`role_id`, `route_key`) VALUES
  ('ROLE-002', 'settings.users'),
  ('ROLE-002', 'settings.roles'),
  ('ROLE-002', 'settings.tickets'),
  ('ROLE-003', 'tickets'),
  ('ROLE-003', 'reports'),
  ('ROLE-003', 'settings.users'),
  ('ROLE-003', 'settings.roles'),
  ('ROLE-003', 'settings.tickets'),
  ('ROLE-004', 'reports'),
  ('ROLE-004', 'settings.users'),
  ('ROLE-004', 'settings.roles'),
  ('ROLE-004', 'settings.tickets'),
  ('ROLE-004', 'customer');

-- UserType -> `users` table; CustomerType and enriched User -> views.
CREATE VIEW `customers_view` AS
SELECT u.id,
       CONCAT(u.first_name, ' ', u.last_name) AS name,
       u.email, u.phone, u.department, u.position,
       u.location_id,
       COALESCE(l.name, 'Unknown location') AS locationName,
       COALESCE(u.avatar_url, '') AS avatarUrl
FROM `users` u
LEFT JOIN `locations` l ON l.id = u.location_id;

-- roleNames / permissions correspond to TS arrays (JSON arrays in MySQL 8).
-- Aggregation is performed via separate correlated queries to prevent duplicates.
CREATE VIEW `users_view` AS
SELECT u.*,
       COALESCE(l.name, '') AS locationName,
       COALESCE((
          SELECT JSON_ARRAYAGG(r.name)
          FROM `user_roles` ur JOIN `roles` r ON r.id = ur.role_id
          WHERE ur.user_id = u.id
       ), JSON_ARRAY()) AS roleNames,
       COALESCE((
          SELECT JSON_ARRAYAGG(p.name)
          FROM `permissions` p
          WHERE EXISTS (
             SELECT 1 FROM `user_roles` ur
             JOIN `role_permissions` rp ON rp.role_id = ur.role_id
             WHERE ur.user_id = u.id AND rp.permission_id = p.id
          )
       ), JSON_ARRAY()) AS permissions
FROM `users` u
LEFT JOIN `locations` l ON l.id = u.location_id;

-- Quick validation:
SELECT (SELECT COUNT(*) FROM users) AS users_count,
       (SELECT COUNT(*) FROM locations) AS locations_count,
       (SELECT COUNT(*) FROM roles) AS roles_count,
       (SELECT COUNT(*) FROM permissions) AS permissions_count,
       (SELECT COUNT(*) FROM user_roles) AS user_roles_count,
       (SELECT COUNT(*) FROM role_permissions) AS role_permissions_count,
       (SELECT COUNT(*) FROM role_blocked_routes) AS blocked_routes_count;
