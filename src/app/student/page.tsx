'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Clock, Award, BookOpen, ArrowRight, FileText } from 'lucide-react'
import { getUser, isStudent } from '@/lib/auth'
import { StudentPaper } from '@/types'

interface PaperResult {
  paperId: string
  paperTitle: string
  score: number
  date: string
}

export default function StudentPage() {
  const router = useRouter()
  const [availablePapers, setAvailablePapers] = useState<StudentPaper[]>([])
  const [completedPapers, setCompletedPapers] = useState<PaperResult[]>([])
  const [stats, setStats] = useState({ avgScore: 0, testsTaken: 0 })

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isStudent()) { router.push('/dashboard'); return }

    // Load available papers (published by teacher)
    const published = localStorage.getItem('published-papers')
    if (published) {
      try { setAvailablePapers(JSON.parse(published)) } catch { /* ignore */ }
    }

    // Load completed test results
    const completed = localStorage.getItem('completed-papers')
    if (completed) {
      try {
        const results: PaperResult[] = JSON.parse(completed)
        setCompletedPapers(results)
        if (results.length > 0) {
          const avg = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
          setStats({ avgScore: avg, testsTaken: results.length })
        }
      } catch { /* ignore */ }
    }
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/student" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-600 text-white"><BookOpen size={20} /></div>
            <span className="text-lg font-bold text-slate-900">NEET Zoology <span className="text-teal-600">QGen</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/student" className="text-sm font-medium text-teal-700">My Tests</Link>
            <button onClick={() => { localStorage.clear(); router.push('/login') }} className="text-sm text-slate-500 hover:text-slate-700">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">My Tests</h1>
          <p className="text-slate-500 mt-1">Practice with NEET-standard Zoology questions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <Award className="mx-auto text-amber-500 mb-2" size={20} />
            <p className="text-xl font-bold text-slate-900">{stats.avgScore || 0}%</p>
            <p className="text-xs text-slate-500">Avg Score</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <BookOpen className="mx-auto text-teal-600 mb-2" size={20} />
            <p className="text-xl font-bold text-slate-900">{stats.testsTaken}</p>
            <p className="text-xs text-slate-500">Tests Taken</p>
          </div>
          <div className="hidden sm:block bg-white rounded-xl border border-slate-200 p-4 text-center">
            <Clock className="mx-auto text-emerald-500 mb-2" size={20} />
            <p className="text-xl font-bold text-slate-900">45 min</p>
            <p className="text-xs text-slate-500">Per Test</p>
          </div>
        </div>

        {/* Available Papers */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Tests</h2>
        {availablePapers.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center mb-8">
            <FileText className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-500">No tests available yet.</p>
            <p className="text-sm text-slate-400 mt-1">Your teacher will publish tests here soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 mb-8">
            {availablePapers.map(paper => (
              <div key={paper.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{paper.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{paper.topics.join(', ')}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {paper.numQuestions} questions</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {paper.timeLimit} min</span>
                  </div>
                </div>
                <Link href={`/student/paper/${paper.id}`}
                  className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shrink-0">
                  Start Test <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Completed Papers */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Completed Tests</h2>
        {completedPapers.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <Award className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-500">No completed tests yet.</p>
            <p className="text-sm text-slate-400 mt-1">Take a test to see your results here.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {completedPapers.map(paper => (
              <div key={paper.paperId} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{paper.paperTitle}</h3>
                  <p className="text-sm text-slate-500 mt-1">{paper.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-teal-600">{paper.score}%</p>
                    <p className="text-xs text-slate-400">Score</p>
                  </div>
                  <Link href={`/student/result/${paper.paperId}`}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    View Results
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
