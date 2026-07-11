'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Download, FileText, Loader2, Clock, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
import { getRegistry, loadQuestions } from '@/lib/paper-storage'

interface ExportRecord {
  id: string
  title: string
  type: 'student' | 'teacher' | 'explanation'
  date: string
  paperId: string
}

export default function ExportHistoryPage() {
  const router = useRouter()
  const [exporting, setExporting] = useState<string | null>(null)
  const [records, setRecords] = useState<ExportRecord[]>([])

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }

    // Build export records from paper registry
    const registry = getRegistry()
    const recs: ExportRecord[] = []
    registry.forEach((meta, i) => {
      recs.push({
        id: `e-${meta.id}-student`,
        title: meta.title,
        type: 'student',
        date: meta.createdAt,
        paperId: meta.id,
      })
      recs.push({
        id: `e-${meta.id}-teacher`,
        title: `${meta.title} — Answer Key`,
        type: 'teacher',
        date: meta.createdAt,
        paperId: meta.id,
      })
    })
    setRecords(recs)
  }, [router])

  const handleExport = async (type: 'student' | 'teacher' | 'explanation', paperId: string, title: string) => {
    const key = `${type}-${paperId}`
    setExporting(key)

    // Load questions from localStorage
    const questions = loadQuestions(paperId)
    if (!questions || questions.length === 0) {
      alert('No questions found for this paper. The questions may have been cleared.')
      setExporting(null)
      return
    }

    try {
      const res = await fetch('/api/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, type, title }),
      })

      if (!res.ok) throw new Error(`Export failed: ${res.status}`)

      const blob = await res.blob()
      if (blob.size === 0) {
        alert('The generated document was empty. Please try again.')
        setExporting(null)
        return
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/\s+/g, '_')}_${type}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error('Export failed:', err)
      alert(`Export failed: ${err.message || 'Unknown error'}`)
    }
    setExporting(null)
  }

  const typeLabel = (t: string) => {
    if (t === 'student') return { text: 'Student Paper', color: 'bg-teal-100 text-teal-700' }
    if (t === 'teacher') return { text: 'Answer Key', color: 'bg-amber-100 text-amber-700' }
    return { text: 'Explanations', color: 'bg-blue-100 text-blue-700' }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-teal-600 flex items-center gap-1 mb-4">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Export History</h1>
          <p className="text-slate-500 mt-1">Download previously generated papers</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <span className="font-semibold text-slate-900">Available Exports</span>
            <span className="text-sm text-slate-400">{records.length} exports</span>
          </div>
          {records.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-500">No exports available yet.</p>
              <p className="text-sm text-slate-400 mt-1">Generate and review a paper to create exports.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {records.map(item => {
                const tl = typeLabel(item.type)
                return (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tl.color}`}>{tl.text}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={10} /> {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleExport(item.type, item.paperId, item.title)}
                      disabled={exporting === `${item.type}-${item.paperId}`}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-2 shrink-0 transition-colors"
                    >
                      {exporting === `${item.type}-${item.paperId}` ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                      Download
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
