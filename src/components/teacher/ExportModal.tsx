"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, KeyRound, BookOpen, FileArchive, Download, X, Loader2 } from "lucide-react";

interface ExportModalProps {
  paperId: string;
  onExport: (format: string) => Promise<void>;
  onClose: () => void;
}

type ExportOption = {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
};

const exportOptions: ExportOption[] = [
  {
    id: "student-paper",
    label: "Student Paper",
    description: "Questions only — no answers",
    icon: FileText,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200 hover:border-teal-400",
  },
  {
    id: "teacher-key",
    label: "Teacher Answer Key",
    description: "Questions with correct answers",
    icon: KeyRound,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200 hover:border-emerald-400",
  },
  {
    id: "explanation-sheet",
    label: "Explanation Sheet",
    description: "Full explanations for all questions",
    icon: BookOpen,
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200 hover:border-sky-400",
  },
  {
    id: "all-zip",
    label: "Complete Package",
    description: "All three files as ZIP",
    icon: FileArchive,
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-300 hover:border-slate-400",
  },
];

export function ExportModal({ paperId, onExport, onClose }: ExportModalProps) {
  const [selected, setSelected] = useState<string>("student-paper");
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await onExport(selected);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Export Paper
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Choose your export format
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Options */}
        <div className="px-6 py-4 space-y-2.5">
          {exportOptions.map((option) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all-smooth",
                  isSelected
                    ? cn(option.borderColor, option.bgColor, "ring-1 ring-teal-500/20")
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isSelected ? option.bgColor : "bg-slate-100"
                  )}
                >
                  <option.icon
                    className={cn(
                      "h-5 w-5",
                      isSelected ? option.color : "text-slate-400"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isSelected ? "text-slate-900" : "text-slate-700"
                    )}
                  >
                    {option.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {option.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={exporting || !selected}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors",
              exporting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            )}
          >
            {exporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
