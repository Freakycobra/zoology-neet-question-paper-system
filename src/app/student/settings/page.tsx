"use client";

import { Settings, Info } from "lucide-react";

export default function StudentSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 mb-4">
          <Settings size={28} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Settings</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          Account settings and preferences will be implemented here.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-700">
          <Info size={14} />
          Under development - coming in the next iteration
        </div>
      </div>
    </div>
  );
}
