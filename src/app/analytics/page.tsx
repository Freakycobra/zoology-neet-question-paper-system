'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, BarChart3, ArrowRight, BookOpen } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
import { Question } from '@/types'

interface ChapterStats {
  chapter: string
  total: number
  correct: number
  percentage: number
  trend: 'improving' | 'declining' | 'stable'
  isWeak: boolean
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [stats, setStats] = useState<ChapterStats[]>([])
  const [summary, setSummary] = useState({ tests: 0, avg: 0, weak: 0 })

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }

    // Aggregate results from localStorage
    const results: Array<{ questions: Question[]; answers: Record<number, number> }> = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('result-')) {
        try { results.push(JSON.parse(localStorage.getItem(key) || '{}')) } catch { /* ignore */ }
      }
    }

    const chapterMap: Record<string, { total: number; correct: number; history: number[] }> = {}
    results.forEach(r => {
      if (!r.questions || !r.answers) return
      r.questions.forEach((q: Question, idx: number) => {
        if (!chapterMap[q.chapter]) chapterMap[q.chapter] = { total: 0, correct: 0, history: [] }
        chapterMap[q.chapter].total++
        const isCorrect = r.answers[idx] === q.correctAnswer
        if (isCorrect) chapterMap[q.chapter].correct++
        chapterMap[q.chapter].history.push(isCorrect ? 1 : 0)
      })
    })

    const computed: ChapterStats[] = Object.entries(chapterMap).map(([chapter, data]) => {
      const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
      // Trend: compare first half vs second half of history
      const half = Math.floor(data.history.length / 2)
      const first = half > 0 ? data.history.slice(0, half).reduce((a, b) => a + b, 0) / half : 0
      const second = half > 0 ? data.history.slice(half).reduce((a, b) => a + b, 0) / (data.history.length - half) : 0
      const trend: 'improving' | 'declining' | 'stable' = second > first + 0.05 ? 'improving' : second < first - 0.05 ? 'declining' : 'stable'
      return { chapter, total: data.total, correct: data.correct, percentage: pct, trend, isWeak: pct < 60 }
    }).sort((a, b) => a.percentage - b.percentage)

    setStats(computed)
    setSummary({
      tests: results.length,
      avg: computed.length > 0 ? Math.round(computed.reduce((s, c) => s + c.percentage, 0) / computed.length) : 0,
      weak: computed.filter(c => c.isWeak).length,
    })
  }, [router])

  const weakChapters = stats.filter(s => s.isWeak)

  const handleGenerateFocused = () => {
    if (weakChapters.length > 0) {
      sessionStorage.setItem('preselect-chapters', JSON.stringify(weakChapters.map(c => c.chapter)))
    }
    router.push('/generate')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 size={24} className="text-teal-600" /> Chapter Performance Analytics
          </h1>
          <p className="text-slate-500 mt-1">Identify weak areas and focus your teaching</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-slate-900">{summary.tests}</p>
            <p className="text-sm text-slate-500">Tests Completed</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-teal-600">{summary.avg}%</p>
            <p className="text-sm text-slate-500">Avg Accuracy</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-red-500">{summary.weak}</p>
            <p className="text-sm text-slate-500">Weak Chapters</p>
          </div>
        </div>

        {/* Weak Areas Alert */}
        {weakChapters.length > 0 && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-red-800">Students are struggling with:</p>
              <p className="text-sm text-red-700 mt-1">
                {weakChapters.map(c => `${c.chapter} (${c.percentage}%)`).join(', ')}
              </p>
            </div>
            <button onClick={handleGenerateFocused}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2 shrink-0">
              <BookOpen size={14} /> Focused Paper <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Chapter Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Chapter Breakdown</h2>
          </div>
          {stats.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <BarChart3 className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-500">No test data yet.</p>
              <p className="text-sm text-slate-400 mt-1">Students need to complete tests for analytics to appear.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.map((s, i) => (
                <div key={i} className={`px-6 py-4 flex items-center gap-4 ${s.isWeak ? 'bg-red-50/50' : ''}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{s.chapter}</span>
                      {s.isWeak && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">Weak</span>}
                    </div>
                    <div className="mt-2 w-full bg-slate-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${s.percentage >= 80 ? 'bg-emerald-500' : s.percentage >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${s.percentage}%` }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-900">{s.correct}/{s.total}</p>
                    <p className={`text-lg font-bold ${s.percentage >= 60 ? 'text-teal-600' : 'text-red-500'}`}>{s.percentage}%</p>
                  </div>
                  <div className="shrink-0 w-20 text-center">
                    {s.trend === 'improving' ? <TrendingUp size={18} className="mx-auto text-emerald-500" /> :
                     s.trend === 'declining' ? <TrendingDown size={18} className="mx-auto text-red-500" /> :
                     <Minus size={18} className="mx-auto text-slate-400" />}
                    <p className="text-xs text-slate-500 capitalize">{s.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
