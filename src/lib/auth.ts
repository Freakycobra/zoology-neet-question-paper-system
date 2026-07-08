/**
 * Simple localStorage-based auth for MVP
 * No Supabase auth needed for the initial version
 *
 * Note: For middleware route protection, we also set a cookie
 * that the Next.js middleware can read. Client-side code uses
 * localStorage; middleware uses cookies.
 */

export type UserRole = "teacher" | "student";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

const USER_KEY = "neet-qgen-user";
const COOKIE_NAME = "neet-qgen-auth";

// ── Cookie helpers (for middleware compatibility) ─────────────

function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// ── User storage ──────────────────────────────────────────────

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Also set cookie so middleware can read it
  setCookie(COOKIE_NAME, JSON.stringify({ role: user.role, name: user.name }));
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  deleteCookie(COOKIE_NAME);
}

export function isTeacher(): boolean {
  const user = getUser();
  return user?.role === "teacher";
}

export function isStudent(): boolean {
  const user = getUser();
  return user?.role === "student";
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createUser(name: string, role: UserRole): User {
  return {
    id: generateUserId(),
    name: name.trim(),
    role,
    createdAt: new Date().toISOString(),
  };
}

export function getRoleDisplayName(role: UserRole): string {
  return role === "teacher" ? "Teacher" : "Student";
}

export function getRoleBadgeColor(role: UserRole): string {
  return role === "teacher"
    ? "bg-teal-100 text-teal-800 border-teal-200"
    : "bg-emerald-100 text-emerald-800 border-emerald-200";
}
