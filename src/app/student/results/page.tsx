"use client";

import { BarChart3, TrendingUp, Target } from "lucide-react";
import { mockChapterPerformance } from "@/lib/mock-data";

export default function StudentResultsPage() {
  const totalQuestions = mockChapterPerformance.reduce(
    (sum, c) => sum + c.totalQuestions,
    0
  );
  const totalCorrect = mockChapterPerformance.reduce(
    (sum, c) => sum + c.correctAnswers,
    0
  );
  const overallAccuracy = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Results</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track your performance across chapters.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-2">
            <Target size={16} />
          </div>
          <p className="text-xl font-bold text-slate-900">{overallAccuracy}%</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">
            Accuracy
          </p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mb-2">
            <BarChart3 size={16} />
          </div>
          <p className="text-xl font-bold text-slate-900">
            {totalQuestions}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">
            Attempted
          </p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-2">
            <TrendingUp size={16} />
          </div>
          <p className="text-xl font-bold text-slate-900">
            {mockChapterPerformance.length}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">
            Chapters
          </p>
        </div>
      </div>

      {/* Chapter breakdown */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">
            Chapter-wise Performance
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {mockChapterPerformance.map((chapter) => (
            <div key={chapter.chapter} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-900">
                  {chapter.chapter}
                </p>
                <span
                  className={`text-xs font-semibold ${
                    chapter.accuracy >= 80
                      ? "text-emerald-600"
                      : chapter.accuracy >= 60
                        ? "text-amber-600"
                        : "text-red-600"
                  }`}
                >
                  {chapter.accuracy}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    chapter.accuracy >= 80
                      ? "bg-emerald-500"
                      : chapter.accuracy >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${chapter.accuracy}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">
                {chapter.correctAnswers}/{chapter.totalQuestions} correct
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
