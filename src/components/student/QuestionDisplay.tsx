"use client";

import { NEETQuestion } from "@/types/student";

interface QuestionDisplayProps {
  question: NEETQuestion;
  selectedOption: number | null;
  onSelect: (optionIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionDisplay({
  question,
  selectedOption,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionDisplayProps) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col gap-6">
      {/* Question Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-600 text-white text-sm font-semibold">
            {questionNumber}
          </span>
          <span className="text-sm text-slate-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              question.difficulty === "easy"
                ? "bg-emerald-50 text-emerald-700"
                : question.difficulty === "medium"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-red-50 text-red-700"
            }`}
          >
            {question.difficulty.charAt(0).toUpperCase() +
              question.difficulty.slice(1)}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
            {question.chapter}
          </span>
        </div>
      </div>

      {/* Question Stem */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
        <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-medium">
          {question.stem}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`group flex items-start gap-4 text-left w-full p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-teal-500 bg-teal-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
              aria-pressed={isSelected}
            >
              <span
                className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                }`}
              >
                {labels[index]}
              </span>
              <span
                className={`text-sm sm:text-base leading-relaxed pt-1 ${
                  isSelected ? "text-teal-900" : "text-slate-700"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
