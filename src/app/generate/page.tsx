"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopicSelector } from "@/components/teacher/TopicSelector";
import { DifficultySlider } from "@/components/teacher/DifficultySlider";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  BookOpen,
  SlidersHorizontal,
  ClipboardCheck,
  ChevronRight,
  ChevronLeft,
  Loader2,
  FileText,
  Settings2,
  ListChecks,
} from "lucide-react";

const steps = [
  { id: 1, label: "Select Class", icon: GraduationCap },
  { id: 2, label: "Choose Topics", icon: BookOpen },
  { id: 3, label: "Configure", icon: SlidersHorizontal },
  { id: 4, label: "Review & Generate", icon: ClipboardCheck },
];

export default function GeneratePaperPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);

  // Form state
  const [classLevel, setClassLevel] = useState<11 | 12>(11);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState(25);
  const [difficultySplit, setDifficultySplit] = useState({
    easy: 20,
    medium: 50,
    hard: 30,
  });
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [includeExplanations, setIncludeExplanations] = useState<"none" | "brief" | "full">("brief");
  const [avoidRecentWeeks, setAvoidRecentWeeks] = useState(4);

  const goNext = () => setStep((s) => Math.min(s + 1, 4));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2500));
    setGenerating(false);
    router.push("/review/paper-new-123");
  }, [router]);

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return selectedTopics.length > 0;
    if (step === 3) return true;
    return true;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Generate Question Paper
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure your paper in a few simple steps.
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                        step >= s.id
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-slate-300 bg-white text-slate-400"
                      )}
                    >
                      {step > s.id ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <s.icon className="h-4.5 w-4.5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium hidden sm:block",
                        step >= s.id ? "text-teal-700" : "text-slate-400"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 sm:mx-4 rounded-full transition-all duration-300",
                        step > s.id ? "bg-teal-500" : "bg-slate-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm">
            {/* Step 1: Class Selection */}
            {step === 1 && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-teal-600" />
                    Select Class
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Which class is this paper for?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[11, 12].map((level) => (
                    <button
                      key={level}
                      onClick={() => setClassLevel(level as 11 | 12)}
                      className={cn(
                        "relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all-smooth",
                        classLevel === level
                          ? "border-teal-600 bg-teal-50/40 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-full",
                          classLevel === level ? "bg-teal-100" : "bg-slate-100"
                        )}
                      >
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            classLevel === level ? "text-teal-700" : "text-slate-500"
                          )}
                        >
                          {level}
                        </span>
                      </div>
                      <div className="text-center">
                        <p
                          className={cn(
                            "text-base font-semibold",
                            classLevel === level ? "text-teal-900" : "text-slate-800"
                          )}
                        >
                          Class {level}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {level === 11
                            ? "Animal Kingdom to Chemical Coordination"
                            : "Human Reproduction to Biotechnology"}
                        </p>
                      </div>
                      {classLevel === level && (
                        <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Topic Selection */}
            {step === 2 && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                    Choose Topics
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Select the chapters and subtopics to include in this paper.
                  </p>
                </div>
                <TopicSelector
                  classLevel={classLevel}
                  selectedTopics={selectedTopics}
                  onChange={setSelectedTopics}
                />
              </div>
            )}

            {/* Step 3: Configuration */}
            {step === 3 && (
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-teal-600" />
                    Configure Paper
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Fine-tune the paper generation settings.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Number of Questions */}
                  <div className="rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-slate-500" />
                        Number of Questions
                      </label>
                      <span className="text-lg font-bold text-teal-700 bg-teal-50 px-3 py-0.5 rounded-lg">
                        {numQuestions}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                      <span>10</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Difficulty Split */}
                  <div className="rounded-xl border border-slate-200 p-5 space-y-4">
                    <label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                      <Settings2 className="h-4 w-4 text-slate-500" />
                      Difficulty Distribution
                    </label>
                    <DifficultySlider
                      easy={difficultySplit.easy}
                      medium={difficultySplit.medium}
                      hard={difficultySplit.hard}
                      onChange={setDifficultySplit}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Include Answers Toggle */}
                    <div className="rounded-xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Include Answers</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Add correct answers in teacher key
                          </p>
                        </div>
                        <button
                          onClick={() => setIncludeAnswers(!includeAnswers)}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                            includeAnswers ? "bg-teal-600" : "bg-slate-300"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              includeAnswers ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Avoid recent weeks */}
                    <div className="rounded-xl border border-slate-200 p-5">
                      <label className="text-sm font-medium text-slate-800 block mb-2">
                        Avoid Recent Questions
                      </label>
                      <select
                        value={avoidRecentWeeks}
                        onChange={(e) => setAvoidRecentWeeks(Number(e.target.value))}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                      >
                        <option value={0}>None</option>
                        <option value={4}>Last 4 weeks</option>
                        <option value={8}>Last 8 weeks</option>
                        <option value={12}>Last 12 weeks</option>
                      </select>
                    </div>
                  </div>

                  {/* Explanations */}
                  <div className="rounded-xl border border-slate-200 p-5">
                    <label className="text-sm font-medium text-slate-800 block mb-3">
                      Include Explanations
                    </label>
                    <div className="flex gap-3">
                      {(["none", "brief", "full"] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setIncludeExplanations(opt)}
                          className={cn(
                            "flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all-smooth capitalize",
                            includeExplanations === opt
                              ? "border-teal-600 bg-teal-50 text-teal-700"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          )}
                        >
                          {opt === "none" ? "None" : opt === "brief" ? "Brief" : "Full"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Generate */}
            {step === 4 && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-teal-600" />
                    Review & Generate
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Review your configuration before generating the paper.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 divide-y divide-slate-100">
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Class</span>
                    <span className="text-sm font-semibold text-slate-800">Class {classLevel}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Selected Topics</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedTopics.length} subtopics</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Questions</span>
                    <span className="text-sm font-semibold text-slate-800">{numQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Difficulty Split</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {difficultySplit.easy}% / {difficultySplit.medium}% / {difficultySplit.hard}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Include Answers</span>
                    <span className="text-sm font-semibold text-slate-800">{includeAnswers ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Explanations</span>
                    <span className="capitalize text-sm font-semibold text-slate-800">{includeExplanations}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm text-slate-500">Avoid Recent</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {avoidRecentWeeks > 0 ? `Last ${avoidRecentWeeks} weeks` : "None"}
                    </span>
                  </div>
                </div>

                {generating && (
                  <div className="flex flex-col items-center gap-3 py-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                      <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-800">
                        AI is generating your questions...
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        This may take 20-30 seconds
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button
                onClick={goBack}
                disabled={step === 1}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium transition-colors",
                  step === 1
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              {step < 4 ? (
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors",
                    canProceed()
                      ? "bg-teal-600 hover:bg-teal-700"
                      : "bg-slate-300 cursor-not-allowed"
                  )}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors",
                    generating
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                  )}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Generate Paper
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
