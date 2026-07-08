"use client";

import { FileText, Database, History, Sparkles } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "Generate Paper",
    description: "Create a new question paper",
    href: "/teacher/generate",
    icon: Sparkles,
    color: "bg-teal-50 text-teal-600 border-teal-200",
  },
  {
    title: "Question Bank",
    description: "Browse all questions",
    href: "/teacher/question-bank",
    icon: Database,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "Export History",
    description: "View past papers",
    href: "/teacher/export-history",
    icon: History,
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
];

const recentActivity = [
  { action: "Generated paper", topic: "Animal Kingdom", date: "Feb 14, 2026", questions: 30 },
  { action: "Generated paper", topic: "Human Reproduction", date: "Feb 12, 2026", questions: 45 },
  { action: "Added question", topic: "Chemical Coordination", date: "Feb 10, 2026", questions: 1 },
];

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome back! 👋
        </h2>
        <p className="mt-2 text-slate-500">
          Generate NEET-standard question papers for your Zoology classes. Select a quick action below to get started.
        </p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 hover:shadow-sm hover:border-teal-200 transition-all"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${action.color}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {action.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Papers Generated", value: "24", icon: FileText },
          { label: "Questions in Bank", value: "156", icon: Database },
          { label: "This Week", value: "3", icon: Sparkles },
          { label: "Avg. Accuracy", value: "94%", icon: History },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl bg-white border border-slate-200 p-4"
            >
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Icon size={14} />
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <FileText size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.action}
                  </p>
                  <p className="text-xs text-slate-500">{item.topic}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{item.date}</p>
                <p className="text-xs text-slate-500">{item.questions} Qs</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
