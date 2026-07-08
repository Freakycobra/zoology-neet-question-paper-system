'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, GraduationCap, UserCheck } from 'lucide-react'
import { createUser, setUser } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState<'teacher' | 'student'>('teacher')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!name.trim()) return
    setLoading(true)
    const user = createUser(name.trim(), role)
    setUser(user)
    setTimeout(() => {
      router.push(role === 'teacher' ? '/dashboard' : '/student')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-teal-600 text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900">NEET Zoology <span className="text-teal-600">QGen</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Welcome</h1>
            <p className="text-slate-500 mt-1">Enter your name to get started</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRole('teacher')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    role === 'teacher'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <UserCheck size={24} />
                  <span className="text-sm font-medium">Teacher</span>
                </button>
                <button
                  onClick={() => setRole('student')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    role === 'student'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap size={24} />
                  <span className="text-sm font-medium">Student</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!name.trim() || loading}
              className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '...' : 'Continue'}
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-slate-500">
            <Link href="/" className="text-teal-600 hover:underline">Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
