import { createApiService } from "./apiFactory";

export const userApiService = createApiService({
  baseUrl: "/api/users",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
