"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  UserCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { createUser, setUser, type UserRole } from "@/lib/auth";
import Logo from "@/components/shared/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleContinue() {
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!selectedRole) {
      setError("Please select your role");
      return;
    }

    setIsLoading(true);

    // Create user and store in localStorage
    const user = createUser(name.trim(), selectedRole);
    setUser(user);

    // Redirect to appropriate dashboard
    setTimeout(() => {
      router.push(`/${selectedRole}`);
    }, 300);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleContinue();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top bar */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Logo />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-teal-50 text-teal-600 mb-4">
                <BookOpen size={28} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome to NEET Zoology QGen
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Enter your name and select your role to continue
              </p>
            </div>

            {/* Name input */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Dr. Sharma or Rahul Kumar"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                autoComplete="name"
                autoFocus
              />
            </div>

            {/* Role selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedRole("teacher")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all ${
                    selectedRole === "teacher"
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <GraduationCap
                    size={24}
                    className={
                      selectedRole === "teacher"
                        ? "text-teal-600"
                        : "text-slate-400"
                    }
                  />
                  <span className="text-sm font-medium">Teacher</span>
                </button>
                <button
                  onClick={() => setSelectedRole("student")}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all ${
                    selectedRole === "student"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <UserCircle
                    size={24}
                    className={
                      selectedRole === "student"
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }
                  />
                  <span className="text-sm font-medium">Student</span>
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="mb-4 text-sm text-red-600 text-center bg-red-50 rounded-lg py-2">
                {error}
              </p>
            )}

            {/* Continue button */}
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-teal-600 transition-colors"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400">
            &copy; 2026 NEET Zoology QGen
          </p>
        </div>
      </footer>
    </div>
  );
}
