"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { Settings, User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Settings
          </h1>

          <div className="space-y-4">
            {/* Profile Section */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                  <User className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Profile</h2>
                  <p className="text-xs text-slate-500">Manage your account details</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue="Teacher"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="teacher@coaching.in"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Bell className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
                  <p className="text-xs text-slate-500">Configure notification preferences</p>
                </div>
              </div>
              <div className="space-y-3">
                {["Paper generation complete", "New questions added", "Weekly summary"].map((label) => (
                  <label key={label} className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-700">{label}</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-teal-600 accent-teal-600" />
                  </label>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <Shield className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Security</h2>
                  <p className="text-xs text-slate-500">Password and security settings</p>
                </div>
              </div>
              <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
