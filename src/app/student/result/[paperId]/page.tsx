"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScoreCard from "@/components/student/ScoreCard";
import PerformanceChart, {
  DifficultyChart,
} from "@/components/student/PerformanceChart";
import { mockCompletedResults, mockQuestions } from "@/lib/student/mock-data";

export default function TestResultPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId as string;

  // Try to get from mock data or localStorage
  const mockResult = mockCompletedResults.find((r) => r.paperId === paperId);
  const savedResults = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("test-results") || "[]"
      : "[]"
  );
  const savedResult = savedResults.find((r: { paperId: string }) => r.paperId === paperId);
  const result = savedResult || mockResult;

  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<number, boolean>
  >({});

  const toggleExplanation = (idx: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-700">
            Result Not Found
          </h2>
          <p className="text-slate-500 mb-4">
            The test result you are looking for does not exist.
          </p>
          <Button
            onClick={() => router.push("/student")}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const questions = mockQuestions.slice(0, result.totalQuestions);

  // Build user answers map from result data
  // For mock results, we simulate the answers
  const simulatedAnswers: Record<number, number | null> = {};
  if (mockResult) {
    // Distribute correct and incorrect answers
    let correctLeft = mockResult.correct;
    let incorrectLeft = mockResult.incorrect;
    let unansweredLeft = mockResult.unanswered;
    for (let i = 0; i < mockResult.totalQuestions; i++) {
      if (correctLeft > 0) {
        simulatedAnswers[i] = questions[i]?.correctAnswer ?? 0;
        correctLeft--;
      } else if (incorrectLeft > 0) {
        simulatedAnswers[i] =
          ((questions[i]?.correctAnswer ?? 0) + 1) % 4;
        incorrectLeft--;
      } else if (unansweredLeft > 0) {
        simulatedAnswers[i] = null;
        unansweredLeft--;
      }
    }
  } else if (savedResult && savedResult.answers) {
    Object.assign(simulatedAnswers, savedResult.answers);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/student")}
            className="w-9 h-9"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h1 className="text-base font-semibold text-slate-800 truncate">
              {result.paperTitle}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Score Card */}
        <div className="mb-6">
          <ScoreCard
            correct={result.correct}
            incorrect={result.incorrect}
            unanswered={result.unanswered}
            total={result.totalQuestions}
            timeTaken={result.timeTaken}
          />
        </div>

        {/* Performance Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <PerformanceChart
            chapterPerformance={
              result.chapterPerformance || [
                { chapter: "General", correct: result.correct, total: result.totalQuestions },
              ]
            }
          />
          <DifficultyChart
            difficultyPerformance={
              result.difficultyPerformance || {
                easy: { correct: result.correct, total: result.totalQuestions },
                medium: { correct: 0, total: 0 },
                hard: { correct: 0, total: 0 },
              }
            }
          />
        </div>

        {/* Question-wise Review */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-5">
            Question Review
          </h3>

          <div className="flex flex-col gap-4">
            {questions.map((q, idx) => {
              const userAnswer = simulatedAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              const isWrong =
                userAnswer !== null &&
                userAnswer !== undefined &&
                userAnswer !== q.correctAnswer;
              const isUnanswered =
                userAnswer === null || userAnswer === undefined;
              const labels = ["A", "B", "C", "D"];
              const isExpanded = expandedQuestions[idx];

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border-2 overflow-hidden transition-all ${
                    isCorrect
                      ? "border-emerald-200 bg-emerald-50/30"
                      : isWrong
                        ? "border-red-200 bg-red-50/30"
                        : "border-slate-200"
                  }`}
                >
                  {/* Question Header */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : isWrong ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <MinusCircle className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <span className="text-xs font-semibold text-slate-500">
                            Q{idx + 1}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              q.difficulty === "easy"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : q.difficulty === "medium"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {q.difficulty}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {q.chapter}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-800 mb-3">
                          {q.stem}
                        </p>

                        {/* Options Summary */}
                        <div className="flex flex-wrap gap-3 mb-3">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = userAnswer === optIdx;
                            const isCorrectOption = q.correctAnswer === optIdx;

                            let optionClasses =
                              "px-3 py-1.5 rounded-lg text-sm border ";
                            if (isCorrectOption) {
                              optionClasses +=
                                "bg-emerald-100 border-emerald-300 text-emerald-800 font-medium";
                            } else if (isSelected && !isCorrectOption) {
                              optionClasses +=
                                "bg-red-100 border-red-300 text-red-800 line-through";
                            } else {
                              optionClasses +=
                                "bg-white border-slate-200 text-slate-600";
                            }

                            return (
                              <span key={optIdx} className={optionClasses}>
                                {labels[optIdx]}) {opt.slice(0, 40)}
                                {opt.length > 40 ? "..." : ""}
                                {isCorrectOption && (
                                  <CheckCircle className="inline w-3.5 h-3.5 ml-1 text-emerald-600" />
                                )}
                              </span>
                            );
                          })}
                        </div>

                        {/* Your Answer Summary */}
                        <div className="flex items-center gap-3 text-xs">
                          <span
                            className={`font-medium ${
                              isCorrect
                                ? "text-emerald-600"
                                : isWrong
                                  ? "text-red-600"
                                  : "text-slate-500"
                            }`}
                          >
                            Your answer:{" "}
                            {isUnanswered
                              ? "Not answered"
                              : labels[userAnswer]}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="text-emerald-600 font-medium">
                            Correct:{" "}
                            {labels[q.correctAnswer]}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span
                            className={`font-semibold ${
                              isCorrect
                                ? "text-emerald-600"
                                : isWrong
                                  ? "text-red-600"
                                  : "text-slate-500"
                            }`}
                          >
                            {isCorrect ? "+4" : isWrong ? "-1" : "0"}
                          </span>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExplanation(idx)}
                        className="flex-shrink-0 w-8 h-8 text-slate-400 hover:text-slate-600"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Explanation (Expandable) */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                      <div className="ml-8 rounded-xl bg-teal-50 border border-teal-100 p-4">
                        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
                          Explanation
                        </p>
                        <p className="text-sm text-teal-900 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => router.push("/student")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
