"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { FileText, Search } from "lucide-react";

export default function StudentPapersPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Student Papers
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                View and export all generated question papers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 p-3 shadow-sm mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers by title, date, or class..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mx-auto mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              Student Papers
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              All your generated papers will appear here for viewing, printing, and exporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
