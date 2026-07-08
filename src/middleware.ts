import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('neet-qgen-auth')
  const { pathname } = request.nextUrl

  // Public routes
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next()
  }

  // Check auth for protected routes
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const user = JSON.parse(decodeURIComponent(authCookie.value))

    // Teacher routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/generate') || pathname.startsWith('/review') || pathname.startsWith('/question-bank') || pathname.startsWith('/export-history')) {
      if (user.role !== 'teacher') {
        return NextResponse.redirect(new URL('/student', request.url))
      }
    }

    // Student routes
    if (pathname.startsWith('/student')) {
      if (user.role !== 'student') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/generate/:path*', '/review/:path*', '/question-bank/:path*', '/export-history/:path*', '/student/:path*', '/settings/:path*'],
}
