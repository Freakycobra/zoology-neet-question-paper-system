"use client";

import { Sparkles, Info } from "lucide-react";

export default function GeneratePaperPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Generate Question Paper</h2>
        <p className="mt-1 text-sm text-slate-500">
          Configure your paper settings and let AI generate NEET-standard questions.
        </p>
      </div>

      {/* Coming soon placeholder */}
      <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-4">
          <Sparkles size={28} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Paper Generation</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          The paper generation form will be implemented in the next phase. This will include topic selection, difficulty distribution, and export options.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-700">
          <Info size={14} />
          Under development - coming in the next iteration
        </div>
      </div>
    </div>
  );
}
