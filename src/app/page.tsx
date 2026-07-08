"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ShieldCheck,
  FileOutput,
  Check,
  GitBranch,
  Sparkles,
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Download,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { features, howItWorksSteps, class11Chapters, class12Chapters } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={22} />,
  ShieldCheck: <ShieldCheck size={22} />,
  FileOutput: <FileOutput size={22} />,
};

const stepIconMap: Record<number, React.ReactNode> = {
  1: <LayoutDashboard size={18} />,
  2: <Sparkles size={18} />,
  3: <ClipboardCheck size={18} />,
  4: <Download size={18} />,
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ── Navigation ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors shadow-sm"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-50">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-medium text-teal-700 mb-6">
                <Sparkles size={12} />
                AI-Powered for Telangana NEET Coaching
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                AI-Generated{" "}
                <span className="text-teal-600">Question Papers</span>{" "}
                for NEET Zoology
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Generate syllabus-aligned, NEET-standard weekly test papers in
                minutes. Quality MCQs with accurate answer keys and detailed
                explanations.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Teacher Login
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700 transition-colors"
                >
                  Student Login
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal-500" />
                  Free to use
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal-500" />
                  Syllabus aligned
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-teal-500" />
                  Instant export
                </span>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="relative hidden lg:flex items-center justify-center animate-fade-in animate-delay-200">
              <div className="relative w-full max-w-md">
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-teal-100/50 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />

                {/* Main card */}
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-4">
                  {/* Card header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Weekly Test Paper
                      </p>
                      <p className="text-xs text-slate-500">
                        Class 11 - Animal Kingdom
                      </p>
                    </div>
                    <span className="ml-auto inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
                      Ready
                    </span>
                  </div>

                  {/* Question previews */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-slate-50 p-3 border border-slate-100"
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-700">
                            {i}
                          </span>
                          <div className="flex-1 space-y-2">
                            <div className="h-2.5 rounded bg-slate-200 w-full" />
                            <div className="h-2 rounded bg-slate-200 w-4/5" />
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div className="h-2 rounded bg-slate-200" />
                              <div className="h-2 rounded bg-slate-200" />
                              <div className="h-2 rounded bg-slate-200" />
                              <div className="h-2 rounded bg-emerald-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        30 Questions
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-xs text-slate-500">
                        3 Difficulty levels
                      </span>
                    </div>
                    <div className="h-7 w-7 rounded-full bg-teal-600 flex items-center justify-center text-white">
                      <Download size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Everything you need for{" "}
              <span className="text-teal-600">great question papers</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Built specifically for NEET Zoology coaching in Telangana, with
              features that save hours of manual work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-teal-200 transition-all animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              How it <span className="text-teal-600">works</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              From topic selection to printed paper in four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200" />

            {howItWorksSteps.map((step, index) => (
              <div
                key={step.number}
                className={`relative text-center animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="h-14 w-14 rounded-full bg-white border-2 border-teal-200 flex items-center justify-center text-teal-600 shadow-sm z-10">
                    {stepIconMap[step.number]}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                </div>

                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Syllabus Coverage Section ──────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Complete <span className="text-teal-600">syllabus coverage</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Covers all Zoology chapters for Class 11 and 12 as per Telangana
              intermediate syllabus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Class 11 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-8 w-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 text-sm font-bold">
                  11
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Class 11
                </h3>
                <span className="ml-auto text-xs text-slate-400">
                  {class11Chapters.length} chapters
                </span>
              </div>
              <ul className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {class11Chapters.map((chapter) => (
                  <li
                    key={chapter}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    {chapter}
                  </li>
                ))}
              </ul>
            </div>

            {/* Class 12 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold">
                  12
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Class 12
                </h3>
                <span className="ml-auto text-xs text-slate-400">
                  {class12Chapters.length} chapters
                </span>
              </div>
              <ul className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {class12Chapters.map((chapter) => (
                  <li
                    key={chapter}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    {chapter}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to generate your first question paper?
          </h2>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl mx-auto">
            Join teachers across Telangana who are saving hours every week with
            AI-generated NEET Zoology test papers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-teal-700 hover:bg-teal-50 transition-colors shadow-sm"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <p className="text-sm text-slate-500">
              &copy; 2026 NEET Zoology QGen. Built for Telangana NEET coaching.
            </p>
            <a
              href="https://github.com/Freakycobra/zoology-neet-question-paper-system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"
            >
              <GitBranch size={16} />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
