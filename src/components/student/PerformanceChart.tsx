"use client";

import { ChapterPerformance } from "@/types/student";

interface PerformanceChartProps {
  chapterPerformance: ChapterPerformance[];
}

export default function PerformanceChart({
  chapterPerformance,
}: PerformanceChartProps) {
  const maxTotal = Math.max(...chapterPerformance.map((c) => c.total), 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-800 mb-5">
        Performance by Chapter
      </h3>

      <div className="flex flex-col gap-4">
        {chapterPerformance.map((item) => {
          const percentage =
            item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
          const barWidth = (item.total / maxTotal) * 100;
          const correctWidth =
            item.total > 0 ? (item.correct / item.total) * 100 : 0;

          return (
            <div key={item.chapter} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 truncate max-w-[60%]">
                  {item.chapter}
                </span>
                <span className="text-sm text-slate-500 flex-shrink-0">
                  <span className="font-semibold text-teal-700">
                    {item.correct}
                  </span>
                  <span className="text-slate-400"> / {item.total}</span>
                  <span className="ml-1.5 text-xs text-slate-400">
                    ({percentage}%)
                  </span>
                </span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-200 rounded-full relative"
                  style={{ width: `${barWidth}%` }}
                >
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${correctWidth}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DifficultyChart({
  difficultyPerformance,
}: {
  difficultyPerformance: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
}) {
  const difficulties = [
    {
      label: "Easy",
      key: "easy" as const,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      label: "Medium",
      key: "medium" as const,
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      label: "Hard",
      key: "hard" as const,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-800 mb-5">
        Performance by Difficulty
      </h3>

      <div className="flex flex-col gap-4">
        {difficulties.map((d) => {
          const data = difficultyPerformance[d.key];
          const percentage =
            data.total > 0
              ? Math.round((data.correct / data.total) * 100)
              : 0;

          return (
            <div key={d.key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  {d.label}
                </span>
                <span className="text-sm text-slate-500">
                  <span className={`font-semibold ${d.textColor}`}>
                    {data.correct}
                  </span>
                  <span className="text-slate-400"> / {data.total}</span>
                  <span
                    className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${d.bgColor} ${d.textColor}`}
                  >
                    {percentage}%
                  </span>
                </span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${d.color} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
