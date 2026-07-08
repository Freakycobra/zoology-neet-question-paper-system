"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { Download, FileText, FileArchive } from "lucide-react";

const exports = [
  { id: "e1", name: "Student Paper - Class 11", format: "docx", date: "Jan 18, 2026", size: "245 KB" },
  { id: "e2", name: "Teacher Key - Class 11", format: "docx", date: "Jan 18, 2026", size: "312 KB" },
  { id: "e3", name: "Complete Package - Class 12", format: "zip", date: "Jan 17, 2026", size: "1.2 MB" },
];

export default function ExportHistoryPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Export History
          </h1>

          <div className="rounded-xl bg-white border border-slate-200 shadow-sm divide-y divide-slate-100">
            {exports.map((exp) => (
              <div key={exp.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  {exp.format === "zip" ? (
                    <FileArchive className="h-5 w-5 text-slate-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{exp.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{exp.date} &middot; {exp.size}</p>
                </div>
                <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 hover:text-teal-600 hover:border-teal-300 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
