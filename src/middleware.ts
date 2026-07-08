import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection middleware
 * Protects /teacher/* and /student/* routes based on auth cookie
 * Redirects unauthenticated users to /login
 * Redirects users with wrong role to their respective dashboard
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect teacher and student routes
  const isTeacherRoute = pathname.startsWith("/teacher");
  const isStudentRoute = pathname.startsWith("/student");

  if (!isTeacherRoute && !isStudentRoute) {
    return NextResponse.next();
  }

  // Check auth cookie
  const authCookie = request.cookies.get("neet-qgen-auth")?.value;

  if (!authCookie) {
    // Not authenticated - redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Parse auth cookie to check role
  try {
    const auth = JSON.parse(decodeURIComponent(authCookie));
    const userRole = auth.role as string;

    if (isTeacherRoute && userRole !== "teacher") {
      // Student trying to access teacher route
      return NextResponse.redirect(new URL("/student", request.url));
    }

    if (isStudentRoute && userRole !== "student") {
      // Teacher trying to access student route
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
  } catch {
    // Invalid cookie - clear it and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("neet-qgen-auth");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*"],
};
