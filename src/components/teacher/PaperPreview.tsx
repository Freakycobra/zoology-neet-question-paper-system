"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PaperBlueprint } from "@/types";
import { Eye, EyeOff } from "lucide-react";

interface PaperPreviewProps {
  paper: PaperBlueprint;
}

export function PaperPreview({ paper }: PaperPreviewProps) {
  const [viewMode, setViewMode] = useState<"student" | "teacher">("teacher");

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Paper Preview</h3>
        <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
          <button
            onClick={() => setViewMode("student")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              viewMode === "student"
                ? "bg-teal-50 text-teal-700"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {viewMode === "student" ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            Student View
          </button>
          <button
            onClick={() => setViewMode("teacher")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              viewMode === "teacher"
                ? "bg-teal-50 text-teal-700"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {viewMode === "teacher" ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            Teacher View
          </button>
        </div>
      </div>

      {/* Paper info */}
      <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span>
          <span className="font-medium text-slate-800">Class:</span> {paper.classLevel}th
        </span>
        <span>
          <span className="font-medium text-slate-800">Questions:</span>{" "}
          {paper.generatedQuestions?.length || paper.numQuestions}
        </span>
        <span>
          <span className="font-medium text-slate-800">Difficulty:</span>{" "}
          {paper.difficultySplit.easy}% / {paper.difficultySplit.medium}% / {paper.difficultySplit.hard}%
        </span>
        <span>
          <span className="font-medium text-slate-800">Explanations:</span>{" "}
          {paper.includeExplanations}
        </span>
      </div>

      {/* Questions */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {(paper.generatedQuestions || []).map((q, idx) => {
          const labels = ["A", "B", "C", "D"];
          return (
            <div
              key={q.id}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 print:border-black"
            >
              {/* Question stem */}
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700">
                  {idx + 1}
                </span>
                <p className="text-sm font-medium text-slate-900 leading-relaxed">
                  {q.stem}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-9">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = oIdx === q.correctAnswer;
                  const showAnswer = viewMode === "teacher";
                  return (
                    <div
                      key={oIdx}
                      className={cn(
                        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
                        showAnswer && isCorrect
                          ? "border-teal-300 bg-teal-50 text-teal-900"
                          : "border-slate-200 text-slate-700"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-xs font-bold",
                          showAnswer && isCorrect
                            ? "bg-teal-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {labels[oIdx]}
                      </span>
                      <span>{opt}</span>
                      {showAnswer && isCorrect && (
                        <span className="ml-auto text-xs font-medium text-teal-700">
                          Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Teacher-only: Explanation and metadata */}
              {viewMode === "teacher" && (
                <div className="ml-9 space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                      {q.chapter}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                      {q.subtopic}
                    </span>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 font-medium",
                        q.difficulty === "easy" && "bg-emerald-50 text-emerald-700",
                        q.difficulty === "medium" && "bg-amber-50 text-amber-700",
                        q.difficulty === "hard" && "bg-red-50 text-red-700"
                      )}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  {paper.includeExplanations !== "none" && (
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-md p-2.5">
                      <span className="font-medium text-slate-700">Explanation:</span>{" "}
                      {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {(!paper.generatedQuestions || paper.generatedQuestions.length === 0) && (
          <p className="text-sm text-slate-400 text-center py-8">
            No questions generated yet.
          </p>
        )}
      </div>
    </div>
  );
}
