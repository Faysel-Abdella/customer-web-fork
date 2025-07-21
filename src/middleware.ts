import { NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { isAuthenticated } from "./lib/auth";

const protectedRoutes = [
  "/home",
  "/change-password",
  "/profile-update",
  "/profile",
];

export default async function middleware(request: NextRequest) {
  const withI18nMiddleware = createMiddleware(routing);
  const [, , ...segments] = request.nextUrl.pathname.split("/");

  const pathname = "/" + segments.join("/");
  const loggedIn = await isAuthenticated();

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (!loggedIn && isProtected) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return withI18nMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
