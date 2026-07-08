'use client'

import { User } from '@/types'

const AUTH_KEY = 'neet-qgen-user'
const AUTH_COOKIE = 'neet-qgen-auth'

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    if (!stored) return null
    return JSON.parse(stored) as User
  } catch {
    return null
  }
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  // Sync to cookie for middleware
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`
}

export function clearUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_KEY)
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`
}

export function isTeacher(): boolean {
  const user = getUser()
  return user?.role === 'teacher'
}

export function isStudent(): boolean {
  const user = getUser()
  return user?.role === 'student'
}

export function createUser(name: string, role: 'teacher' | 'student'): User {
  return {
    id: crypto.randomUUID(),
    name,
    role,
    createdAt: new Date().toISOString(),
  }
}
