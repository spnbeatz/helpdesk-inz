import { ApiClient } from "./config/client";
import { apiConfig } from "./config/config";

import { AuthService } from "./services_new/auth.service";
import { CategoriesService } from "./services_new/categories.service";
import { LogisticsService } from "./services_new/logistics.service";
import { OrdersService } from "./services_new/orders.service";
import { ReportsService } from "./services_new/reports.service";
import { StatisticsService } from "./services_new/statistics.service";
import { TicketsService } from "./services_new/tickets.service";
import { UsersService } from "./services_new/users.service";

export const api = new ApiClient(apiConfig);

export const authService = new AuthService(api);
export const categoriesService = new CategoriesService(api);
export const logisticsService = new LogisticsService(api);
export const ordersService = new OrdersService(api);
export const ticketsService = new TicketsService(api);
export const usersService = new UsersService(api);
export const statisticsService = new StatisticsService(api);
export const reportsService = new ReportsService(api);

