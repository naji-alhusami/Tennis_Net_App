import { NextResponse } from "next/server";
import { auth } from "@/auth";

const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/verifyEmail"];

const authOnlyRoutes = ["/auth/login", "/auth/signup"];

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|mp4|webm|ogg)).*)",
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
  // if (isLoggedIn && isAuthOnlyRoute) {
  //   return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  // }
  if (isLoggedIn && isAuthOnlyRoute) {
    const role = (req.auth?.user)?.role; // depends on your session shape
    // If onboarding not completed, go to profile
    if (!role) {
      return NextResponse.redirect(new URL("/auth/profile", nextUrl.origin));
    }
    // Otherwise go to dashboard
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
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
