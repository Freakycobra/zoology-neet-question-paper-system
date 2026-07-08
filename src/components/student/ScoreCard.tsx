"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, MinusCircle, Award, Clock } from "lucide-react";

interface ScoreCardProps {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  timeTaken: number;
}

export default function ScoreCard({
  correct,
  incorrect,
  unanswered,
  total,
  timeTaken,
}: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const neetScore = correct * 4 - incorrect * 1;
  const maxNeetScore = total * 4;
  const percentage = Math.round((neetScore / maxNeetScore) * 100);
  const isHighScore = percentage >= 80;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = neetScore / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= neetScore) {
        setAnimatedScore(neetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [neetScore]);

  const getGrade = (pct: number) => {
    if (pct >= 90) return { grade: "A+", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (pct >= 80) return { grade: "A", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (pct >= 70) return { grade: "B+", color: "text-teal-600", bg: "bg-teal-50" };
    if (pct >= 60) return { grade: "B", color: "text-teal-600", bg: "bg-teal-50" };
    if (pct >= 50) return { grade: "C", color: "text-amber-600", bg: "bg-amber-50" };
    return { grade: "D", color: "text-red-600", bg: "bg-red-50" };
  };

  const gradeInfo = getGrade(percentage);

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
      {/* Confetti background for high scores */}
      {isHighScore && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [
                  "#0d9488",
                  "#10b981",
                  "#f59e0b",
                  "#f97316",
                  "#ef4444",
                  "#06b6d4",
                ][i % 6],
                animation: `confetti-fall ${2 + Math.random() * 3}s ease-in infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Test Results
          </h2>
          <p className="text-sm text-slate-500">NEET Score Calculation</p>
        </div>

        {/* Score Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={isHighScore ? "#10b981" : percentage >= 60 ? "#0d9488" : "#f59e0b"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 314} 314`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">
                {animatedScore}
              </span>
              <span className="text-xs text-slate-500">/ {maxNeetScore}</span>
            </div>
          </div>
        </div>

        {/* Grade Badge */}
        <div className="flex justify-center mb-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${gradeInfo.bg}`}
          >
            <Award className={`w-5 h-5 ${gradeInfo.color}`} />
            <span className={`text-lg font-bold ${gradeInfo.color}`}>
              Grade {gradeInfo.grade}
            </span>
            <span className="text-sm text-slate-500">({percentage}%)</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-emerald-700">{correct}</p>
              <p className="text-xs text-emerald-600">Correct</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-red-600">{incorrect}</p>
              <p className="text-xs text-red-500">Wrong (-{incorrect})</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <MinusCircle className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-slate-600">{unanswered}</p>
              <p className="text-xs text-slate-500">Skipped</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 border border-teal-100">
            <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-teal-700">
                {formatTime(timeTaken)}
              </p>
              <p className="text-xs text-teal-600">Time Taken</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
