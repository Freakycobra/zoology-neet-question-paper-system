"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";
import { Check, ChevronDown, ChevronUp, Edit2, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onApprove: (id: string) => void;
  onReject: (id: string, reason?: string) => void;
  onEdit: (id: string, updated: Partial<Question>) => void;
  onRegenerate: (id: string, reason?: string) => void;
}

const difficultyStyles = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  hard: "bg-red-50 text-red-700 border-red-200",
};

export function QuestionCard({
  question,
  questionNumber,
  onApprove,
  onReject,
  onEdit,
  onRegenerate,
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDesignNote, setShowDesignNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [regenReason, setRegenReason] = useState("");
  const [editForm, setEditForm] = useState({
    stem: question.stem,
    options: [...question.options],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  });

  const handleSaveEdit = () => {
    onEdit(question.id, editForm);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-slate-50/80 border-b border-slate-100">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white text-xs font-bold">
          {questionNumber}
        </span>
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
            difficultyStyles[question.difficulty]
          )}
        >
          {question.difficulty}
        </span>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
          {question.chapter}
        </span>
        <span className="text-xs text-slate-400 ml-auto">
          {question.subtopic}
        </span>
      </div>

      {/* Question Body */}
      <div className="p-5 space-y-4">
        {/* Stem */}
        {isEditing ? (
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-y"
            rows={3}
            value={editForm.stem}
            onChange={(e) => setEditForm({ ...editForm, stem: e.target.value })}
          />
        ) : (
          <p className="text-base font-medium text-slate-900 leading-relaxed">
            {question.stem}
          </p>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {editForm.options.map((option, idx) => {
            const labels = ["A", "B", "C", "D"];
            const isCorrect =
              idx === (isEditing ? editForm.correctAnswer : question.correctAnswer);
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-2.5 rounded-lg border px-3.5 py-3 transition-all",
                  isCorrect
                    ? "border-teal-300 bg-teal-50/60"
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold mt-0.5",
                    isCorrect
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  {isCorrect ? <Check className="h-3.5 w-3.5" /> : labels[idx]}
                </span>
                {isEditing ? (
                  <input
                    className="flex-1 text-sm bg-transparent border-b border-slate-300 focus:border-teal-500 focus:outline-none px-0.5"
                    value={option}
                    onChange={(e) => {
                      const newOpts = [...editForm.options];
                      newOpts[idx] = e.target.value;
                      setEditForm({ ...editForm, options: newOpts });
                    }}
                  />
                ) : (
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      isCorrect
                        ? "text-teal-900 font-medium"
                        : "text-slate-700"
                    )}
                  >
                    {option}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Correct answer selector in edit mode */}
        {isEditing && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500">Correct answer:</span>
            <select
              className="rounded-md border border-slate-300 px-2 py-1 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={editForm.correctAnswer}
              onChange={(e) =>
                setEditForm({ ...editForm, correctAnswer: Number(e.target.value) })
              }
            >
              {editForm.options.map((_, idx) => (
                <option key={idx} value={idx}>
                  Option {["A", "B", "C", "D"][idx]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Explanation - Collapsible */}
        <div className="border border-slate-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span>Explanation</span>
            {showExplanation ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>
          {showExplanation && (
            <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100">
              {isEditing ? (
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-y"
                  rows={4}
                  value={editForm.explanation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, explanation: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {question.explanation}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Design Note - Collapsible */}
        <div className="border border-slate-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowDesignNote(!showDesignNote)}
            className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span>Design Note (teacher only)</span>
            {showDesignNote ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>
          {showDesignNote && (
            <div className="px-4 py-3 bg-amber-50/40 border-t border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed">
                {question.designNote || "No design note available."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50/60 border-t border-slate-100">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
            >
              <Check className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={() => {
                setEditForm({
                  stem: question.stem,
                  options: [...question.options],
                  correctAnswer: question.correctAnswer,
                  explanation: question.explanation,
                });
                setIsEditing(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Approve */}
            <button
              onClick={() => onApprove(question.id)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
              Approve
            </button>

            {/* Edit */}
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </button>

            {/* Regenerate */}
            <button
              onClick={() => {
                const reason = window.prompt("Reason for regeneration?");
                if (reason !== null) onRegenerate(question.id, reason || undefined);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Regenerate
            </button>

            {/* Reject */}
            <button
              onClick={() => {
                const reason = window.prompt("Reason for rejection?");
                if (reason !== null) onReject(question.id, reason || undefined);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <ThumbsDown className="h-4 w-4" />
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}
