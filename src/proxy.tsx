import { NextResponse } from "next/server";
import { auth } from "@/auth";

const publicRoutes = ["/", "/auth/login", "/auth/signup", "/verifyEmail"];

const authOnlyRoutes = ["/auth/login", "/auth/signup"];

export const config = {
  matcher: [
    // run on everything EXCEPT:
    // - /api/*
    // - /_next/*
    // - static files like /favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  const isAuthOnlyRoute = authOnlyRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  // Unauthenticated users: redirect to /auth/login
  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL("/auth/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", path + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Logged-in users cannot visit login/signup
  if (isLoggedIn && isAuthOnlyRoute) {
    return NextResponse.redirect(new URL("/user", nextUrl.origin));
  }

  // If no rule triggered: continue as normal
  return NextResponse.next();

  // TODO (future improvements):
  // - Add role-based protection (PLAYER / COACH).
  // - Add onboarding-step redirect logic.
  // - Add internal rewrites for docs/help pages.
  // - Add custom debug/security headers.
  // - Add lightweight rate limiting for API routes.
});
