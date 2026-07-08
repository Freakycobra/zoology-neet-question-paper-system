"use client";

import { FileText, Clock, CheckCircle } from "lucide-react";

const availableTests = [
  {
    id: "t1",
    title: "Weekly Test - Animal Kingdom",
    questions: 30,
    duration: "45 min",
    status: "available",
    chapter: "Animal Kingdom",
  },
  {
    id: "t2",
    title: "Weekly Test - Human Physiology",
    questions: 45,
    duration: "60 min",
    status: "available",
    chapter: "Structural Organization in Animals",
  },
  {
    id: "t3",
    title: "Revision Test - Reproduction",
    questions: 25,
    duration: "40 min",
    status: "completed",
    chapter: "Human Reproduction",
  },
];

export default function StudentTestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Tests</h2>
        <p className="mt-1 text-sm text-slate-500">
          View and take your assigned tests.
        </p>
      </div>

      <div className="grid gap-4">
        {availableTests.map((test) => (
          <div
            key={test.id}
            className="rounded-xl bg-white border border-slate-200 p-5 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    test.status === "completed"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-teal-50 text-teal-600"
                  }`}
                >
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {test.chapter}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <FileText size={12} />
                      {test.questions} questions
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} />
                      {test.duration}
                    </span>
                  </div>
                </div>
              </div>

              {test.status === "completed" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                  <CheckCircle size={12} />
                  Completed
                </span>
              ) : (
                <button className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700 transition-colors shrink-0">
                  Start Test
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
