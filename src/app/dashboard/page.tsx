"use client";

import Link from "next/link";
import { Sidebar } from "@/components/shared/Sidebar";
import {
  FileText,
  Database,
  TrendingUp,
  CheckCircle2,
  Plus,
  ClipboardCheck,
  Download,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock data for dashboard ---
const stats = [
  {
    label: "Total Papers Generated",
    value: 48,
    change: "+12%",
    icon: FileText,
    color: "bg-teal-50 text-teal-700",
    iconBg: "bg-teal-100",
  },
  {
    label: "Questions in Bank",
    value: 1246,
    change: "+86 this week",
    icon: Database,
    color: "bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Papers This Week",
    value: 7,
    change: "On track",
    icon: TrendingUp,
    color: "bg-sky-50 text-sky-700",
    iconBg: "bg-sky-100",
  },
  {
    label: "Approval Rate",
    value: "92%",
    change: "+3%",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-700",
    iconBg: "bg-green-100",
  },
];

const recentPapers = [
  {
    id: "paper-1",
    title: "11th - Animal Kingdom & Biomolecules",
    date: "Jan 18, 2026",
    questions: 25,
    status: "approved",
  },
  {
    id: "paper-2",
    title: "12th - Human Reproduction & Evolution",
    date: "Jan 17, 2026",
    questions: 25,
    status: "review",
  },
  {
    id: "paper-3",
    title: "11th - Body Fluids & Excretion",
    date: "Jan 15, 2026",
    questions: 25,
    status: "approved",
  },
  {
    id: "paper-4",
    title: "12th - Biotechnology Principles",
    date: "Jan 14, 2026",
    questions: 25,
    status: "generating",
  },
  {
    id: "paper-5",
    title: "11th - Neural Control",
    date: "Jan 12, 2026",
    questions: 25,
    status: "approved",
  },
];

const statusBadge = {
  approved: {
    label: "Approved",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  review: {
    label: "In Review",
    class: "bg-amber-50 text-amber-700 border-amber-200",
  },
  generating: {
    label: "Generating",
    class: "bg-sky-50 text-sky-700 border-sky-200",
  },
  draft: {
    label: "Draft",
    class: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

// Simple bar chart data
const weeklyData = [
  { day: "Mon", count: 2 },
  { day: "Tue", count: 4 },
  { day: "Wed", count: 1 },
  { day: "Thu", count: 3 },
  { day: "Fri", count: 5 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 0 },
];
const maxCount = Math.max(...weeklyData.map((d) => d.count));

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Welcome back! Here&apos;s what&apos;s happening with your papers.
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Generate New Paper
            </Link>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      stat.iconBg
                    )}
                  >
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
                <p className={cn("text-xs font-medium mt-3", stat.color)}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Papers Table */}
            <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">
                  Recent Papers
                </h2>
                <Link
                  href="/student-papers"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-5 py-3 text-left font-medium text-slate-500">
                        Paper
                      </th>
                      <th className="px-5 py-3 text-left font-medium text-slate-500">
                        Date
                      </th>
                      <th className="px-5 py-3 text-left font-medium text-slate-500">
                        Questions
                      </th>
                      <th className="px-5 py-3 text-left font-medium text-slate-500">
                        Status
                      </th>
                      <th className="px-5 py-3 text-right font-medium text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentPapers.map((paper) => {
                      const status = statusBadge[paper.status as keyof typeof statusBadge];
                      return (
                        <tr
                          key={paper.id}
                          className="hover:bg-slate-50/60 transition-colors"
                        >
                          <td className="px-5 py-3.5 font-medium text-slate-800">
                            {paper.title}
                          </td>
                          <td className="px-5 py-3.5 text-slate-500">
                            {paper.date}
                          </td>
                          <td className="px-5 py-3.5 text-slate-600">
                            {paper.questions}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                                status.class
                              )}
                            >
                              {paper.status === "generating" && (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              )}
                              {status.label}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            {paper.status === "review" ? (
                              <Link
                                href={`/review/${paper.id}`}
                                className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 hover:bg-teal-100 transition-colors"
                              >
                                <ClipboardCheck className="h-3.5 w-3.5" />
                                Review
                              </Link>
                            ) : paper.status === "generating" ? (
                              <span className="text-xs text-slate-400">
                                Please wait...
                              </span>
                            ) : (
                              <button className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                                <Download className="h-3.5 w-3.5" />
                                Export
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right column: Activity + Quick Actions */}
            <div className="space-y-6">
              {/* Weekly Activity Chart */}
              <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">
                  This Week&apos;s Activity
                </h2>
                <div className="flex items-end gap-2 h-32">
                  {weeklyData.map((d) => (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center gap-1.5"
                    >
                      <div className="w-full flex justify-center">
                        <div
                          className={cn(
                            "w-6 sm:w-8 rounded-t-md transition-all duration-500",
                            d.count > 0 ? "bg-teal-500" : "bg-slate-100"
                          )}
                          style={{
                            height: `${(d.count / maxCount) * 80 || 4}px`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 uppercase">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Total this week</span>
                  <span className="font-bold text-slate-800">
                    {weeklyData.reduce((a, b) => a + b.count, 0)} papers
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-3">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Link
                    href="/generate"
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-teal-300 hover:bg-teal-50/40 transition-all-smooth"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-50">
                      <Plus className="h-4 w-4 text-teal-600" />
                    </div>
                    Generate New Paper
                  </Link>
                  <Link
                    href="/review/paper-2"
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-amber-300 hover:bg-amber-50/40 transition-all-smooth"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-50">
                      <ClipboardCheck className="h-4 w-4 text-amber-600" />
                    </div>
                    Review Pending Paper
                  </Link>
                  <Link
                    href="/student-papers"
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all-smooth"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50">
                      <Download className="h-4 w-4 text-emerald-600" />
                    </div>
                    Export Papers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
