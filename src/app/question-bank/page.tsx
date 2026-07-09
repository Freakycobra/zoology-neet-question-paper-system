'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Database } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
import { Question } from '@/types'

export default function QuestionBankPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }

    // Load all questions from sessionStorage
    const allQuestions: Question[] = []
    const seen = new Set<string>()
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('paper-')) {
        try {
          const qs = JSON.parse(sessionStorage.getItem(key) || '[]') as Question[]
          qs.forEach((q: Question) => {
            if (!seen.has(q.stem)) {
              seen.add(q.stem)
              allQuestions.push(q)
            }
          })
        } catch { /* ignore */ }
      }
    }
    setQuestions(allQuestions)
  }, [router])

  const filtered = searchTerm
    ? questions.filter(q =>
        q.stem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subtopic.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : questions

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-500 mt-1">Browse and search all generated questions</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search questions by topic, chapter, or keyword..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-teal-600" />
              <span className="font-semibold text-slate-900">{filtered.length} Questions</span>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-500">No questions yet.</p>
              <p className="text-sm text-slate-400 mt-1">Generate a paper to start building your question bank.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((q, i) => (
                <div key={q.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 rounded bg-teal-50 text-teal-700 text-xs font-semibold shrink-0 mt-0.5">Q{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 font-medium">{q.stem}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">{q.chapter}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                          q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                          q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>{q.difficulty}</span>
                        <span className="text-xs text-slate-400">Answer: {['A', 'B', 'C', 'D'][q.correctAnswer]}</span>
                      </div>
                    </div>
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
