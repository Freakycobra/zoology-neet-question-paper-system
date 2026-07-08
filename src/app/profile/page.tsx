"use client";

import { User, Mail, Building2, GraduationCap } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-teal-600" />
        <div className="px-6 pb-6">
          <div className="relative -mt-12 mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-white shadow-md">
              <User className="h-12 w-12 text-teal-600" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Teacher</h1>
          <p className="text-sm text-slate-500">NEET Zoology Instructor</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm font-medium text-slate-800">teacher@coaching.in</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Building2 className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Institution</p>
                <p className="text-sm font-medium text-slate-800">NEET Coaching Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <GraduationCap className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Subjects</p>
                <p className="text-sm font-medium text-slate-800">Zoology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
