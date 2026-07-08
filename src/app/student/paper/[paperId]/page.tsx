"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Send,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TestTimer from "@/components/student/TestTimer";
import QuestionDisplay from "@/components/student/QuestionDisplay";
import QuestionPalette from "@/components/student/QuestionPalette";
import { mockPapers } from "@/lib/student/mock-data";
import { QuestionStatus, NEETQuestion } from "@/types/student";

export default function TakeTestPage() {
  const router = useRouter();
  const params = useParams();
  const paperId = params.paperId as string;

  const paper = mockPapers.find((p) => p.id === paperId) || mockPapers[0];
  const questions: NEETQuestion[] = paper.questions;
  const totalQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [questionStatus, setQuestionStatus] = useState<
    Record<number, QuestionStatus>
  >({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedKey = `test-state-${paperId}`;
    const saved = localStorage.getItem(savedKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.questionStatus) setQuestionStatus(parsed.questionStatus);
        if (parsed.currentQuestion !== undefined)
          setCurrentQuestion(parsed.currentQuestion);
      } catch {
        // ignore parse errors
      }
    }
  }, [paperId]);

  // Auto-save to localStorage
  useEffect(() => {
    if (isSubmitted) return;
    const savedKey = `test-state-${paperId}`;
    const state = { answers, questionStatus, currentQuestion };
    localStorage.setItem(savedKey, JSON.stringify(state));
  }, [answers, questionStatus, currentQuestion, paperId, isSubmitted]);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (isSubmitted) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
      setQuestionStatus((prev) => ({
        ...prev,
        [currentQuestion]: "answered",
      }));
    },
    [currentQuestion, isSubmitted]
  );

  const handleClearResponse = useCallback(() => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion]: null }));
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQuestion]: "visited",
    }));
  }, [currentQuestion, isSubmitted]);

  const handleMarkForReview = useCallback(() => {
    if (isSubmitted) return;
    setQuestionStatus((prev) => {
      const current = prev[currentQuestion];
      const hasAnswer = answers[currentQuestion] !== null && answers[currentQuestion] !== undefined;
      return {
        ...prev,
        [currentQuestion]:
          current === "marked"
            ? hasAnswer
              ? "answered"
              : "visited"
            : "marked",
      };
    });
  }, [currentQuestion, answers, isSubmitted]);

  const handleNavigate = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalQuestions) return;

      // Mark current as visited if not answered/marked
      setQuestionStatus((prev) => {
        const currentStatus = prev[currentQuestion];
        const next = { ...prev };
        if (
          currentStatus !== "answered" &&
          currentStatus !== "marked"
        ) {
          next[currentQuestion] = "visited";
        }
        // Mark the target as visited if not yet visited
        if (!next[index]) {
          next[index] = "visited";
        }
        return next;
      });

      setCurrentQuestion(index);
      setShowMobilePalette(false);
    },
    [currentQuestion, totalQuestions]
  );

  const handlePrevious = useCallback(() => {
    handleNavigate(currentQuestion - 1);
  }, [currentQuestion, handleNavigate]);

  const handleNext = useCallback(() => {
    handleNavigate(currentQuestion + 1);
  }, [currentQuestion, handleNavigate]);

  const handleTimeUp = useCallback(() => {
    if (!isSubmitted) {
      setShowTimeUpDialog(true);
      handleSubmit();
    }
  }, [isSubmitted]);

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    localStorage.removeItem(`test-state-${paperId}`);
    localStorage.removeItem("test-timer");

    // Calculate results
    const correct = questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
    const incorrect = questions.reduce((acc, q, idx) => {
      return (
        acc +
        (answers[idx] !== null &&
        answers[idx] !== undefined &&
        answers[idx] !== q.correctAnswer
          ? 1
          : 0)
      );
    }, 0);
    const unanswered = totalQuestions - correct - incorrect;

    const result = {
      paperId,
      paperTitle: paper.title,
      score: correct,
      totalQuestions,
      correct,
      incorrect,
      unanswered,
      neetScore: correct * 4 - incorrect * 1,
      totalNeetScore: totalQuestions * 4,
      percentage: Math.round(((correct * 4 - incorrect * 1) / (totalQuestions * 4)) * 100),
      grade: "B+",
      timeTaken: paper.duration * 60,
      date: new Date().toISOString().split("T")[0],
      chapterPerformance: [],
      difficultyPerformance: {
        easy: { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
    };

    // Save result
    const savedResults = JSON.parse(
      localStorage.getItem("test-results") || "[]"
    );
    savedResults.push(result);
    localStorage.setItem("test-results", JSON.stringify(savedResults));

    // Navigate to results
    setTimeout(() => {
      router.push(`/student/result/${paperId}`);
    }, 500);
  }, [answers, paper, paperId, questions, router, totalQuestions]);

  const answeredCount = Object.values(answers).filter(
    (a) => a !== null && a !== undefined
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSubmitDialog(true)}
              className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-semibold text-slate-800 truncate">
                {paper.title}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                {totalQuestions} questions &middot; {paper.duration} min
              </p>
            </div>
          </div>

          {/* Center: Timer */}
          <div className="flex-shrink-0">
            <TestTimer
              duration={paper.duration}
              onTimeUp={handleTimeUp}
              warningAt={5}
            />
          </div>

          {/* Right: Submit + Mobile menu */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="hidden sm:inline-flex bg-teal-600 hover:bg-teal-700 text-white text-sm h-9"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Submit
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowMobilePalette(!showMobilePalette)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 border-slate-200"
            >
              {showMobilePalette ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 lg:gap-6">
          {/* Main Question Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8">
              <QuestionDisplay
                question={questions[currentQuestion]}
                selectedOption={answers[currentQuestion] ?? null}
                onSelect={handleSelectOption}
                questionNumber={currentQuestion + 1}
                totalQuestions={totalQuestions}
              />
            </div>

            {/* Navigation Bar */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleClearResponse}
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 text-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Clear
                </Button>

                <Button
                  variant="outline"
                  onClick={handleMarkForReview}
                  className={`h-10 text-sm ${
                    questionStatus[currentQuestion] === "marked"
                      ? "border-amber-300 bg-amber-50 text-amber-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {questionStatus[currentQuestion] === "marked" ? (
                    <BookmarkCheck className="w-4 h-4 mr-1.5" />
                  ) : (
                    <Bookmark className="w-4 h-4 mr-1.5" />
                  )}
                  {questionStatus[currentQuestion] === "marked"
                    ? "Marked"
                    : "Mark"}
                </Button>
              </div>

              {currentQuestion < totalQuestions - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-teal-600 hover:bg-teal-700 text-white h-10 text-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSubmitDialog(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white h-10 text-sm"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Finish
                </Button>
              )}
            </div>

            {/* Mobile Submit */}
            <div className="sm:hidden mt-4">
              <Button
                onClick={() => setShowSubmitDialog(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white h-11"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Test
              </Button>
            </div>
          </div>

          {/* Desktop Sidebar - Question Palette */}
          <div
            className={`hidden lg:block w-72 flex-shrink-0 ${
              showMobilePalette ? "block" : ""
            }`}
          >
            <div className="sticky top-20">
              <QuestionPalette
                totalQuestions={totalQuestions}
                currentQuestion={currentQuestion}
                answers={answers}
                questionStatus={questionStatus}
                onQuestionClick={handleNavigate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Palette Overlay */}
      {showMobilePalette && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setShowMobilePalette(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">
                Question Navigator
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobilePalette(false)}
                className="w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <QuestionPalette
              totalQuestions={totalQuestions}
              currentQuestion={currentQuestion}
              answers={answers}
              questionStatus={questionStatus}
              onQuestionClick={handleNavigate}
            />
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Submit Test?
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              You have answered {answeredCount} out of {totalQuestions}{" "}
              questions. Once submitted, you cannot go back.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 rounded-xl p-4 my-2">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-emerald-600">
                  {answeredCount}
                </p>
                <p className="text-xs text-slate-500">Answered</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-600">
                  {totalQuestions - answeredCount}
                </p>
                <p className="text-xs text-slate-500">Unanswered</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-600">
                  {Object.values(questionStatus).filter((s) => s === "marked").length}
                </p>
                <p className="text-xs text-slate-500">Marked</p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Continue Test
            </Button>
            <Button
              onClick={() => {
                setShowSubmitDialog(false);
                handleSubmit();
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Submit Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Up Dialog */}
      <Dialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <DialogContent className="sm:max-w-md bg-white border-red-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Time is Up!
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Your test has been automatically submitted. Redirecting to
              results...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
