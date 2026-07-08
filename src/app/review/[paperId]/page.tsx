"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";
import { QuestionCard } from "@/components/teacher/QuestionCard";
import { ExportModal } from "@/components/teacher/ExportModal";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  CheckCheck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

// --- Mock data ---
const mockQuestions: Question[] = [
  {
    id: "q1",
    stem: "Which of the following phyla is characterized by the presence of choanocytes (collar cells) that help in filter feeding?",
    options: [
      "Coelenterata (Cnidaria)",
      "Porifera",
      "Platyhelminthes",
      "Aschelminthes",
    ],
    correctAnswer: 1,
    explanation: "Porifera (sponges) possess choanocytes or collar cells. These cells have a flagellum surrounded by a collar-like microvilli ring. The beating of flagella creates water currents, and food particles are trapped by the collar and ingested. This is a characteristic feature unique to the phylum Porifera.",
    chapter: "Animal Kingdom",
    subtopic: "Basis of Classification",
    difficulty: "easy",
    neetRelevance: 4,
    usageCount: 2,
    lastUsed: "2026-01-01",
    status: "draft",
    designNote: "Classic NEET pattern question. Tests fundamental knowledge of poriferan characteristics. Ensure distractors are plausible.",
    createdAt: "2026-01-18T10:00:00Z",
    classLevel: 11,
  },
  {
    id: "q2",
    stem: "In the classification of animals, which level of organization is exhibited by members of phylum Platyhelminthes?",
    options: [
      "Cellular level",
      "Tissue level",
      "Organ level",
      "Organ system level",
    ],
    correctAnswer: 2,
    explanation: "Platyhelminthes (flatworms) exhibit the organ level of body organization. They have well-defined organs such as eyespots, flame cells for excretion, and reproductive organs. However, they lack a complete digestive system (organ system level), as they have only a single opening (mouth) that serves as both ingestion and egestion point.",
    chapter: "Animal Kingdom",
    subtopic: "Basis of Classification",
    difficulty: "medium",
    neetRelevance: 3,
    usageCount: 1,
    lastUsed: null,
    status: "draft",
    designNote: "Tests understanding of levels of organization across animal phyla. Medium difficulty as it requires distinguishing organ vs organ-system level.",
    createdAt: "2026-01-18T10:01:00Z",
    classLevel: 11,
  },
  {
    id: "q3",
    stem: "The endoskeleton of echinoderms is composed of:",
    options: [
      "Chitin",
      "Calcium carbonate ossicles",
      "Cartilage",
      "Silica spicules",
    ],
    correctAnswer: 1,
    explanation: "Echinoderms (e.g., starfish, sea urchins) possess an endoskeleton made of calcareous ossicles (calcium carbonate plates). These ossicles are mesodermal in origin and may bear spines, giving the phylum its name (echino = spiny, derma = skin).",
    chapter: "Animal Kingdom",
    subtopic: "Annelida, Arthropoda, Mollusca, Echinodermata",
    difficulty: "medium",
    neetRelevance: 3,
    usageCount: 0,
    lastUsed: null,
    status: "draft",
    designNote: "NEET frequently asks about structural features of different phyla. Calcium carbonate ossicles is a key identifying feature of echinoderms.",
    createdAt: "2026-01-18T10:02:00Z",
    classLevel: 11,
  },
  {
    id: "q4",
    stem: "Which of the following correctly describes the symmetry and coelom condition in Aschelminthes?",
    options: [
      "Bilaterally symmetrical, pseudocoelomate",
      "Radially symmetrical, acoelomate",
      "Bilaterally symmetrical, coelomate",
      "Asymmetrical, pseudocoelomate",
    ],
    correctAnswer: 0,
    explanation: "Aschelminthes (roundworms) are bilaterally symmetrical and pseudocoelomate. The pseudocoelom is a fluid-filled body cavity that is not completely lined by mesoderm. This is a distinguishing feature from true coelomates where the body cavity is entirely lined by mesoderm.",
    chapter: "Animal Kingdom",
    subtopic: "Classification of Animals",
    difficulty: "hard",
    neetRelevance: 3,
    usageCount: 3,
    lastUsed: "2025-12-15",
    status: "draft",
    designNote: "Hard question combining two classification criteria. Students often confuse pseudocoelomate vs coelomate. Good for testing deep understanding.",
    createdAt: "2026-01-18T10:03:00Z",
    classLevel: 11,
  },
  {
    id: "q5",
    stem: "The protein structure where the polypeptide chain coils around a central axis to form a helical structure is known as:",
    options: [
      "Quaternary structure",
      "Beta-pleated sheet",
      "Alpha-helix",
      "Random coil",
    ],
    correctAnswer: 2,
    explanation: "The alpha-helix is a secondary protein structure where the polypeptide chain coils clockwise around a central axis to form a right-handed helix. This structure is stabilized by hydrogen bonds between the carbonyl oxygen of one amino acid and the amide hydrogen of another amino acid four residues away.",
    chapter: "Biomolecules",
    subtopic: "Structure of proteins",
    difficulty: "easy",
    neetRelevance: 4,
    usageCount: 5,
    lastUsed: "2026-01-10",
    status: "draft",
    designNote: "Core NEET concept. Very high relevance. Keep as easy difficulty — this is a definition-based question that all students should know.",
    createdAt: "2026-01-18T10:04:00Z",
    classLevel: 11,
  },
];

const statusConfig = {
  draft: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200" },
  approved: { label: "Approved", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", color: "bg-red-50 text-red-700 border-red-200" },
};

export default function ReviewPage() {
  const params = useParams();
  const paperId = params.paperId as string;

  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showExport, setShowExport] = useState(false);
  const [exporting, setExporting] = useState(false);

  const activeQuestion = questions[activeIndex];

  const approvedCount = questions.filter((q) => q.status === "approved").length;
  const totalCount = questions.length;
  const allReviewed = questions.every((q) => q.status !== "draft");

  const handleApprove = useCallback((id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "approved" as const } : q))
    );
  }, []);

  const handleReject = useCallback((id: string, _reason?: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "rejected" as const } : q))
    );
  }, []);

  const handleEdit = useCallback((id: string, updated: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updated } : q))
    );
  }, []);

  const handleRegenerate = useCallback((id: string, _reason?: string) => {
    // Simulate regeneration by just updating the question slightly
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, status: "draft" as const, stem: q.stem + " [regenerated]" }
          : q
      )
    );
  }, []);

  const handleApproveAll = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.status === "draft" ? { ...q, status: "approved" as const } : q))
    );
  };

  const handleExport = async (_format: string) => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setExporting(false);
    setShowExport(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Top Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/dashboard"
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-slate-900 truncate">
                  Review Paper
                </h1>
                <p className="text-xs text-slate-500">{paperId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Progress */}
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
                <span className="text-xs font-medium text-slate-600">
                  {approvedCount}/{totalCount} reviewed
                </span>
                <div className="h-2 w-20 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all duration-500"
                    style={{ width: `${(approvedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bulk Actions */}
              <button
                onClick={handleApproveAll}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Approve All
              </button>

              <button
                onClick={() => setShowExport(true)}
                disabled={!allReviewed}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                  allReviewed
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                {exporting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Download className="h-3.5 w-3.5" />
                )}
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Question List */}
          <div className="lg:col-span-3 space-y-2">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Questions ({totalCount})
            </h2>
            <div className="space-y-1.5 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isActive = idx === activeIndex;
                const status = statusConfig[q.status as keyof typeof statusConfig];
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-all-smooth",
                      isActive
                        ? "bg-white border border-teal-300 shadow-sm"
                        : "bg-white/50 border border-transparent hover:bg-white hover:border-slate-200"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                        isActive ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-xs leading-snug line-clamp-2",
                          isActive ? "text-slate-900 font-medium" : "text-slate-600"
                        )}
                      >
                        {q.stem}
                      </p>
                      <span
                        className={cn(
                          "inline-flex items-center mt-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                          status.color
                        )}
                      >
                        {status.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Question Detail */}
          <div className="lg:col-span-9 space-y-4">
            {activeQuestion && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      Question {activeIndex + 1} of {totalCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                      disabled={activeIndex === 0}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveIndex(Math.min(totalCount - 1, activeIndex + 1))
                      }
                      disabled={activeIndex === totalCount - 1}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <QuestionCard
                  question={activeQuestion}
                  questionNumber={activeIndex + 1}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEdit={handleEdit}
                  onRegenerate={handleRegenerate}
                />

                {/* Navigation footer */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  {allReviewed && (
                    <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium bg-emerald-50 px-4 py-2 rounded-lg">
                      <CheckCircle2 className="h-4 w-4" />
                      All questions reviewed!
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setActiveIndex(Math.min(totalCount - 1, activeIndex + 1))
                    }
                    disabled={activeIndex === totalCount - 1}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExport && (
        <ExportModal
          paperId={paperId}
          onExport={handleExport}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
