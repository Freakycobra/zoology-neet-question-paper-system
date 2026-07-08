"use client";

import { History, Info } from "lucide-react";

export default function ExportHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Export History</h2>
        <p className="mt-1 text-sm text-slate-500">
          View and re-download previously generated papers.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
          <History size={28} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Export History</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          All your previously generated papers with download links will appear here.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-700">
          <Info size={14} />
          Under development - coming in the next iteration
        </div>
      </div>
    </div>
  );
}
