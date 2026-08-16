import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me"
const secret = new TextEncoder().encode(JWT_SECRET)

export const SESSION_COOKIE = "admin_token"
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface SessionPayload {
    sub: string // admin email
    [key: string]: unknown
}

export async function signToken(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_MAX_AGE}s`)
        .sign(secret)
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as SessionPayload
    } catch {
        return null
    }
}

export function validateCredentials(email: string, password: string): boolean {
    const adminEmail = process.env.ADMIN_EMAIL || ""
    const adminPassword = process.env.ADMIN_PASSWORD || ""
    
    return email === adminEmail && password === adminPassword && adminEmail !== ""
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value
    if (!token) return null
    return verifyToken(token)
}

export { SESSION_MAX_AGE }
