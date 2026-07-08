"use client";

import { getUser } from "@/lib/auth";
import { UserCircle, GraduationCap, Calendar } from "lucide-react";

export default function TeacherProfilePage() {
  const user = getUser();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Profile</h2>
        <p className="mt-1 text-sm text-slate-500">Your account information.</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || "T"}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {user?.name || "Teacher"}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700 border border-teal-200">
              <GraduationCap size={12} />
              Teacher
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <UserCircle size={16} className="text-slate-400" />
            <span className="text-slate-500">Name:</span>
            <span className="text-slate-900 font-medium">{user?.name || "Not set"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <GraduationCap size={16} className="text-slate-400" />
            <span className="text-slate-500">Role:</span>
            <span className="text-slate-900 font-medium capitalize">{user?.role || "teacher"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-slate-500">Joined:</span>
            <span className="text-slate-900 font-medium">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
