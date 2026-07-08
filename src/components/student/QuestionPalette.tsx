"use client";

import { QuestionStatus } from "@/types/student";

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, number | null>;
  questionStatus: Record<number, QuestionStatus>;
  onQuestionClick: (index: number) => void;
}

export default function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answers,
  questionStatus,
  onQuestionClick,
}: QuestionPaletteProps) {
  const getStatus = (index: number): QuestionStatus => {
    return questionStatus[index] || "not-visited";
  };

  const getButtonClasses = (index: number) => {
    const status = getStatus(index);
    const isCurrent = currentQuestion === index;

    if (isCurrent) {
      return "bg-sky-500 text-white border-sky-500 ring-2 ring-sky-200";
    }

    switch (status) {
      case "answered":
        return "bg-teal-600 text-white border-teal-600 hover:bg-teal-700";
      case "marked":
        return "bg-amber-500 text-white border-amber-500 hover:bg-amber-600";
      case "visited":
        return "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100";
      case "not-visited":
      default:
        return "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">
        Questions
      </h3>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionClick(i)}
            className={`relative w-full aspect-square flex items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-150 ${getButtonClasses(i)}`}
            title={`Question ${i + 1}${answers[i] !== null ? " - Answered" : ""}`}
          >
            {i + 1}
            {/* Marked indicator dot */}
            {questionStatus[i] === "marked" && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-purple-500 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
          Legend
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-white border border-slate-200" />
            <span className="text-xs text-slate-500">Not visited</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-amber-50 border border-amber-300" />
            <span className="text-xs text-slate-500">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-teal-600" />
            <span className="text-xs text-slate-500">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-sky-500" />
            <span className="text-xs text-slate-500">Current</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <span className="w-3.5 h-3.5 rounded bg-amber-500" />
            <span className="text-xs text-slate-500">Marked for review</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
        <span>
          Answered:{" "}
          {Object.values(answers).filter((a) => a !== null).length}
        </span>
        <span>of {totalQuestions}</span>
      </div>
    </div>
  );
}
