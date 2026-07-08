'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Clock, Award, TrendingUp, BookOpen, ArrowRight } from 'lucide-react'
import { getUser, isStudent } from '@/lib/auth'
import { mockAvailablePapers, mockCompletedPapers } from '@/lib/mock-data'

export default function StudentPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isStudent()) { router.push('/dashboard'); return }
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Student Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/student" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-600 text-white"><BookOpen size={20} /></div>
            <span className="text-lg font-bold text-slate-900">NEET Zoology <span className="text-teal-600">QGen</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/student" className="text-sm font-medium text-teal-700">My Tests</Link>
            <button onClick={() => {}} className="text-sm text-slate-500 hover:text-slate-700">Logout</button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">My Tests</h1>
          <p className="text-slate-500 mt-1">Practice with NEET-standard Zoology questions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <Award className="mx-auto text-amber-500 mb-2" size={20} />
            <p className="text-xl font-bold text-slate-900">84%</p>
            <p className="text-xs text-slate-500">Avg Score</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <BookOpen className="mx-auto text-teal-600 mb-2" size={20} />
            <p className="text-xl font-bold text-slate-900">12</p>
            <p className="text-xs text-slate-500">Tests Taken</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <TrendingUp className="mx-auto text-emerald-500 mb-2" size={20} />
            <p className="text-xl font-bold text-slate-900">Animal Kingdom</p>
            <p className="text-xs text-slate-500">Best Chapter</p>
          </div>
        </div>

        {/* Available Papers */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Tests</h2>
        <div className="grid gap-4 mb-8">
          {mockAvailablePapers.map(paper => (
            <div key={paper.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">{paper.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{paper.topics.join(', ')}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><BookOpen size={12} /> {paper.numQuestions} questions</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {paper.timeLimit} min</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 capitalize">{paper.difficulty}</span>
                </div>
              </div>
              <Link href={`/student/paper/${paper.id}`}
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors shrink-0">
                Start Test <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Completed Papers */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Completed Tests</h2>
        <div className="grid gap-4">
          {mockCompletedPapers.map(paper => (
            <div key={paper.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">{paper.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{paper.topics.join(', ')}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-bold text-teal-600">{paper.score}%</p>
                  <p className="text-xs text-slate-400">Score</p>
                </div>
                <Link href={`/student/result/${paper.id}`}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  View Results
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
