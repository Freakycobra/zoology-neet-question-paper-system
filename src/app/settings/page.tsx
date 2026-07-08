'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Bell, Shield, User } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser } from '@/lib/auth'

export default function SettingsPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login') }
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <User size={18} className="text-teal-600" />
              <h2 className="font-semibold text-slate-900">Profile</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Name</label>
                <input type="text" defaultValue="Teacher" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Institution</label>
                <input type="text" placeholder="Your coaching center name" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={18} className="text-teal-600" />
              <h2 className="font-semibold text-slate-900">Notifications</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Email notifications for new papers</span>
                <input type="checkbox" defaultChecked className="rounded text-teal-600" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Weekly summary report</span>
                <input type="checkbox" className="rounded text-teal-600" />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={18} className="text-teal-600" />
              <h2 className="font-semibold text-slate-900">Preferences</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Default difficulty: Easy 20% / Medium 50% / Hard 30%</span>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Default question count: 25</span>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
