'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Download, FileText, Loader2 } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { getUser, isTeacher } from '@/lib/auth'
const exportHistory = [
  { id: 'e1', title: 'Weekly Test - Animal Kingdom', type: 'student' as const, date: new Date().toLocaleDateString() },
]

export default function ExportHistoryPage() {
  const router = useRouter()
  const [exporting, setExporting] = useState<string | null>(null)

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (!isTeacher()) { router.push('/student'); return }
  }, [router])

  const handleExport = async (type: 'student' | 'teacher' | 'explanation', title: string) => {
    const key = `${type}-${title}`
    setExporting(key)
    // Load questions from the most recent paper in sessionStorage
    let questions: any[] = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i)
      if (k?.startsWith('paper-')) {
        try { questions = JSON.parse(sessionStorage.getItem(k) || '[]'); break } catch { /* ignore */ }
      }
    }
    if (questions.length === 0) { alert('No questions available. Generate a paper first.'); setExporting(null); return }
    try {
      const res = await fetch('/api/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, type, title }),
      })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/\s+/g, '_')}_${type}.docx`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
    }
    setExporting(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Export History</h1>
          <p className="text-slate-500 mt-1">Download previously generated papers</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <span className="font-semibold text-slate-900">Recent Exports</span>
          </div>
          <div className="divide-y divide-slate-100">
            {exportHistory.map(item => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 capitalize">{item.type} paper · {item.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleExport(item.type, item.title)}
                  disabled={exporting === `${item.type}-${item.title}`}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-2"
                >
                  {exporting === `${item.type}-${item.title}` ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
