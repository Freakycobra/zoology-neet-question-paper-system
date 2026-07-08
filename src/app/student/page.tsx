"use client";

import { useRouter } from "next/navigation";
import {
  FileText,
  Clock,
  BarChart3,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Award,
  Zap,
  ChevronRight,
  Calendar,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  mockPapers,
  mockCompletedResults,
  mockDashboardData,
} from "@/lib/student/mock-data";

export default function StudentDashboard() {
  const router = useRouter();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-emerald-600 bg-emerald-50";
    if (grade.startsWith("B")) return "text-teal-600 bg-teal-50";
    if (grade === "C") return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">
                NEET Zoology
              </h1>
              <p className="text-xs text-slate-500">Test Series</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">
                {mockDashboardData.streak} day streak
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-teal-700">
                {mockDashboardData.studentName.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Welcome back, {mockDashboardData.studentName.split(" ")[0]}!
              </h2>
              <p className="text-slate-500 mt-1">
                Keep up the momentum. You have {mockPapers.length} tests ready
                for you.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 border border-teal-100">
              <Award className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">
                Rank #{mockDashboardData.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-200">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {mockDashboardData.averageScore}%
                  </p>
                  <p className="text-xs text-slate-500">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {mockDashboardData.papersTaken}
                  </p>
                  <p className="text-xs text-slate-500">Tests Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800 truncate max-w-[120px]">
                    {mockDashboardData.bestChapter}
                  </p>
                  <p className="text-xs text-slate-500">Best Chapter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">
                    {mockDashboardData.papersTaken}
                    <span className="text-slate-400 text-base">
                      /{mockDashboardData.totalPapers}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Course Progress
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(
                (mockDashboardData.papersTaken /
                  mockDashboardData.totalPapers) *
                  100
              )}
              %
            </span>
          </div>
          <Progress
            value={
              (mockDashboardData.papersTaken /
                mockDashboardData.totalPapers) *
              100
            }
            className="h-2.5 bg-slate-200"
          />
        </div>

        {/* Available Papers */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-800">
              Available Tests
            </h3>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockPapers.map((paper) => (
              <Card
                key={paper.id}
                className="border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant="outline"
                      className="bg-teal-50 text-teal-700 border-teal-200"
                    >
                      Class {paper.classLevel}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {paper.duration} min
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">
                    {paper.title}
                  </h4>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {paper.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{paper.numQuestions} questions</span>
                    <span className="text-slate-300">|</span>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(paper.date)}</span>
                  </div>

                  {/* Difficulty Mix */}
                  <div className="flex items-center gap-2 mb-4">
                    {(
                      Object.entries(paper.difficultyMix) as [
                        string,
                        number
                      ][]
                    ).map(([diff, count]) => (
                      <span
                        key={diff}
                        className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(diff)}`}
                      >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}: {
                          count
                        }
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() =>
                      router.push(`/student/paper/${paper.id}`)
                    }
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Start Test
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Completed Papers */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-800">
              Completed Tests
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {mockCompletedResults.map((result) => (
              <Card
                key={result.paperId}
                className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-base font-semibold text-slate-800 flex-1 pr-3">
                      {result.paperTitle}
                    </h4>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${getGradeColor(result.grade)}`}
                    >
                      {result.grade}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 rounded-lg bg-emerald-50">
                      <p className="text-lg font-bold text-emerald-700">
                        {result.correct}
                      </p>
                      <p className="text-xs text-emerald-600">Correct</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-red-50">
                      <p className="text-lg font-bold text-red-600">
                        {result.incorrect}
                      </p>
                      <p className="text-xs text-red-500">Wrong</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-teal-50">
                      <p className="text-lg font-bold text-teal-700">
                        {result.neetScore}
                      </p>
                      <p className="text-xs text-teal-600">NEET Score</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {formatDate(result.date)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/student/result/${result.paperId}`)
                      }
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      View Results
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
