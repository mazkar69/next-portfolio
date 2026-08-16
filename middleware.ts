import { NextResponse, type NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me"
const secret = new TextEncoder().encode(JWT_SECRET)
const SESSION_COOKIE = "admin_token"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the login page and auth API through
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth/")) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    return redirectToLogin(request)
  }

  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    return redirectToLogin(request)
  }
}

function redirectToLogin(request: NextRequest) {
  // API routes get 401, pages get redirected
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const loginUrl = new URL("/admin/login", request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
 