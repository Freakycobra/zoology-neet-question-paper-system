'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Download, Loader2 } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import QuestionCard from '@/components/teacher/QuestionCard'
import { getUser, isTeacher } from '@/lib/auth'
import { Question } from '@/types'

export default function ReviewPage({ params }: { params: { paperId: string } }) {
  const router = useRouter()
  const paperId = params.paperId
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [exporting, setExporting] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }

    // CRITICAL FIX: Load questions from sessionStorage (set by generate page)
    const stored = sessionStorage.getItem(`paper-${paperId}`)
    if (stored) {
      setQuestions(JSON.parse(stored))
    } else {
      // No questions found — redirect to generate page
      router.push('/generate')
      return
    }
    setLoaded(true)
  }, [paperId, router])

  const handleApprove = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'approved' as const } : q))
  }

  const handleReject = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'rejected' as const } : q))
  }

  const handleEdit = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q))
  }

  const approvedCount = questions.filter(q => q.status === 'approved').length
  const rejectedCount = questions.filter(q => q.status === 'rejected').length

  const handleExport = async (type: 'student' | 'teacher' | 'explanation') => {
    setExporting(true)
    try {
      const res = await fetch('/api/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, type, title: 'NEET Zoology Test Paper' }),
      })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `NEET_Zoology_${type}.docx`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
    }
    setExporting(false)
  }

  const handleApproveAll = () => {
    setQuestions(prev => prev.map(q => q.status === 'draft' ? { ...q, status: 'approved' as const } : q))
  }

  if (!loaded) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-teal-600" size={24} /></div>

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-teal-600 flex items-center gap-1 mb-4">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Review Questions</h1>
              <p className="text-sm text-slate-500 mt-1">
                {approvedCount}/{questions.length} approved · {rejectedCount} rejected
              </p>
            </div>
            <div className="flex items-center gap-2">
              {approvedCount < questions.length && (
                <button onClick={handleApproveAll}
                  className="px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                  Approve All
                </button>
              )}
              <button onClick={() => handleExport('student')}
                disabled={exporting || approvedCount === 0}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                Export Paper
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
          <div className="bg-teal-600 h-2 rounded-full transition-all" style={{ width: `${(approvedCount / questions.length) * 100}%` }} />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm p-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-full aspect-square rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                      i === currentIdx ? 'bg-teal-600 text-white' :
                      q.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      q.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question Detail */}
          <div className="lg:col-span-3">
            {questions[currentIdx] && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200/60">
                  <p className="text-sm text-slate-500">Question {currentIdx + 1} of {questions.length}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                      disabled={currentIdx === 0}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-white disabled:opacity-30">
                      Prev
                    </button>
                    <button onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
                      disabled={currentIdx === questions.length - 1}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-white disabled:opacity-30">
                      Next
                    </button>
                  </div>
                </div>
                <QuestionCard
                  question={questions[currentIdx]}
                  questionNumber={currentIdx + 1}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEdit={handleEdit}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
